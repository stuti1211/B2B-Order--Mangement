import { useSelector ,useDispatch } from "react-redux";
import { addToCart ,removeFromCart ,clearCart, addToWishList ,fetchProducts ,addProduct,updateProduct,addOrder,fetchOrders,updateOrderStatus} from "./features/productSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";


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
const user = useSelector((state) => state.auth.user);
console.log("User in App:", user);
console.log("Logged in user:", user);
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

 return (
  <div>

    <Login />

    {/* ================= ADMIN SECTION ================= */}

    {user?.role === "admin" && (
      <>
        <h1>Admin Section</h1>

        {/* Add / Update Product */}
        <h2>Add New Product</h2>

        <input
          type="text"
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        {/* Product List */}
        <h2>Products</h2>

        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>

            <button onClick={() => setEditProduct(product)}>
              Edit
            </button>
          </div>
        ))}

        {/* Orders - Admin can manage order status */}
        <h2>Orders</h2>

        {orders.map((order) => (
          <div key={order.id}>
            <h3>Order {order.id}</h3>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.id, e.target.value)
              }
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>

            <p>
              Total: ₹
              {order.items.reduce(
                (sum, product) =>
                  sum + product.price * product.quantity,
                0
              )}
            </p>

            {order.items.map((product) => (
              <p key={product.id}>
                {product.name} × {product.quantity}
              </p>
            ))}
          </div>
        ))}
      </>
    )}

    {/* ================= CUSTOMER SECTION ================= */}

    {user?.role === "customer" && (
      <>
        <h1>Customer Section</h1>

        {/* Products */}
        <h2>Products</h2>

        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>

            <button
              onClick={() => dispatch(addToWishList(product))}
            >
              Add to Wishlist
            </button>

            <button
              onClick={() => dispatch(addToCart(product))}
            >
              Add to Cart
            </button>
          </div>
        ))}

        {/* Cart */}
        <h2>Cart</h2>

        {cart.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
            <p>Quantity: {product.quantity}</p>

            <button
              onClick={() =>
                dispatch(removeFromCart(product.id))
              }
            >
              Remove
            </button>
          </div>
        ))}

        <h2>Total: ₹{total}</h2>

        <button onClick={() => dispatch(clearCart(cart))}>
          Clear Cart
        </button>

        <button onClick={handlePlaceOrder}>
          Place Order
        </button>

        {/* Wishlist */}
        <h2>Wishlist</h2>

        {wishlists.map((product) => (
          <div key={product.id}>
            <p>
              {product.name} - ₹{product.price}
            </p>
          </div>
        ))}

        {/* Customer Orders */}
        <h2>My Orders</h2>

        {orders.map((order) => (
          <div key={order.id}>
            <h3>Order {order.id}</h3>

            <p>Status: {order.status}</p>

            <p>
              Total: ₹
              {order.items.reduce(
                (sum, product) =>
                  sum + product.price * product.quantity,
                0
              )}
            </p>

            {order.items.map((product) => (
              <p key={product.id}>
                {product.name} × {product.quantity}
              </p>
            ))}
          </div>
        ))}
      </>
    )}

  </div>
);
}
export default App;