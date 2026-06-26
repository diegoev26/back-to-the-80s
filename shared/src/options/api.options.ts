export const apiPublicRoutes = () =>
  ({
    get root() {
      return {
        url: process.env.NEXT_PUBLIC_PUBLIC_URL,
        assets: process.env.NEXT_PUBLIC_ASSETS_URL,
        serverless: process.env.NEXT_PUBLIC_API_SERVERLESS_URL,
      };
    },
    get images() {
      return { url: process.env.NEXT_PUBLIC_API_ROUTES_SERVERLESS_IMAGES_URL };
    },
  }) as const;
