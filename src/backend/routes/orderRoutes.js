import express from "express";
import { createNewOrder,getOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createNewOrder);
router.get("/allOrders",getOrders);

export default router;