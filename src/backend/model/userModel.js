import { pool } from "../config/db.js";

export const getUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM public.users WHERE email = $1",
    [email]
  );

  return result.rows[0];
};

export const createUser = async (name, email, password) => {
  const result = await pool.query(
    `INSERT INTO public.users (name, email, password)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, email, password]
  );

  return result.rows[0];
};