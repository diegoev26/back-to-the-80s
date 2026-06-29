export const getRuntimeEnv = (explicitEnv?: any): any => {
  if (
    explicitEnv &&
    typeof explicitEnv === "object" &&
    !Array.isArray(explicitEnv) &&
    Object.keys(explicitEnv).length > 0
  )
    return explicitEnv;

  const globalProcessEnv = (globalThis as any).process?.env;
  if (globalProcessEnv && Object.keys(globalProcessEnv).length > 0)
    return globalProcessEnv;

  return globalThis;
};
