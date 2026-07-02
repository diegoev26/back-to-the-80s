import type { Response } from "express";
import type {
  ApiResponse,
  ApiResponsePayload,
  ResponseData,
} from "@project/shared";

export function sendResponse<
  C extends ApiResponse["code"],
  T extends ResponseData = any,
  E extends ResponseData = any,
  R = any,
>(res: Response, code: C, payload: ApiResponsePayload<T, E, R>[C]): Response {
  return res.status(code).send({ code, ...payload } as ApiResponse);
}
