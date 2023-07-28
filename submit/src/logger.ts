import { Request, Response, NextFunction } from "express";
import { format, createLogger, transports } from "winston";

const { combine, label, printf, colorize } = format;
const APP_NAME = "KONSI WEB CRAWLER";
const now = new Date().toISOString().split("T")[0];

const info = printf(({ level, message, label }) => {
  return `[${level.toUpperCase()}] ${now} [${label}]: ${message}`;
});

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
    `${now} [${APP_NAME}]: | ${request.method} | ${request.path}`
  );

  next();
}

export const infoLogger = createLogger({
  level: "debug",
  format: combine(label({ label: APP_NAME }), info),
  transports: [new transports.Console()],
});
