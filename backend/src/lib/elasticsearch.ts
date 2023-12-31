import { ELASTIC_URL } from "../constants";
import { Client } from "@elastic/elasticsearch";
import { logTypes } from "../logger";
import {
  AggregationsAggregate,
  SearchResponse,
} from "@elastic/elasticsearch/lib/api/types";

/**
 * Elastic search function that search the benefit metric.
 * @returns Promise<SearchResponse<unknown, Record<string, AggregationsAggregate>>>
 * - benefits found.
 * @author Leoff00
 */
export async function elasticSearch(): Promise<
  SearchResponse<unknown, Record<string, AggregationsAggregate>>
> {
  const client = new Client({
    node: ELASTIC_URL,
  });
  try {
    const result = await client.search({
      index: "benefits",
    });

    await client.close();

    logTypes.infoLogger.info(`[ELASTIC] - Consulting elasticsearch query!`);
    return result;
  } catch (error: unknown) {
    logTypes.errorLog.error(`[ELASTIC] - ${error}`);
  }
}

export async function elasticSearchById(
  elasticId: string
): Promise<SearchResponse<unknown, Record<string, AggregationsAggregate>>> {
  const client = new Client({
    node: ELASTIC_URL,
  });
  try {
    const result = await client.search({
      index: "benefits",
      query: {
        match: {
          _id: elasticId,
        },
      },
    });

    await client.close();

    logTypes.infoLogger.info(`[ELASTIC] - Consulting elasticsearch query!`);
    return result;
  } catch (error: unknown) {
    logTypes.errorLog.error(`[ELASTIC] - ${error}`);
  }
}

export async function elasticIndex(benefits: string): Promise<void> {
  const client = new Client({
    node: ELASTIC_URL,
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
    logTypes.errorLog.error(`[ELASTIC] - ${error}`);
  }
}
