import "dotenv/config";
import { Clusterize } from "./cluster-app";

const PORT = process.env.PORT || 3000;

Clusterize(PORT);
