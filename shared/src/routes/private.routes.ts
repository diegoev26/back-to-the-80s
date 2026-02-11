export const privateRoutes = {
  get service() {
    return process.env?.SERVICE_URL;
  },
} as const;
