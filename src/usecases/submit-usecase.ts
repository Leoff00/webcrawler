import { SubmitDTO } from "../submitDTO";
import {
  consumeQueue,
  elasticIndex,
  elasticSearch,
  produceMessages,
  scrapper,
  cacheData,
} from "../lib";
import { SearchHit } from "@elastic/elasticsearch/lib/api/types";

type SubmitUseCasePropsNoCache = {
  cache: string;
  benefits: string;
};

type SubmitUseCasePropsCache = {
  cache: string;
  benefits: SearchHit<unknown>[];
};

export class SubmitUseCase {
  public static async execute(
    submitDTO: SubmitDTO
  ): Promise<SubmitUseCasePropsNoCache | SubmitUseCasePropsCache> {
    await produceMessages();
    const { hasCache } = await consumeQueue(submitDTO.cpf);

    if (!hasCache) {
      const benefits = await scrapper(submitDTO);
      await elasticIndex(benefits);
      await cacheData(submitDTO.cpf, benefits);
      return { cache: "data not cached", benefits: benefits };
    }

    const resultCache = await elasticSearch();
    return { cache: "data cached", benefits: resultCache.hits.hits };
  }
}
