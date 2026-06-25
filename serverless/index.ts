import { ExecutionContext } from "@cloudflare/workers-types";
import { Env } from "./src/types/env.js";
import { handleOptions, getCorsHeaders } from "./src/middlewares/cors.js";
import { validateAuth } from "./src/middlewares/auth.js";
import { handleImageRoutes } from "./src/routes/images.routes.js";

const ROUTER: Record<
  string,
  (req: Request, env: Env, url: string) => Promise<Response | null>
> = {
  "/images": handleImageRoutes,
};

export default {
  async fetch(
    request: Request,
    env: Env,
    _: ExecutionContext,
  ): Promise<Response> {
    const optionsResponse = handleOptions(request);
    if (optionsResponse) return optionsResponse;

    const authError = validateAuth(request, env);
    if (authError) return authError;

    const url = new URL(request.url),
      pathname = url.pathname;

    for (const prefix of Object.keys(ROUTER)) {
      if (pathname.startsWith(prefix)) {
        const subPath = pathname.slice(prefix.length) || "/",
          handler = ROUTER[prefix],
          response = await handler(request, env, subPath);
        if (response) return response;
      }
    }

    return new Response(
      JSON.stringify({ error: "Ruta o método no encontrado" }),
      {
        status: 404,
        headers: getCorsHeaders(request),
      },
    );
  },
};
