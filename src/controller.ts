import errors from "./middlewares/errorMiddleware";
import list from "./constants/list";
import { Request, Response } from "express";
import { SubmitUseCase } from "./usecases/submit-usecase";
import { SubmitDTO } from "./submitDTO";

export class Controller {
  public static async handler(request: Request, response: Response) {
    const submitDTO = request.body as SubmitDTO;

    if (!list.includes(submitDTO.cpf)) {
      throw new errors.BadRequest(
        "CPF invalido! Por favor, digite um CPF valido."
      );
    }

    const benefits = await SubmitUseCase.execute(submitDTO);

    return response.status(200).json({
      status: 200,
      message: "Beneficios encontrados",
      benefits: benefits,
    });
  }
}
