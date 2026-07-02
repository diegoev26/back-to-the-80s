import { apiPublicRoutes } from "@project/shared";
import { env } from "cloudflare:workers";

export const config = {
  ...apiPublicRoutes(env),
} as const;

export default config;
