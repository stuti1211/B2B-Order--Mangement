import { pool } from "../config/db.js";


export const createOrder = async(items)=>{
   const result = await pool.query(
      "INSERT INTO public.orders (items) VALUES ($1) RETURNING *",
       [JSON.stringify(items)]
   );

  return result.rows[0];
};

export const getAllOrders = async () => {
  const result = await pool.query(
    "SELECT * FROM public.orders"
  );

  return result.rows;
};

export const updateOrderStatus = async (id,status)=>{
     const result = await pool.query(
       "UPDATE public.orders SET status = $1 WHERE id = $2 RETURNING *",
        [status, id]
     );
    return result.rows[0];
};