import { Hono } from "hono";

export const blogRouter = new Hono();

blogRouter.post("/", (c) => {
    return c.text("Hello World!")
})

blogRouter.put("/", (c) => {
return c.text("Hello World!")
})

blogRouter.get("/:id", (c) => {
return c.text("Hello World!")
})

blogRouter.get("/bulk", (c) => {
return c.text("Hello World!")
})