import { Hono } from 'hono'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
import { aiRouter } from './routes/ai'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
    GEMINI_API_KEY: string,
  }
}>()

app.use('/api/*', cors())
app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);
app.route('/api/v1/ai', aiRouter);

export default app
