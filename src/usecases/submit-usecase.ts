import { SubmitDTO } from "../submitDTO";
import { scrapper } from "../lib";
import { getCachedData, cacheData } from "../cache/redis";

export class SubmitUseCase {
  public static async execute(submitDTO: SubmitDTO): Promise<string> {
    const hasCache = await getCachedData(submitDTO.cpf);

    if (!hasCache) {
      const benefits = await scrapper(submitDTO);
      await cacheData(submitDTO.cpf, benefits);
      return benefits;
    }

    return hasCache;
  }
}
