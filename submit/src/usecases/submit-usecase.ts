import { SubmitDTO } from "../submitDTO";
import { scrapper } from "../lib";

export class SubmitUseCase {
  public static async execute(submitDTO: SubmitDTO): Promise<string> {
    const result = await scrapper(submitDTO);

    return result;
  }
}
