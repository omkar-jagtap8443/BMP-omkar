import { db } from "../config/db.js";
import { ORDER_STATUS } from "../constants/orderStatus.js";
import { v4 as uuidv4 } from "uuid";
import validator from "validator";
import * as h3 from "h3-js";
import { redis } from "../config/redis.js";

/**
 * USER CREATES ORDER
 * → Finds nearby travellers (2km radius)
 */
export const createOrder = async (req, res) => {
  try {
    const { userId, pickup, drop, item } = req.body;

    const orderId = uuidv4();

    // Save order in DB
    await db.query(
      `INSERT INTO orders(id, data, status)
       VALUES ($1, $2, $3)`,
      [
        orderId,
        { userId, pickup, drop, item },
        ORDER_STATUS.SEARCHING
      ]
    );

    // H3 based nearby matching
    const pickupCell = h3.latLngToCell(pickup.lat, pickup.lng, 9);
  const nearbyCells = h3.gridDisk(pickupCell, 4);
  

    const travellerSet = new Set();

    for (const cell of nearbyCells) {
      const travellers = await redis.smembers(`h3:${cell}`);
      travellers.forEach(t => travellerSet.add(t));
    }

    const nearbyTravellers = [...travellerSet];

    console.log("📍 Pickup cell:", pickupCell);
    console.log("🚚 Nearby travellers:", nearbyTravellers);

    // (Socket emit yahin aayega later)
    nearbyTravellers.forEach(tid => {
      console.log(`📢 Order ${orderId} sent to traveller ${tid}`);
    });

    return res.json({
      orderId,
      notifiedTravellers: nearbyTravellers
    });

  } catch (err) {
    console.error("Create order error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * TRAVELLER ACCEPTS ORDER
 * → First accept wins (Redis lock)
 * → Traveller & user location exchange
 */
export const acceptOrder = async (req, res) => {
  try {
    const { orderId, travellerId } = req.body;

    // Validate UUIDs
    if (!validator.isUUID(orderId)) {
      return res.status(400).json({ error: "Invalid orderId" });
    }
    if (!validator.isUUID(travellerId)) {
      return res.status(400).json({ error: "Invalid travellerId" });
    }

    // 🔐 Redis lock (first accept wins)
    const lock = await redis.set(
      `lock:order:${orderId}`,
      travellerId,
      "NX",
      "EX",
      30
    );

    if (!lock) {
      return res.status(409).json({
        error: "Order already accepted by another traveller"
      });
    }

    // Fetch order
    const result = await db.query(
      "SELECT * FROM orders WHERE id = $1",
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = result.rows[0];

    if (order.status !== ORDER_STATUS.SEARCHING) {
      return res.status(400).json({
        error: "Order is not in SEARCHING state"
      });
    }

    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Update order
    await db.query(
      `UPDATE orders
       SET status=$1, traveller_id=$2, otp=$3
       WHERE id=$4`,
      [ORDER_STATUS.ACCEPTED, travellerId, otp, orderId]
    );

    // Get traveller live location from Redis
    const travellerLocation = await redis.hgetall(`traveller:${travellerId}`);

    return res.json({
      status: "ACCEPTED",
      otp,
      traveller: {
        id: travellerId,
        location: {
          lat: travellerLocation.lat,
          lng: travellerLocation.lng
        }
      },
      user: {
        pickup: order.data.pickup,
        drop: order.data.drop
      }
    });

  } catch (err) {
    console.error("Accept order error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * OTP VERIFY (PICKUP)
 */
export const verifyOTP = async (req, res) => {
  try {
    const { orderId, otp } = req.body;

    if (!validator.isUUID(orderId)) {
      return res.status(400).json({ error: "Invalid orderId" });
    }

    const result = await db.query(
      "SELECT * FROM orders WHERE id=$1",
      [orderId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const order = result.rows[0];

    if (order.otp !== otp) {
      return res.status(400).json({ error: "Invalid OTP" });
    }

    await db.query(
      "UPDATE orders SET status=$1 WHERE id=$2",
      [ORDER_STATUS.PICKED_UP, orderId]
    );

    return res.json({ status: "PICKED_UP" });

  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * DELIVERY CONFIRM
 */
export const confirmDelivery = async (req, res) => {
  try {
    const { orderId } = req.body;

    if (!validator.isUUID(orderId)) {
      return res.status(400).json({ error: "Invalid orderId" });
    }

    await db.query(
      "UPDATE orders SET status=$1 WHERE id=$2",
      [ORDER_STATUS.COMPLETED, orderId]
    );

    return res.json({ status: "COMPLETED" });

  } catch (err) {
    console.error("Confirm delivery error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
