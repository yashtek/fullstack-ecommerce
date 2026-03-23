import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
export const db = drizzle(pool, { schema });

pool
  .connect()
  .then(() => {
    console.log("Db connected");
  })
  .catch((error) => {
    console.log("PostgreSQL connection failed:", error.message);
  });
