import express from "express";
import { getProducts , createProduct ,updateProduct} from "../controllers/productController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
const router = express.Router();


router.get("/", getProducts);
router .post ("/create",authMiddleware,adminMiddleware,createProduct);
router.put("/:id", authMiddleware,adminMiddleware,updateProduct);


export default router;