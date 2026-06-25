const env = process.env;

export const apiPublicRoutes = {
  get root() {
    return {
      url: env?.NEXT_PUBLIC_PUBLIC_URL,
      assets: env?.NEXT_PUBLIC_ASSETS_URL,
      api: env?.NEXT_PUBLIC_API_SERVERLESS_URL,
    };
  },
  get images() {
    return { url: env?.NEXT_PUBLIC_API_SERVERLESS_IMAGES_URL };
  },
} as const;

export const apiPrivateRoutes = {} as const;
