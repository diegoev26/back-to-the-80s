const env = process.env,
  arrTrue: any[] = [1, "1", "true"];

export const privateOptions = {
  get apiDebug(): boolean {
    return arrTrue.includes(env?.API_DEBUG ?? "");
  },
} as const;
