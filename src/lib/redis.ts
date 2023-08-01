import { createClient, ErrorReply, ClientOfflineError } from "redis";
import { logTypes } from "../logger";
import { REDIS_CACHABLE_TIME } from "../constants";

/**
 * Get cached data then return to the client.
 * @param cpf string
 * @returns Promise<string> - benefit cached
 * @author Leoff00
 */
export async function getCachedData(cpf: string): Promise<string> {
  const redis = createClient({
    url: process.env.REDIS_CLIENT_URL,
  });

  try {
    await redis.connect();
    const hasData = await redis.get(cpf);

    if (!hasData) {
      logTypes.infoLogger.info("[REDIS] - Data wasn't cached yet");
    }

    await redis.disconnect();
    return hasData;
  } catch (error: unknown) {
    if (error) {
      const err = error as ErrorReply;
      logTypes.errorLog.error(`[REDIS] - ${err}`);
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
export async function cacheData(cpf: string, data: string): Promise<void> {
  const redis = createClient({
    url: process.env.REDIS_CLIENT_URL,
  });

  try {
    await redis.connect();
    await redis.set(cpf, data, {
      EX: REDIS_CACHABLE_TIME,
    });

    logTypes.infoLogger.info("[REDIS] - Data successfully cached!");
    await redis.disconnect();
  } catch (error: unknown) {
    if (error) {
      const err = error as ErrorReply;
      logTypes.errorLog.error(`[REDIS] - ${err}`);
    }
  }
}
