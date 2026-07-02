import { getRuntimeEnv } from "../utils/env.utils.js";

export const publicOptions = (env: any) => {
  const contextEnv = getRuntimeEnv(env);

  return {
    get url() {
      return contextEnv?.NEXT_PUBLIC_PUBLIC_URL;
    },
  } as const;
};
