import { withCache } from "../../middlewares/cache.middlewares.js";
import { Env } from "../../types/env.js";
import { testApi } from "./test.controller.js";

type ControllerHandler = (req: Request, env: Env) => Promise<Response>;
type RouteMap = Record<string, ControllerHandler>;

const ROUTES: RouteMap = {
  "GET:/": withCache(testApi, 86400),
};

export const handleTestRoutes = async (
  request: Request,
  env: Env,
  url: string,
): Promise<Response | null> => {
  const routeKey = `${request.method}:${url}`;
  const controller = ROUTES[routeKey];

  if (controller) return await controller(request, env);

  return null;
};
