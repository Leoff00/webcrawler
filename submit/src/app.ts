import "express-async-errors";
import cors from "cors";
import express from "express";
import { pinoHttp } from "pino-http";
import { router } from "./router";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(pinoHttp());
app.use(router);

export { app };
