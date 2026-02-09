import type { ResponseData } from "./main.types";

type ResponseSingleOrArray<T> = ResponseData<T> | ResponseData<T>[];
type HttpSuccessCode = 200;
type HttpEmptyCode = 201 | 204;
type HttpPartialCode = 207;
type HttpErrorCode = 400 | 401 | 403 | 404 | 409 | 422 | 500 | 502 | 503;

export type ApiResponse<T = any, E = any, R = any> =
  | {
      code: HttpSuccessCode;
      response: ResponseSingleOrArray<T>;
      error?: never;
      reference?: R | R[];
    }
  | {
      code: HttpEmptyCode;
      response?: ResponseSingleOrArray<T>;
      error?: never;
      reference?: R | R[];
    }
  | {
      code: HttpErrorCode;
      response?: never;
      error: ResponseSingleOrArray<E>;
      reference?: R | R[];
    }
  | {
      code: HttpPartialCode;
      response: ResponseSingleOrArray<T>;
      error: ResponseSingleOrArray<E>;
      reference?: R | R[];
    };

export type ApiResponsePayload<T, E, R> = {
  [K in ApiResponse<T, E, R> as K["code"]]: Omit<K, "code">;
};

export type ApiRequest<T = any> = {
  data: T;
};
