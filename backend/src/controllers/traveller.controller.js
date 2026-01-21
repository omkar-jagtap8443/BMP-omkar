import * as h3 from "h3-js";
import { redis } from "../config/redis.js";

export const updateLocation = async (req, res) => {
  const { travellerId, lat, lng } = req.body;

  const cell = h3.latLngToCell(lat, lng, 9);

  await redis.sadd(`h3:${cell}`, travellerId);
  await redis.hset(`traveller:${travellerId}`, { lat, lng });
  await redis.expire(`h3:${cell}`, 500); // testing TTL

  res.json({ status: "ONLINE", cell });
};
