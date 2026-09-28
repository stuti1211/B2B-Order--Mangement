import { useSelector ,useDispatch } from "react-redux";
import { addToCart ,removeFromCart ,clearCart, placeOrder,addToWishList ,fetchProducts} from "./features/productSlice";
import { useEffect } from "react";

function App(){

const products = useSelector((state) => state.products.products);
const cart = useSelector((state) => state.products.cart);
const orders = useSelector((state) => state.products.orders);
console.log("orders", orders);
console.log(cart);
const wishlists =useSelector((state)=>state.products.wishlists);
console.log("wishlist", wishlists);
const total = cart.reduce( 
  (sum,product)=> sum + product.quantity *product.price ,0

);

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(fetchProducts());
},[]);


 return(
 <div>
    {products.map((product)=>(
    <div key={product.id}>
      <h2>{product.name}</h2>
      <p>{product.price}</p>
    <button onClick ={()=>dispatch (addToWishList(product))}>Add to Wishlist</button>
    <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
    <button onClick={()=>dispatch(removeFromCart(product.id))}>Remove</button>
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
     <button onClick={() => dispatch(placeOrder())}> Place Order</button>
     <h2>Orders</h2>
      {orders.map((order, index) => (
        <div key={index}>
          <h3>Order {index + 1}</h3>
            <p> Total: ₹
              {order.reduce((sum, product) => sum + product.price * product.quantity, 0)}
            </p>
          {order.map((product) => (
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