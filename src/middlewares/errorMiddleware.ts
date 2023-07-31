import { Request, Response, NextFunction } from "express";

interface ErrorProps extends Error {
  statusCode?: number;
  message: string;
}
async function errorMiddleware(
  error: ErrorProps,
  _: Request,
  response: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>>> {
  if (error && error.statusCode) {
    const hasStatus = error.statusCode ?? 500;
    const hasMessage = error.statusCode
      ? error.message
      : "Something went wrong, Internal Server Error.";
    return response.status(hasStatus).json({
      statusCode: hasStatus,
      message: hasMessage,
    });
  } else {
    console.log(error);
  }
  next();
}

class BadRequest extends Error {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default {
  errorMiddleware,
  BadRequest,
};
