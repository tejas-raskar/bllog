import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@traskar/bllog-common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("Authorization") || " ";
    const token = authHeader.split(' ')[1];
    try {
        const user = await verify(token, c.env.JWT_SECRET);
        if (user) {
            c.set("userId", String(user.id));
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
})

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    // const { success } = createBlogInput.safeParse(body);
    // if (!success) {
    //     c.status(411);
    //     return c.json({
    //     message: "Incorrect inputs"
    //     })
    // }
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                blog: body.blog,
                authorId: authorId,
                featuredImage: body.featuredImage,
                images: body.images,
                published: body.published,
                publishedOn: body.published ? new Date(body.publishedOn) : null,
                modifiedOn: new Date(body.modifiedOn),
            }
        })
        return c.json({
            id: blog.id
        });
    } catch (e) {
        return c.json({
            error: e
        })
    }
})

blogRouter.put("/:id", async (c) => {
    const body = await c.req.json();
    const { id } = c.req.param();
    const userId = c.get("userId");
    // const { success } = updateBlogInput.safeParse(body);
    // if (!success) {
    //     c.status(411);
    //     return c.json({
    //     message: "Incorrect inputs"
    //     })
    // }
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blog = await prisma.blog.findUnique({where: {id}}) 
    if(!blog || blog.authorId !== userId) {
        c.status(403);
        return c.json({
            message: "Unauthorized"
        });
    }
    const updatedBlog = await prisma.blog.update({
        where: {
            id: id
        },
        data: {
            title: body.title,
            blog: body.blog,
            featuredImage: body.featuredImage,
            images: body.images,
            published: body.published,
            publishedOn: body.published ? new Date(body.publishedOn) : null,
            modifiedOn: new Date(body.modifiedOn),
        }
    })

    return c.json({
        id: updatedBlog.id,
        modifiedOn: updatedBlog.modifiedOn
    })
})

blogRouter.get("/user/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const drafts = await prisma.blog.findMany({
        select: {
            title: true,
            modifiedOn: true,
            id: true
        },
        where: {
            authorId: id,
            published: false
        }
    })

    const publishedBlogs = await prisma.blog.findMany({
        select: {
            title: true,
            publishedOn: true,
            id: true
        },
        where: {
            authorId: id,
            published: true
        }
    })
    return c.json({
        drafts: drafts,
        publishedBlogs: publishedBlogs
    })
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany({
        select: {
            title: true,
            blog: true,
            id: true,
            publishedOn: true,
            featuredImage: true,
            author: {
                select: {
                    name: true
                }
            }
        },
        where: {
            published: true
        }
    });
    return c.json({
        blogs
    })
})

blogRouter.get("/:id", async (c) => {
    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    try {
        const blog = await prisma.blog.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                blog: true,
                published: true,
                publishedOn: true,
                featuredImage: true,
                images: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        });

        return c.json({
            blog
        })
    } catch (e) {
        return c.json({
            message: "Error while fetching the blog. Make sure that it exists!"
        })
    }
})