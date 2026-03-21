import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool);

pool
  .connect()
  .then(() => {
    console.log("Db connected");
  })
  .catch((error) => {
    console.log("PostgreSQL connection failed:", error.message);
  });
