import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name:"products",
    initialState:{
       products:[
           {
            id: 1,
            name: "Laptop",
            price: 50000,
            },
            {
            id: 2,
            name: "Keyboard",
            price: 2000,
            },
            {
            id: 3,
            name: "Mouse",
            price: 1000,
            },
       ],
       cart:[],
       orders:[],
       wishlists:[]
    },
    reducers:{
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

export default productSlice.reducer;
export const { addToCart, removeFromCart ,clearCart ,placeOrder,addToWishList} = productSlice.actions;