import { getAllProducts } from "../model/Productmodel.js";

export const getProducts = async (req,res)=>{

    const products = await getAllProducts();
    return res.json(products);

};

