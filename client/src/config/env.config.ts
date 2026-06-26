import { apiPublicRoutes } from "@back-to-the-80s/shared";

export const config = {
  ...apiPublicRoutes(),
} as const;

export default config;
