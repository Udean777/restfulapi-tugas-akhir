import { createPool } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.MYSQL_DB,
});

export default pool;
