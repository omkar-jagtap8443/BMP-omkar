import * as h3 from "h3-js";
import { redis } from "../config/redis.js";

export const updateLocation = async (req, res) => {
  // Use static/dummy travellerId for testing if not provided
  let { travellerId, lat, lng } = req.body;
  if (!travellerId) travellerId = "dummy-traveller-001";

  const cell = h3.latLngToCell(lat, lng, 9);

  await redis.sadd(`h3:${cell}`, travellerId);
  await redis.hset(`traveller:${travellerId}`, { lat, lng });
  await redis.expire(`h3:${cell}`, 500); // testing TTL

  // Debug: print cell and set contents
  const members = await redis.smembers(`h3:${cell}`);
  console.log(`[DEBUG] Traveller location update: cell=${cell}, members=${JSON.stringify(members)}`);

  res.json({ status: "ONLINE", cell, members });
};
