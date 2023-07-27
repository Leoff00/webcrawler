import { Request, Response } from "express";
import { SubmitUseCase } from "./usecases/submit-service";
import { SubmitDTO } from "./submitDTO";

export class Controller {
  public static async handler(request: Request, response: Response) {
    const submitDTO = request.body as SubmitDTO;

    const cpf = await SubmitUseCase.execute(submitDTO);

    return response.json({
      status: 200,
      message: "Hello world",
      data: {
        cpf: cpf,
      },
    });
  }
}
