import { SubmitDTO } from "../submitDTO";
import {
  consumeQueue,
  elasticIndex,
  produceMessages,
  scrapper,
  cacheData,
} from "../lib";

export class SubmitUseCase {
  public static async execute(submitDTO: SubmitDTO): Promise<void> {
    await produceMessages();
    const { hasCache } = await consumeQueue(submitDTO.cpf);

    if (!hasCache) {
      const benefits = await scrapper(submitDTO);
      await elasticIndex(benefits);
      await cacheData(submitDTO.cpf, benefits);
    }
  }
}
