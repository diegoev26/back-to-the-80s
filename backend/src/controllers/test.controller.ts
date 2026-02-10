import type { Request, Response } from "express";
import { sendResponse } from "functions/api.functions.js";

export const testApi = async (_: Request, res: Response) => {
  try {
    return sendResponse(res, 200, { response: { message: "OK" } });
  } catch (error: any) {
    return sendResponse(res, 500, {
      error: { message: error?.message ?? "Error inesperado en gateway" },
    });
  }
};
