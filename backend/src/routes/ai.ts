import { Hono } from "hono";
import { PrismaClient } from '@prisma/client'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export const aiRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
        GEMINI_API_KEY: string;
    }
}>();

// Middleware to verify JWT
aiRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || " ";
    const token = authHeader.split(' ')[1];
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            await next();
        } else {
            c.status(403);
            return c.json({
                message: "You are not logged in!"
            })
        }
    } catch (e) {
        c.status(403);
        return c.json({
            message: "You are not logged in!"
        })
    }
});

async function callGemini(apiKey: string, prompt: string, content: string): Promise<string | null> {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);        
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const generationConfig = {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
        };
        
        const safetySettings = [
            {
                category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
            {
                category: HarmCategory.HARM_CATEGORY_HARASSMENT,
                threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
            },
        ];
        
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: `${prompt}\n\nContent: ${content}` }] }],
            generationConfig,
            safetySettings,
        });

        const response = result.response;
        
        if (!response.candidates || response.candidates.length === 0) {
            console.error("No candidates returned from Gemini API");
            return null;
        }
        
        return response.text();
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return null;
    }
}

// Generate titles endpoint
aiRouter.post("/generate-titles", async (c) => {
    const body = await c.req.json();
    const { content, currentTitle } = body;

    if (!content || content.length < 10) {
        c.status(400);
        return c.json({
            message: "Please provide more content for title generation"
        });
    }

    const trimmedContent = content.substring(0, 2000);
    const prompt = `You are a professional headline writer. Based on the following content${currentTitle ? ` and the current title "${currentTitle}"` : ""}, suggest 5 engaging, clear, and compelling alternative titles. Each title should be concise (under 60 characters) and capture the essence of the content. Format each title on a separate line with no numbering or bullets.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to generate titles" });
        }

        const titles = result
            .split("\n")
            .map(t => t.replace(/^["']|["']$/g, '').trim())
            .filter(t => t.length > 0 && t.length < 100);

        return c.json({ titles });
    } catch (error) {
        console.error("Error in generate-titles endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Summarize blog endpoint
aiRouter.post("/summarize", async (c) => {
    const body = await c.req.json();
    const { blogId, content } = body;

    let blogContent = content;
    if (!blogContent) {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            select: { blog: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        blogContent = blog.blog;
    }

    let textContent = '';
    if (typeof blogContent === 'object') {
        try {
            textContent = JSON.stringify(blogContent);
        } catch (e) {
            console.error("Error converting blog content to text:", e);
        }
    } else {
        textContent = String(blogContent);
    }

    const trimmedContent = textContent.substring(0, 4000);
    const prompt = `Summarize the following blog content in 2-3 sentences, focusing on the main points and key takeaways. The summary should be clear, concise, and engaging.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to generate summary" });
        }

        return c.json({ summary: result.trim() });
    } catch (error) {
        console.error("Error in summarize endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Generate tags endpoint
aiRouter.post("/generate-tags", async (c) => {
    const body = await c.req.json();
    const { blogId, content } = body;

    let blogContent = content;
    if (!blogContent) {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            select: { blog: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        blogContent = blog.blog;
    }

    let textContent = '';
    if (typeof blogContent === 'object') {
        try {
            textContent = JSON.stringify(blogContent);
        } catch (e) {
            console.error("Error converting blog content to text:", e);
        }
    } else {
        textContent = String(blogContent);
    }

    const trimmedContent = textContent.substring(0, 3000);
    const prompt = `Extract 3-5 relevant tags or topics from the following blog content. Each tag should be a single word or short phrase (max 2-3 words). Return only the tags as a comma-separated list with no additional text, numbering or explanations.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to generate tags" });
        }

        const tags = result
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag.length > 0 && tag.length < 30);

        return c.json({ tags });
    } catch (error) {
        console.error("Error in generate-tags endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Related blogs endpoint
aiRouter.post("/related-blogs", async (c) => {
    const body = await c.req.json();
    const { blogId, content } = body;

    let blogContent = content;
    if (!blogContent) {
        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blog = await prisma.blog.findUnique({
            where: { id: blogId },
            select: { blog: true }
        });

        if (!blog) {
            c.status(404);
            return c.json({ message: "Blog not found" });
        }

        blogContent = blog.blog;
    }

    let textContent = '';
    if (typeof blogContent === 'object') {
        try {
            textContent = JSON.stringify(blogContent);
        } catch (e) {
            console.error("Error converting blog content to text:", e);
        }
    } else {
        textContent = String(blogContent);
    }

    const trimmedContent = textContent.substring(0, 2000);
    const topicsPrompt = `Extract 3-5 main topics or keywords from the following blog content. Return only the topics as a comma-separated list with no additional text.`;

    try {
        const topicsResult = await callGemini(c.env.GEMINI_API_KEY, topicsPrompt, trimmedContent);

        if (!topicsResult) {
            c.status(500);
            return c.json({ message: "Failed to analyze content" });
        }

        const topics = topicsResult
            .split(',')
            .map(topic => topic.trim().toLowerCase())
            .filter(topic => topic.length > 0);

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL
        }).$extends(withAccelerate());

        const blogs = await prisma.blog.findMany({
            where: {
                published: true,
                id: { not: blogId }
            },
            select: {
                id: true,
                title: true,
                featuredImage: true,
                blog: true,
                author: {
                    select: {
                        name: true
                    }
                }
            },
            take: 10
        });

        const scoredBlogs = await Promise.all(blogs.map(async (blog) => {
            let blogText = '';
            if (typeof blog.blog === 'object') {
                try {
                    blogText = JSON.stringify(blog.blog);
                } catch (e) { }
            } else {
                blogText = String(blog.blog);
            }

            const score = topics.reduce((count, topic) => {
                return blogText.toLowerCase().includes(topic) ? count + 1 : count;
            }, 0);

            return { blog, score };
        }));

        const relatedBlogs = scoredBlogs
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
            .map(item => ({
                id: item.blog.id,
                title: item.blog.title,
                featuredImage: item.blog.featuredImage,
                author: item.blog.author
            }));

        return c.json({ relatedBlogs });
    } catch (error) {
        console.error("Error in related-blogs endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Fix grammar & spelling
aiRouter.post("/fix-text", async (c) => {
    const body = await c.req.json();
    const { content } = body;

    if (!content || content.length < 2) {
        c.status(400);
        return c.json({
            message: "Please provide text to fix"
        });
    }

    const trimmedContent = content.substring(0, 1500);
    const prompt = `Fix the grammar, spelling, and punctuation in the following text. Maintain the original meaning and style, but correct any errors. Return only the corrected text with no additional explanation.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to fix text" });
        }

        return c.json({ result: result.trim() });
    } catch (error) {
        console.error("Error in fix-text endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Expand text
aiRouter.post("/expand-text", async (c) => {
    const body = await c.req.json();
    const { content } = body;

    if (!content || content.length < 2) {
        c.status(400);
        return c.json({
            message: "Please provide text to expand"
        });
    }

    const trimmedContent = content.substring(0, 1000);
    const prompt = `Expand the following text to provide more detail, examples, or explanation. Maintain the original tone and style but make the content more comprehensive. Return only the expanded text with no additional explanation.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to expand text" });
        }

        return c.json({ result: result.trim() });
    } catch (error) {
        console.error("Error in expand-text endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Change tone
aiRouter.post("/tone-text", async (c) => {
    const body = await c.req.json();
    const { content, tone } = body;

    if (!content || content.length < 2) {
        c.status(400);
        return c.json({
            message: "Please provide text to rewrite"
        });
    }

    if (!tone) {
        c.status(400);
        return c.json({
            message: "Please specify a tone"
        });
    }

    const validTones = ["professional", "casual", "enthusiastic", "formal", "simple"];
    if (!validTones.includes(tone)) {
        c.status(400);
        return c.json({
            message: "Invalid tone specified"
        });
    }

    const trimmedContent = content.substring(0, 1200);
    const prompt = `Rewrite the following text to have a ${tone} tone. Maintain the same meaning and information, but change the style to be ${tone}. Return only the rewritten text with no additional explanation.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to change tone" });
        }

        return c.json({ result: result.trim() });
    } catch (error) {
        console.error("Error in tone-text endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Rewrite text
aiRouter.post("/rewrite-text", async (c) => {
    const body = await c.req.json();
    const { content } = body;

    if (!content || content.length < 2) {
        c.status(400);
        return c.json({
            message: "Please provide text to rewrite"
        });
    }

    const trimmedContent = content.substring(0, 1200);
    const prompt = `Rewrite the following text to improve clarity and flow while maintaining the same meaning. Make it more engaging and concise where possible. Return only the rewritten text with no additional explanation.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to rewrite text" });
        }

        return c.json({ result: result.trim() });
    } catch (error) {
        console.error("Error in rewrite-text endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});

// Summarize text
aiRouter.post("/summarize-text", async (c) => {
    const body = await c.req.json();
    const { content } = body;

    if (!content || content.length < 10) {
        c.status(400);
        return c.json({
            message: "Please provide more content to summarize"
        });
    }

    const trimmedContent = content.substring(0, 2000);
    const prompt = `Summarize the following text concisely while preserving the key points and main ideas. Return only the summary with no additional explanation.`;

    try {
        const result = await callGemini(c.env.GEMINI_API_KEY, prompt, trimmedContent);

        if (!result) {
            c.status(500);
            return c.json({ message: "Failed to summarize text" });
        }

        return c.json({ result: result.trim() });
    } catch (error) {
        console.error("Error in summarize-text endpoint:", error);
        c.status(500);
        return c.json({ message: "Internal server error" });
    }
});