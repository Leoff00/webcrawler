import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import { elasticSearch } from "../lib";

type SubmitUseCasePropsCache = {
  cache: string;
  benefits: SearchHit<unknown>[];
};

export class FindBenefitsUseCase {
  public static async execute(): Promise<SubmitUseCasePropsCache> {
    const resultCache = await elasticSearch();

    return { cache: "data cached", benefits: resultCache.hits.hits };
  }
}
