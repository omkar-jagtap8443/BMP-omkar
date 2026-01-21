import express from "express";
import { updateLocation } from "../controllers/traveller.controller.js";
const router = express.Router();

router.post("/location", updateLocation);
export default router;
