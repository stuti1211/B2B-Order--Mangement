import { pool } from "../config/db.js";


export const getAllProducts = async () => {
  const result = await pool.query("SELECT * FROM public.products");

  //console.log(result.rows);

  return result.rows;
};
