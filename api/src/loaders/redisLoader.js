import { createClient } from "redis";
import pc from "picocolors";

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT * 1 || 6379,
  },
});

console.log(pc.yellow("Redis: Connecting..."));

redisClient.on("connect", () => {
  console.log(pc.green("🟢  Redis: Connected."));
});

redisClient.on("ready", () => {
  console.log(pc.green("🟢  Redis: Ready."));
});

redisClient.on("reconnecting", () => {
  console.log(pc.yellow("🟡  Redis: Reconnecting..."));
});

redisClient.on("error", (err) => {
  console.log(pc.red(`🔴  Redis: ${err.message}`));
});

/**
 * Get cache
 *
 * @returns {Promise<array|null>} Array of object or null
 */
async function getCache(key) {
  return JSON.parse((await redisClient.get(key)) || null);
}

/**
 * Set cache
 *
 * @returns {void}
 */
function setCache(key, data) {
  redisClient.set(key, JSON.stringify(data)).catch((err) => {
    console.log("🔴  REDIS: Failed to set data");
  });
}

export { redisClient, getCache, setCache };
