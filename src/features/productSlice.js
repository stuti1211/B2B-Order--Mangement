import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const productSlice = createSlice({
    name:"products",
    initialState:{
       products:[],
       cart:[],
       orders:[],
       wishlists:[]
    },
    reducers:{

        setProducts: (state, action) => {
                 state.products = action.payload;
              },
        addProduct: (state, action) => {
            state.products.push(action.payload);
          },

        addToCart: (state, action) => {
            const existingProduct = state.cart.find(
             (product)=> product.id== action.payload.id
            );
            if(existingProduct){
                existingProduct.quantity +=1;
            }
            else{
                state.cart.push({
                    ...action.payload,
                    quantity:1,
                })
            }
     },
        removeFromCart :(state,action)=>{
            const existingProduct = state.cart.find(
             (product)=> product.id== action.payload
            );
            if(existingProduct.quantity>1){
               existingProduct.quantity -=1;
            }   
            else{
             state.cart = state.cart.filter(
            (product)=> product.id !== action.payload
             );
        }

    },
       clearCart :(state) =>{
         state.cart=[];
       },
       placeOrder:(state)=>{
        state.orders.push(state.cart);
        state.cart=[];
       },

     addToWishList:(state,action)=>{
        const existingProduct = state.wishlists.find(
            (product )=> product.id === action.payload.id
        );
        if(!existingProduct)
        state.wishlists.push(action.payload);
     },
      


}});


export const fetchProducts = () => async (dispatch) => {
  console.log("fetchProducts called");

  //console.log("before API");

  const response = await axios.get(
    "http://localhost:5000/api/products"
  );

  // console.log("after API");
  // console.log(response.data);
  dispatch(setProducts(response.data));
};


export default productSlice.reducer;
export const { addToCart, removeFromCart ,clearCart ,placeOrder,addToWishList ,setProducts, addProduct} = productSlice.actions;