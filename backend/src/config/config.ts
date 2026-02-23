import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../../.env") });

import { privateOptions, privateRoutes } from "@project/shared";

const config = {
  port: parseInt(privateOptions?.port || "4000"),
  routes: { serviceUrl: privateRoutes.service },
} as const;

export default config;
