import { redis } from "../config/redis.js";
export const findNearbyTravellers = async (cells) => {
  let set = new Set();
  for (let c of cells) {
    const ids = await redis.smembers(`h3:${c}`);
    ids.forEach(i => set.add(i));
  }
  return [...set];
};
