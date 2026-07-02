import { getRuntimeEnv } from "../utils/env.utils.js";

export const apiPublicRoutes = (env: any) => {
  const contextEnv = getRuntimeEnv(env);

  return {
    get root() {
      return {
        client: contextEnv?.NEXT_PUBLIC_PUBLIC_URL,
        gateway: contextEnv?.NEXT_PUBLIC_GATEWAY_URL,
        worker: contextEnv?.NEXT_PUBLIC_API_SERVERLESS_WORKER_URL,
      };
    },
    get test() {
      return {
        url: contextEnv?.NEXT_PUBLIC_API_URL_TEST,
      };
    },
  } as const;
};
