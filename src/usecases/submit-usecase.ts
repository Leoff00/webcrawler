import { SubmitDTO } from "../submitDTO";
import { consumeQueue, scrapper } from "../lib";
import { getCachedData, cacheData } from "../lib";

export class SubmitUseCase {
  public static async execute(submitDTO: SubmitDTO): Promise<string> {
    const hasCache = await getCachedData(submitDTO.cpf);
    const message = await consumeQueue();

    if (!hasCache) {
      const benefits = await scrapper(submitDTO);
      await cacheData(submitDTO.cpf, benefits);
      return benefits;
    }

    return hasCache;
  }
}
