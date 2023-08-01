import { Request, Response, NextFunction } from "express";
import { BadRequest } from "./errorMiddleware";
import { SubmitDTO } from "submitDTO";

const AUTH = ["konsiteste2", "konsiteste7"];

export function loginMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
): void {
  const submitDTO = request.body as SubmitDTO;
  const withoutLogin =
    !AUTH.includes(submitDTO.login) || !AUTH.includes(submitDTO.password);
  if (withoutLogin) {
    throw new BadRequest("Login ou senha invalidos.");
  }

  next();
}
