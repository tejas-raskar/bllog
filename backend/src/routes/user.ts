import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign } from 'hono/jwt'
import { signinInput, signupInput } from "@traskar/bllog-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
}

userRouter.get("/bookmarks", async(c) => {
  const { payload } = decode(c.req.header("Authorization")?.split(" ")[1] || "");
  const userId = payload.id as string
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());
  try {
    const bookmarks = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        bookmarks: true
      }
    })

    return c.json({
      bookmarks
    })
  } catch (error) {
    return c.json({
      message: "Something went wrong"
    })
  }
})

userRouter.post("/bookmarks", async (c) => {
  const body = await c.req.json();
  const id = body.id;
  const { payload } = decode(c.req.header("Authorization")?.split(" ")[1] || "");
  const userId = payload.id as string
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  if(id !== userId) {
    c.status(403);
    return c.json({
      message: "Unauthorised access"
    })
  }
  try {
    const res = await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        bookmarks: body.bookmarks
      }
    })

    return c.json({
      message: "Bookmarks updated successfully"
    })
  } catch (error) {
      return c.json({
        message: "Something went wrong"
      })
  }
})

userRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const res = await prisma.user.findUnique({
      where: {
        id: id
      },
      select: {
        name: true,
        tagline: true
      }
    })

    return c.json({
      name: res?.name,
      tagline: res?.tagline
    })
  } catch (error) {

  }
})

userRouter.post("/signup", async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Incorrect inputs"
      });
  }

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
      // Hash the pre-hashed password from client
      const serverHash = await hashPassword(body.password);
      
      const user = await prisma.user.create({
          data: {
              username: body.username,
              password: serverHash,
              name: body.name
          }
      });

      const jwt = await sign({
          id: user.id
      }, c.env.JWT_SECRET);

      return c.json({
          token: "Bearer " + jwt,
          userName: user.name,
          userId: user.id
      });
  } catch (e) {
      c.status(411);
      return c.json({
          error: e
      });
  }
});

userRouter.post("/signin", async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
      c.status(411);
      return c.json({
          message: "Incorrect inputs"
      });
  }

  const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
      const user = await prisma.user.findFirst({
          where: {
              username: body.username
          }
      });

      if (!user) {
          c.status(403);
          return c.json({
              message: "User not found"
          });
      }

      // Compare hashes
      const serverHash = await hashPassword(body.password);
      const passwordMatch = serverHash === user.password;
      
      if (!passwordMatch) {
          c.status(403);
          return c.json({
              message: "Incorrect password"
          });
      }

      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({
          token: "Bearer " + jwt,
          userName: user.name,
          userId: user.id
      });
  } catch (error) {
      c.status(411);
      return c.json({
          error: "Invalid"
      });
  }
});