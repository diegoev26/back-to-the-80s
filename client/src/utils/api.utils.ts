import type { ApiResponse, ResponseData } from "@project/shared";

export function unwrapApi<T, E>(res: ApiResponse<T, E>): T | T[];
export function unwrapApi<T, E>(
  res: ApiResponse<T, E>,
  target: "response",
): T | T[];
export function unwrapApi<T, E>(
  res: ApiResponse<T, E>,
  target: "error",
): E | E[];

export function unwrapApi<T, E>(
  res: ApiResponse<T, E>,
  target: "response" | "error" = "response",
): any {
  const container = res[target];

  if (!container) return undefined;

  if (Array.isArray(container)) {
    if (container.length === 1) {
      return (container[0] as ResponseData<any>)?.data;
    }

    return container.flatMap((item) => {
      const d = (item as ResponseData<any>)?.data;
      return d !== undefined && d !== null ? d : [];
    });
  }

  return (container as ResponseData<any>)?.data;
}
