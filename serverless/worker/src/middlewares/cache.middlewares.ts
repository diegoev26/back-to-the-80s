import { ControllerHandler } from "../types/cache.js";
import { Env } from "../types/env.js";

export const withCache = (
  controller: ControllerHandler,
  ttl: number = 3600,
): ControllerHandler => {
  return async (request: Request, env: Env): Promise<Response> => {
    if (request.method !== "GET") return await controller(request, env);

    const cache = caches.default,
      cacheKey = new Request(request.url, request),
      response = await cache.match(cacheKey);

    if (!response) {
      const originalResponse = await controller(request, env);
      if (!originalResponse.ok) return originalResponse;

      const cachedResponse = new Response(
        originalResponse.clone().body,
        originalResponse,
      );
      cachedResponse.headers.set(
        "Cache-Control",
        `public, s-maxage=${ttl}, stale-while-revalidate=${Math.floor(ttl * 0.1)}`,
      );
      await cache.put(cacheKey, cachedResponse.clone());
      return cachedResponse;
    }

    return response;
  };
};
