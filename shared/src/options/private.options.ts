import { arrTrue } from "../utils/main.utils";

export const privateOptions = () =>
  ({
    get apiDebug(): boolean {
      return arrTrue.includes(process.env?.API_DEBUG ?? "");
    },
  }) as const;
