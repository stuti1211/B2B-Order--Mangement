import { createOrder } from "../model/orderModel.js";

export const createNewOrder = async(req,res)=>{
      const { items} = req.body;

     const order = await createOrder(items);
     //console.log(order);
     return res.json(order);

};