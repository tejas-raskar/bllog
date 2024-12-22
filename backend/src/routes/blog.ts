import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { verify } from 'hono/jwt'

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
    const user = await verify(token, c.env.JWT_SECRET);
    if(user) {
        c.set("userId", String(user.id));
        await next();
    } else {
        c.status(403);
        c.json({
            message: "You are not logged in!"
        })
    }
})

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const authorId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
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

blogRouter.put("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());

    const blog = await prisma.blog.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content
        }
    })

    return c.json({
        id: blog.id
    })
})

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany();
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