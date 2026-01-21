import express from "express";
import {
  createOrder,
  acceptOrder,
  verifyOTP,
  confirmDelivery
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", createOrder);
router.post("/accept", acceptOrder);
router.post("/verify-otp", verifyOTP);
router.post("/confirm", confirmDelivery);

export default router;
