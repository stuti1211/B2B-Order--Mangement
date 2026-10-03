import express from "express";
import { createNewOrder,getOrders ,updateStatus} from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createNewOrder);
router.get("/allOrders",getOrders);
router.patch("/:id/status",updateStatus);

export default router;