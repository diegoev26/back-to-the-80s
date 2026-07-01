import { ExecutionContext } from "@cloudflare/workers-types";
import { Env } from "./types/env.js";
import {
  handleOptions,
  getCorsHeaders,
} from "./middlewares/headers.middlewares.js";
import { validateAuth } from "./middlewares/auth.middlewares.js";
import { handleImageRoutes } from "./modules/images/images.routes.js";
import config from "./config/env.config.js";
import { sendServerlessResponse } from "./utils/api.utils.js";

const ROUTER: Record<
  string,
  (req: Request, env: Env, url: string) => Promise<Response | null>
> = {
  [config.images.url]: handleImageRoutes,
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

    return sendServerlessResponse(request, 404, {
      error: { message: "Ruta o método no encontrado" },
    });
  },
};
