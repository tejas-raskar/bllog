import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
}>();

blogRouter.post("/", async (c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    
    try {
        const blog = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: "1"
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
            content: body.title
        }
    })

    return c.json({
        id: blog.id
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

blogRouter.get("/bulk", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL
    }).$extends(withAccelerate());
    const blogs = await prisma.blog.findMany();
    return c.json({
        blogs
    })
})