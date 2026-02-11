export const privateOptions = {
  get port() {
    return process.env.GATEWAY_PORT ?? "4000";
  },
} as const;
