import { redis } from "../config/redis.js";
export const acquireLock = async (key) =>
  redis.set(key, "1", "NX", "EX", 3);
