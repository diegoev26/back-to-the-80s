import {
  ApiRequest,
  ApiResponse,
  apiPublicRoutes,
} from "@back-to-the-80s/shared";

const BASE_URL = `${apiPublicRoutes?.root?.api ?? ""}`;

let userid: string | undefined;

export const setApiUser = (user: string | undefined) => {
  userid = user;
};

export async function apiClient<T = any, E = any, R = any>(
  endpoint: string,
  body?: ApiRequest,
): Promise<ApiResponse<T, E, R>> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...body, userid: userid ?? "Unknown Client User" }),
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
