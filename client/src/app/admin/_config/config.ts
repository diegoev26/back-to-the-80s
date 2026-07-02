import { apiPublicRoutes } from "@project/shared";

const clientEnv = {
    NEXT_PUBLIC_PUBLIC_URL: process.env?.NEXT_PUBLIC_PUBLIC_URL,
    NEXT_PUBLIC_API_SERVERLESS_WORKER_URL:
      process.env?.NEXT_PUBLIC_API_SERVERLESS_WORKER_URL,
    NEXT_PUBLIC_API_URL_TEST: process.env?.NEXT_PUBLIC_API_URL_TEST,
  },
  config = {
    routes: { ...apiPublicRoutes(clientEnv) },
  } as const;

export default config;
