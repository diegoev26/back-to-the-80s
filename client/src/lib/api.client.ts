import config from "@/config/env.config";
import type { ApiClientRequest } from "@/interfaces/api.interfaces";
import type { ApiResponse } from "@project/shared";

const BASE_URL = `${config?.routes?.root?.serverless ?? ""}`;

let userid: string | undefined;

export const setApiUser = (user: string | undefined) => {
  userid = user;
};

export async function apiClient<T = any, E = any, R = any>({
  method,
  endpoint,
  body,
}: ApiClientRequest): Promise<ApiResponse<T, E, R>> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${config?.options?.serverlessApiKey}`,
    },
    ...(body && {
      body: JSON.stringify({
        ...body,
        userid: userid ?? "Unknown Client User",
      }),
    }),
  });

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json"))
    return await response.json();

  return {
    code: response.status ?? 500,
    error: [{ message: `Error de red: ${response.statusText}` }],
    reference: endpoint,
  } as ApiResponse<T, E, R>;
}
