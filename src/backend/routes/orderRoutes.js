import express from "express";
import { createNewOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createNewOrder);

export default router;