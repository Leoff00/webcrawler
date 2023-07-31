import { createClient } from "redis";
import { logTypes } from "../logger";
import { REDIS_CACHABLE_TIME } from "../constants/redis-constants";

/**
 * Cache the benefit after the first scraping then return the data
 * @param submitDTO
 * @returns Promise<string> - benefit cached
 * @author Leoff00
 */

export async function getCachedData(cpf: string): Promise<string> {
  try {
    const client = createClient();
    await client.connect();

    const hasData = await client.get(cpf);
    await client.disconnect();

    return hasData;
  } catch (err) {
    logTypes.errorLog.error(err);
  }
}

export async function cacheData(cpf: string, data: string): Promise<string> {
  try {
    const client = createClient();
    await client.connect();

    const hasData = await getCachedData(cpf);

    if (!hasData) {
      await client.set(cpf, data, {
        EX: REDIS_CACHABLE_TIME,
      });
    }
    await client.disconnect();
    return JSON.parse(hasData);
  } catch (err: unknown) {
    logTypes.errorLog.error(err);
  }
}
