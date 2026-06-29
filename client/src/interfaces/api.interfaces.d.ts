import { HttpMethod } from "@/types/api.types";
import { ApiRequest } from "@back-to-the-80s/shared";

export interface ApiClientRequest<T = any> {
  method: HttpMethod;
  endpoint: string;
  body?: ApiRequest;
}
