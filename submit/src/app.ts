import "express-async-errors";
import cors from "cors";
import express from "express";
import { router } from "./router";
import { logMiddleware } from "./logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logMiddleware);
app.use(router);

export { app };
