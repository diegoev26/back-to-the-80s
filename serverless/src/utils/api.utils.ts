import type { ApiResponse, ApiResponsePayload } from "@back-to-the-80s/shared";
import { ServerlessResponseResult } from "../interfaces/api.interfaces.js";
import { getCorsHeaders } from "../middlewares/cors.js";

function buildServerlessResponse<
  C extends ApiResponse["code"],
  P extends ApiResponsePayload<any, any, any>[C],
>(req: Request, code: C, payload: P): ServerlessResponseResult {
  const fullResponse = {
    code,
    ...payload,
  };

  return {
    statusCode: code,
    body: JSON.stringify(fullResponse),
    headers: getCorsHeaders(req),
  };
}

export function sendServerlessResponse<
  C extends ApiResponse["code"],
  T = any,
  E = any,
  R = any,
>(req: Request, code: C, payload: ApiResponsePayload<T, E, R>[C]): Response {
  const result = buildServerlessResponse(req, code, payload);

  return new Response(result.body, {
    status: result.statusCode,
    headers: result.headers,
  });
}
