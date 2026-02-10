export const config = {
  publicUrl: process.env?.NEXT_PUBLIC_PUBLIC_URL || "http://localhost:3000",
  apiUrl: process.env?.NEXT_PUBLIC_API_URL,
} as const;

export default config;
