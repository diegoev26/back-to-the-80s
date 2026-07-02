import { getRuntimeEnv } from "../utils/env.utils";

export const privateRoutes = (env: any) => {
  const contextEnv = getRuntimeEnv(env);
  return {
    get root() {
      return { service: contextEnv?.SERVICE_URL };
    },
  } as const;
};
