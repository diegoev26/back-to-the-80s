import { apiPublicRoutes, publicOptions } from "@back-to-the-80s/shared";

const clientEnv = {
    NEXT_PUBLIC_PUBLIC_URL: process.env?.NEXT_PUBLIC_PUBLIC_URL,
    NEXT_PUBLIC_ASSETS_URL: process.env?.NEXT_PUBLIC_ASSETS_URL,
    NEXT_PUBLIC_API_SERVERLESS_URL: process.env?.NEXT_PUBLIC_API_SERVERLESS_URL,
    NEXT_PUBLIC_API_SERVERLESS_AUTH:
      process.env?.NEXT_PUBLIC_API_SERVERLESS_AUTH,
    NEXT_PUBLIC_API_ROUTES_SERVERLESS_IMAGES_URL:
      process.env?.NEXT_PUBLIC_API_ROUTES_SERVERLESS_IMAGES_URL,
  },
  config = {
    options: publicOptions(clientEnv),
    routes: apiPublicRoutes(clientEnv),
  } as const;

export default config;
