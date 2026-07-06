import { HttpMethod } from "@/types/api.types";
import type { ApiRequest } from "@project/shared";

export interface ApiClientRequest<T = any> {
  method: HttpMethod;
  endpoint: string;
  body?: ApiRequest;
}
