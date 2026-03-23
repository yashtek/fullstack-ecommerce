import { Hono } from 'hono'
import { cors } from 'hono/cors'
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';

const PORT = process.env.PORT || 5000

const app = new Hono()

app.use("*",cors({
  origin:"http://localhost:3000",
  credentials:true,
}));

app.route("/auth",authRoutes);
app.route("/product",productRoutes);
export default {
  port: PORT,
  fetch: app.fetch,
}
