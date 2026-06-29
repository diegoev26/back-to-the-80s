import { apiPublicRoutes } from "@back-to-the-80s/shared";
import { env } from "cloudflare:workers";

export const config = {
  ...apiPublicRoutes(env),
} as const;

export default config;
