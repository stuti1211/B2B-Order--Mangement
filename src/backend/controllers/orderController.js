import { createOrder ,getAllOrders} from "../model/orderModel.js";

export const createNewOrder = async(req,res)=>{
      const { items} = req.body;

     const order = await createOrder(items);
     //console.log(order);
     return res.json(order);

};

export const getOrders = async (req, res) => {
  const orders = await getAllOrders();

  return res.json(orders);
};