import { getRuntimeEnv } from "../utils/env.utils";

export const publicOptions = (env: any) => {
  const contextEnv = getRuntimeEnv(env);

  return {
    get serverlessApiKey(): string {
      return contextEnv?.NEXT_PUBLIC_API_SERVERLESS_AUTH ?? "";
    },
  } as const;
};
