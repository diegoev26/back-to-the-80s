import { ApiResponse, ApiRequest } from "@hafele/shared";

export type ApiFunction<T, P> = (
  params: ApiRequest<P>,
) => Promise<ApiResponse<T>>;
