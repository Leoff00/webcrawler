/**
 * Time that a data should be cachable (in seconds) = 1 hour.
 * @constant REDIS_CACHABLE_TIME number
 * @author Leoff00
 */
export const REDIS_CACHABLE_TIME = 3600;

export const REDIS_URL =
  process.env.REDIS_CLIENT_URL || "redis://localhost:6379";
