import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(import.meta.url),
  __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../../.env") });

const env = process.env;

const config = {
  port: parseInt(env?.PORT || "4000"),
} as const;

export default config;
