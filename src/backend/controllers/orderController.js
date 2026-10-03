import { createOrder ,getAllOrders,updateOrderStatus} from "../model/orderModel.js";

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

export const updateStatus = async(req,res) =>{
  const {id}= req.params;
  const {status}=req.body;
  console.log("id",id);
  console.log("status",status);
  const order = await updateOrderStatus(id, status);

  return res.json(order);
}