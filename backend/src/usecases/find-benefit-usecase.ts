import { SearchHit } from "@elastic/elasticsearch/lib/api/types";
import { elasticSearchById } from "../lib";

type SubmitUseCasePropsCache = {
  cache: string;
  benefitById: SearchHit<unknown>[];
};

export class FindBenefitUseCase {
  public static async execute(
    elasticId: string
  ): Promise<SubmitUseCasePropsCache> {
    const resultCache = await elasticSearchById(elasticId);

    return { cache: "data cached", benefitById: resultCache.hits.hits };
  }
}
