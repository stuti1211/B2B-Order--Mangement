import express from "express";
import { createNewOrder,getOrders ,updateStatus} from "../controllers/orderController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", createNewOrder);
router.get("/allOrders",getOrders);
router.patch("/:id/status",authMiddleware,adminMiddleware,updateStatus);

export default router;