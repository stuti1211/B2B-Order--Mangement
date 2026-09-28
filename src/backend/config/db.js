import pg from "pg";

const { Pool } = pg;

export const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "b2b_order_management",
  password: "1234",
  port: 5432,
});