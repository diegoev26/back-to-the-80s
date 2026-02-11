export const publicRoutes = {
  get api() {
    return process.env?.NEXT_PUBLIC_API_URL;
  },
  get test() {
    return process.env?.NEXT_PUBLIC_API_URL_TEST;
  },
} as const;
