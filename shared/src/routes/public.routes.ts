import { getRuntimeEnv } from "../utils/env.utils.js";

export const apiPublicRoutes = (env: any) => {
  const contextEnv = getRuntimeEnv(env);

  return {
    get root() {
      return {
        client: contextEnv?.NEXT_PUBLIC_PUBLIC_URL,
        assets: contextEnv?.NEXT_PUBLIC_ASSETS_URL,
        serverless: contextEnv?.NEXT_PUBLIC_API_SERVERLESS_URL,
      };
    },
    get images() {
      return {
        url: contextEnv?.NEXT_PUBLIC_API_ROUTES_SERVERLESS_IMAGES_URL,
      };
    },
  } as const;
};
