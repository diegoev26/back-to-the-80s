import { publicOptions } from "@project/shared";

export const config = {
  ...publicOptions(process.env),
} as const;

export default config;
