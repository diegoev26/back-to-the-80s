import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../../.env") });

import {
  privateOptions,
  privateRoutes,
  apiPublicRoutes,
} from "@project/shared";

const config: Record<"options" | "routes", any> = {
  options: privateOptions(process.env),
  routes: { ...privateRoutes(process.env), ...apiPublicRoutes(process.env) },
} as const;

export default config;
