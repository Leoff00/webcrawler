import { app } from "./app";
import { logTypes } from "./logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  logTypes.infoLogger.info(`listening on http://localhost:${PORT}`);
});
