import { pool } from "../config/db.js";


export const createOrder = async(items)=>{
   const result = await pool.query(
      "INSERT INTO public.orders (items) VALUES ($1) RETURNING *",
       [JSON.stringify(items)]
   );

  return result.rows[0];
}