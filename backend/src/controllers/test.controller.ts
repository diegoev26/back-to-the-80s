import type { Request, Response } from "express";
import { sendResponse } from "functions/api.functions.js";

export const testApi = async (_: Request, res: Response) => {
  return sendResponse(res, 200, { response: { message: "OK" } });
};
