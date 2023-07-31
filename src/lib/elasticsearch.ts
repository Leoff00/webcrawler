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
export async function eqlSearch(): Promise<
  SearchResponse<unknown, Record<string, AggregationsAggregate>>
> {
  const client = new Client({
    node: "http://localhost:9200",
  });
  try {
    client;
    logTypes.infoLogger.info("Connected with elasticsearch!");
    const result = await client.search({
      index: "benefits",
    });

    await client.close();

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
export async function eqlIndex(benefits: string): Promise<void> {
  const client = new Client({
    node: "http://localhost:9200",
  });
  try {
    const info = await client.info();
    logTypes.infoLogger.info(
      "Connected with elasticsearch!",
      info.cluster_name
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
