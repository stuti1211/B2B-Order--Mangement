import { getAllProducts } from "../model/Productmodel.js";
import { pool } from "../config/db.js";

export const getProducts = async (req,res)=>{

    const products = await getAllProducts();
    return res.json(products);

};

export const createProduct = async (req,res)=>{
    //console.log( "req.boy",req.body);
     const { name , price }= req.body;
      const result = await pool.query(
        "INSERT INTO public.products (name, price) VALUES ($1, $2) RETURNING *",
         [name, price]
);
     return res.json(result.rows[0]);
  

};

export const updateProduct = async(req,res)=>{
   // console.log("updated Product",req.body)
    const {name, price} = req.body;
    const {id}= req.params ;
    const result = await pool.query (
        "UPDATE public.products SET name = $1, price = $2 WHERE id = $3 RETURNING *",
          [name, price, id]
    );
    return res.json(result.rows[0]);
}