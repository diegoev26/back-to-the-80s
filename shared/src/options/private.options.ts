import { getRuntimeEnv } from "../utils/env.utils";

export const privateOptions = (env: any) => {
  const contextEnv = getRuntimeEnv(env);

  return {
    get port() {
      return contextEnv?.GATEWAY_PORT ?? "4000";
    },
  } as const;
};
