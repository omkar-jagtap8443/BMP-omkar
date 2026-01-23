import express from "express";
import {
  createOrder,
  acceptOrder,
  verifyOTP,
  confirmDelivery
} from "../controllers/order.controller.js";

const router = express.Router();

import { getNearbyOrders } from "../controllers/order.controller.js";

router.get("/nearby", getNearbyOrders);
router.post("/", createOrder);
router.post("/accept", acceptOrder);
router.post("/verify-otp", verifyOTP);
router.post("/confirm", confirmDelivery);

export default router;
