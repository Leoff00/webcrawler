import { BadRequest } from "./middlewares";
import { CPF_LIST } from "./constants";
import { Request, Response } from "express";
import { SubmitDTO } from "./submitDTO";
import {
  FindBenefitUseCase,
  FindBenefitsUseCase,
  SubmitUseCase,
} from "./usecases";

export class Controller {
  public static async SubmitBenefitsHandler(
    request: Request,
    response: Response
  ) {
    const submitDTO = request.body as SubmitDTO;

    if (!CPF_LIST.includes(submitDTO.cpf)) {
      throw new BadRequest("CPF invalido! Por favor, digite um CPF valido.");
    }

    await SubmitUseCase.execute(submitDTO);

    return response.status(201).json({
      status: 201,
      message: "Beneficio indexado",
    });
  }
  public static async FindBenefitsHandler(_: Request, response: Response) {
    const { benefits, cache } = await FindBenefitsUseCase.execute();

    if (!benefits) {
      return response.status(422).json({
        status: 422,
        message: `Oops, parece que o benefício ainda não foi indexado, tente 
          fazer a requisição novamente.`,
      });
    }

    return response.status(200).json({
      status: 200,
      message: "Beneficios encontrados",
      cache: cache,
      benefits: benefits,
    });
  }

  public static async FindBenefitHandler(request: Request, response: Response) {
    const elasticId = request.params.elasticId as string;

    if (!elasticId) {
      throw new BadRequest("ID elastico para consulta obrigatório!");
    }

    const { benefitById, cache } = await FindBenefitUseCase.execute(elasticId);

    if (!benefitById) {
      return response.status(422).json({
        status: 422,
        message: `Oops, benefício ainda não foi cacheado, tente 
          fazer a requisição novamente.`,
      });
    }

    return response.status(200).json({
      status: 200,
      message: "Beneficios encontrados",
      cache: cache,
      benefit: benefitById,
    });
  }
}
