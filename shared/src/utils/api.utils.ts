import type { Response } from "express";
import type {
  ApiResponse,
  ApiResponsePayload,
  ResponseData,
} from "@back-to-the-80s/shared";
import { privateOptions } from "@back-to-the-80s/shared";
const { apiDebug } = privateOptions;

export function sendResponse<
  C extends ApiResponse["code"],
  T extends ResponseData = any,
  E extends ResponseData = any,
  R = any,
>(res: Response, code: C, payload: ApiResponsePayload<T, E, R>[C]): Response {
  if (apiDebug && !!payload?.error) {
    const message: string = [
      "ApiDebug",
      !!res?.req?.body?.userid ? `User: ${res?.req?.body?.userid}` : null,
      !!res?.req?.path ? `Path: ${res?.req?.path}` : null,
      !!res?.req?.method ? `Method: ${res?.req?.method}` : null,
      !!res?.req?.ip ? `IP: ${res?.req?.ip}` : null,
    ]
      .filter(Boolean)
      .join(" | ");

    analizeApiResponse(
      { code, ...payload } as ApiResponse,
      `${message ?? "ApiDebug"}`,
    );
  }

  return res.status(code).send({ code, ...payload } as ApiResponse);
}

export async function analizeApiResponse(
  data: ApiResponse,
  origin: string = "",
): Promise<void> {
  if (!data?.error) return;

  const errors = Array.isArray(data?.error) ? data?.error : [data?.error],
    messages: string[] = [];
  for (const error of errors) {
    if (!!error?.message) {
      const ref = auxFormat(error?.reference);
      messages.push(`${error?.message}${ref ? " - " : ""}${ref ?? ""}`);
    }

    if (Array?.isArray(error?.data)) {
      error.data.forEach((err: any) => {
        if (!!err?.message) {
          const ref = auxFormat(err?.reference);
          messages.push(`${err?.message}${ref ? " - " : ""}${ref ?? ""}`);
        }
      });
    }
  }

  /*
  await setLog({
    status: false,
    message: `${origin} | ${!data?.code ? "" : `${data?.code} | `}${messages.length > 0 ? messages.join(" // ") : "Error no reconocido"}`,
  });
  */
  console.log(
    `${origin} | ${!data?.code ? "" : `${data?.code} | `}${messages.length > 0 ? messages.join(" // ") : "Error no reconocido"}`,
  );

  return;
}

const auxFormat = (ref: any): string => {
  if (!ref) return "";
  if (typeof ref === "string") return ref.trim();
  try {
    return JSON.stringify(ref);
  } catch {
    return String(ref);
  }
};
