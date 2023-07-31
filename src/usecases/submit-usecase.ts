import { SubmitDTO } from "../submitDTO";
import {
  consumeQueue,
  eqlIndex,
  eqlSearch,
  produceMessages,
  scrapper,
} from "../lib";
import { cacheData } from "../lib";

export class SubmitUseCase {
  public static async execute(submitDTO: SubmitDTO): Promise<any> {
    await produceMessages();
    const { hasCache, messageRes } = await consumeQueue(submitDTO.cpf);

    if (!hasCache) {
      const benefits = await scrapper(submitDTO);
      await cacheData(submitDTO.cpf, benefits);
      await eqlIndex(benefits || messageRes);
      const resultNoCache = await eqlSearch();
      return resultNoCache.hits.hits;
    }

    const resultCache = await eqlSearch();
    return resultCache.hits.hits;
  }
}
