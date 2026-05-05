import Redis from "ioredis";

const redisUrl = process.env.REDIS_URL || "";

// If REDIS_URL is not set, we export null to safely bypass caching in local dev
export const redis = redisUrl ? new Redis(redisUrl) : null;

// Graceful error handling
if (redis) {
  redis.on("error", (err) => {
    console.error("Redis error:", err);
  });
}
