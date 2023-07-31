import { produceMessages } from "./lib";
import { app } from "./app";
import { logTypes } from "./logger";

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  await produceMessages();
  logTypes.infoLogger.info(`listening on http://localhost:${PORT}`);
});
