import { connection } from './queues';

/**
 * Simple Redis-based rate limiter (token bucket) per key.
 * @param {string} key Unique identifier (e.g. userId or IP).
 * @param {number} limit Max requests per window.
 * @param {number} window Seconds for rate-limit window.
 */
export async function rateLimit(key, limit = 60, window = 60) {
  const redisKey = `rl:${key}`;
  const count = await connection.incr(redisKey);
  if (count === 1) {
    await connection.expire(redisKey, window);
  }
  if (count > limit) {
    const ttl = await connection.ttl(redisKey);
    const err = new Error(`Rate limit exceeded, retry in ${ttl}s`);
    err.status = 429;
    throw err;
  }
  return { remaining: limit - count };
}
