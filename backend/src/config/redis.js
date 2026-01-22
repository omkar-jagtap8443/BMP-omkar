import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL, {
  tls: {},                 // TLS enable (Upstash needs this)
  maxRetriesPerRequest: 3,
  retryStrategy(times) {
    if (times > 3) return null;
    return 1000;
  }
});

redis.on("connect", () => {
  console.log("✅ Redis connected (Upstash)");
});

redis.on("error", (err) => {
  console.error("❌ Redis error:", err.message);
});
