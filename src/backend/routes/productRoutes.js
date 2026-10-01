import express from "express";
import { getProducts , createProduct ,updateProduct} from "../controllers/productController.js";
const router = express.Router();


router.get("/", getProducts);
router .post ("/create",createProduct);
router.put("/:id", updateProduct);


export default router;