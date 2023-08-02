import { Request, Response, NextFunction } from "express";
import { format, createLogger, transports } from "winston";

const { combine, label, printf, colorize } = format;
const APP_NAME = "KONSI WEB CRAWLER";
const [date, time] = new Date()
  .toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
  })
  .split(",");

const info = printf(({ level, message, label }) => {
  return `[${level.toUpperCase()}] ${date}${time} [${label}]: ${message}`;
});

const error = printf(({ level, message, label }) => {
  return `[${level.toUpperCase()}] ${date}${time} [${label}]: ${message}`;
});

export const logTypes = {
  infoLogger: createLogger({
    level: "debug",
    format: combine(label({ label: APP_NAME }), info),
    transports: [new transports.Console()],
  }),
  errorLog: createLogger({
    level: "error",
    format: combine(label({ label: APP_NAME }), error),
    transports: [new transports.Console()],
  }),
};

export function logMiddleware(
  request: Request,
  _: Response,
  next: NextFunction
) {
  const custom = createLogger({
    format: combine(colorize(), format.simple()),
    transports: [new transports.Console()],
  });

  custom.log(
    "info",
    `${date}${time} [${APP_NAME}]: ${request.method} | ${request.path}`
  );

  next();
}
