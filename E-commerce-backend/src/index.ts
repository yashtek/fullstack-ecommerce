import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/auth.routes';
const app = new Hono()

app.use("*",cors({
  origin:"",
  credentials:true,
}));

app.route("/auth",authRoutes);




export default app
