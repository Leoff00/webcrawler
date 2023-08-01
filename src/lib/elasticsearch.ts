import { Client } from "@elastic/elasticsearch";
import { logTypes } from "../logger";
import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";

/**
 * Elastic search function that search the benefit metric.
 * @returns Promise<SearchResponse<unknown, Record<string, AggregationsAggregate>>>
 *  benefit searched
 * @author Leoff00
 */
export async function elasticSearch(): Promise<
  SearchResponse<unknown, Record<string, AggregationsAggregate>>
> {
  const client = new Client({
    node: process.env.ELASTIC_CLIENT_URL,
  });
  try {
    const result = await client.search({
      index: "benefits",
    });

    await client.close();

    logTypes.infoLogger.info(`[ELASTIC] - Consulting elasticsearch query!`);
    return result;
  } catch (error: unknown) {
    logTypes.errorLog.error(error);
  }
}

/**
 * Elastic search function index the benefit metric in elasticsearch.
 * @param benefits string
 * @returns Promise<void>
 *  benefit indexed
 * @author Leoff00
 */
export async function elasticIndex(benefits: string): Promise<void> {
  const client = new Client({
    node: process.env.ELASTIC_CLIENT_URL,
  });
  try {
    logTypes.infoLogger.info(
      "[ELASTIC] - Indexing data in elasticsearch query!"
    );
    await client.index({
      index: "benefits",
      body: {
        benefits: benefits,
      },
    });

    await client.close();
  } catch (error: unknown) {
    logTypes.errorLog.error(error);
  }
}
