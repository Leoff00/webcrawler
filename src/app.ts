import "express-async-errors";
import cors from "cors";
import errors from "./middlewares/errorMiddleware";
import express from "express";
import { router } from "./router";
import { logMiddleware } from "./logger";
import { loginMiddleware } from "./middlewares/loginMiddleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logMiddleware);
app.use(loginMiddleware);
app.use(router);
app.use(errors.errorMiddleware);

export { app };
