export const config = {
  publicUrl: process.env?.NEXT_PUBLIC_PUBLIC_URL,
  assets: process.env?.NEXT_PUBLIC_ASSETS_URL,
} as const;

export default config;
