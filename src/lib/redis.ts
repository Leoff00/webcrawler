import { createClient, ErrorReply } from "redis";
import { logTypes } from "../logger";
import { REDIS_CACHABLE_TIME } from "../constants";

const redis = createClient({
  url: "redis://localhost:6379",
});

/**
 * Get cached data then return to the client.
 * @param cpf string
 * @returns Promise<string> - benefit cached
 * @author Leoff00
 */
export async function getCachedData(cpf: string): Promise<string> {
  try {
    await redis.connect();
    const hasData = await redis.get(cpf);
    await redis.disconnect();
    return hasData;
  } catch (error: unknown) {
    if (error) {
      const err = error as ErrorReply;
      logTypes.errorLog.error(err);
    }
  }
}

/**
 * Store the data if hasn't cache.
 * @param cpf string
 * @param data string
 * @returns Promise<string> - benefit cached
 * @author Leoff00
 */
export async function cacheData(cpf: string, data: string): Promise<string> {
  try {
    await redis.connect();
    const hasData = await getCachedData(cpf);

    if (!hasData) {
      await redis.set(cpf, data, {
        EX: REDIS_CACHABLE_TIME,
      });
    }
    await redis.disconnect();
    return hasData;
  } catch (error: unknown) {
    if (error) {
      const err = error as ErrorReply;
      logTypes.errorLog.error(err);
    }
  }
}
