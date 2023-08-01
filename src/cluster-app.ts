import "express-async-errors";
import cors from "cors";
import express from "express";
import process from "node:process";
import cluster from "node:cluster";
import { router } from "./router";
import { errorMiddleware } from "./middlewares";
import { logMiddleware, logTypes } from "./logger";

const NUM_CPUS = 3;

export function Clusterize(PORT: number | string): void {
  const app = express();

  if (cluster.isPrimary) {
    logTypes.infoLogger.info(
      `[NODE:CLUSTER] - Primary ${process.pid} is running`
    );
    for (let i = 0; i < NUM_CPUS; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker, code, signal) => {
      logTypes.infoLogger.info(
        `[NODE:CLUSTER] - worker ${worker.process.pid} died - code: ${code} and signal: ${signal}`
      );
      console.log("recreating clusters...");
      cluster.fork();
    });
  } else {
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(logMiddleware);
    app.use(router);
    app.use(errorMiddleware);

    app.listen(PORT, async () => {
      logTypes.infoLogger.info(`listening on http://localhost:${PORT}`);
    });
  }
}
