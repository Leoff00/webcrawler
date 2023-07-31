import { Request, Response, NextFunction } from "express";
import { format, createLogger, transports } from "winston";

const { combine, label, printf, colorize } = format;
const APP_NAME = "KONSI WEB CRAWLER";
const date = new Date().toISOString().split("T")[0];
const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getMinutes()}`;

const info = printf(({ level, message, label }) => {
  return `[${level.toUpperCase()}] ${date} ${time} [${label}]: ${message}`;
});

const error = printf(({ level, message, label }) => {
  return `[${level.toUpperCase()}] ${date} ${time} [${label}]: ${message}`;
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
    `${date} [${APP_NAME}]: | ${request.method} | ${request.path}`
  );

  next();
}
