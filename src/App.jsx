import { useSelector ,useDispatch } from "react-redux";
import { addToCart ,removeFromCart ,clearCart, addToWishList ,fetchProducts ,addProduct,updateProduct,addOrder,fetchOrders,updateOrderStatus} from "./features/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";


function App(){

const products = useSelector((state) => state.products.products);
//console.log("products", products);
const cart = useSelector((state) => state.products.cart);
const orders = useSelector((state) => state.products.orders);
console.log("Redux orders:", orders);
console.log("orders", orders);
console.log("cart",cart);
const wishlists =useSelector((state)=>state.products.wishlists);
console.log("wishlist", wishlists);
const total = cart.reduce( 
  (sum,product)=> sum + product.quantity *product.price ,0

);

const dispatch = useDispatch();

const [name,setName] =useState("");
const [price ,setPrice ]= useState("");
const [editProduct ,setEditProduct] = useState(null);
console.log("editProduct", editProduct);

useEffect(()=>{
  dispatch(fetchProducts());
},[]);

useEffect(() => {
  dispatch(fetchOrders());
}, []);

useEffect(() => {
  if (editProduct) {
    setName(editProduct.name);
    setPrice(editProduct.price);
  }
}, [editProduct]);

const handleCreateProduct = async () =>{
   if(editProduct){
      const response = await axios.put(
      `http://localhost:5000/api/products/${editProduct.id}`,
      {
        name,
        price,
      }
      );
      dispatch(updateProduct(response.data));
      setEditProduct(null);
      setName("");
      setPrice("");

      return;
   }

  const response = await  axios.post(
    "http://localhost:5000/api/products/create",
    {
      name,
      price,
    }
    
  );
  dispatch(addProduct(response.data));
  setName("");
  setPrice("");
  console.log(response.data);
};

const handlePlaceOrder = async ()=>{
   const response = await axios.post(
     "http://localhost:5000/api/orders",
        {
          items: cart,
        }
   );
    
    dispatch(addOrder(response.data));
    dispatch(clearCart());
};
const updateStatus = async (id, status) => {
 const response = await axios.patch(`http://localhost:5000/api/orders/${id}/status`, {
    status: status
  });
  dispatch(updateOrderStatus(response.data));
};

 return(

 <div> 
     <h2> Add new prodcuct</h2>
     <input
       type="text"
       placeholder="Product name"
       value ={name}
       onChange ={(e)=> setName(e.target.value)}
    />
     <input
      type="number"
      placeholder="Product Price"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
    />
    <button onClick={handleCreateProduct}>
        {editProduct ? "Update Product" : "Add Product"}
        </button>

    {products.map((product)=>(
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    <button onClick ={()=>dispatch (addToWishList(product))}>Add to Wishlist</button>
    <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
    <button onClick={()=>dispatch(removeFromCart(product.id))}>Remove</button>
    <button onClick={()=> setEditProduct(product)}>Edit</button>
    </div>
     ))}
     <h1>Cart</h1>
     {cart.map((product)=>(
      <div key={product.id}>
        <h2>{product.name}</h2>
        <p>{product.price}</p>
        <p>Quantity:{product.quantity}</p>
        
      </div>
    ))}
     <h1>Total:{total}</h1>
     <button onClick={()=>dispatch(clearCart(cart))}>Clear Cart</button>
     <button onClick={handlePlaceOrder}> Place Order</button>
     <h2>Orders</h2>
      {orders.map((order) => (
        <div key={order.id}>
          <h3>Order {order.id}</h3>
          <select 
          value={order.status}
          onChange={(e)=> updateStatus(order.id ,e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
          </select>

            <p> Total: ₹
              {order.items.reduce((sum, product) => sum + product.price * product.quantity, 0)}
            </p>
          {order.items.map((product) => (
            <p key={product.id}>
              {product.name} × {product.quantity}
            </p>
          ))}
        </div>
      ))}
      <h2>Wishlist</h2>
      {wishlists.map((product)=>(
        <div key={product.id}>
          <p>{product.name} - ${product.price}</p>
          </div>  
      ))}
      
  </div>
);
}
export default App;