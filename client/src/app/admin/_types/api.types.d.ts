import { ApiResponse, ApiRequest } from "@project/shared";

export type ApiFunction<T, P> = (
  params: ApiRequest<P>,
) => Promise<ApiResponse<T>>;
