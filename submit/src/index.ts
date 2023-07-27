import { app } from "./app";
import { infoLogger } from "./logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  infoLogger.info(`listening on http://localhost:${PORT}`)
);
