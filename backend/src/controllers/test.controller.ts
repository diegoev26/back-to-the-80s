import type { Request, Response } from "express";
import { sendResponse } from "functions/api.functions.js";
import type { paths } from "@project/shared";
import axios from "axios";

export const testApi = async (_: Request, res: Response) => {
  try {
    const url: keyof paths = "/api/test";
    try {
      const { data } = await axios(`http://127.0.0.1:5197${url}`, {
        method: "post",
        data: { data: {} },
      });
      console.log(data);

      return sendResponse(res, 200, {
        response: { message: "Gateway <> Service" },
      });
    } catch (error: any) {
      return sendResponse(res, 502, {
        error: {
          message: error?.message ?? "Error esperando respuesta de servicio",
        },
      });
    }
  } catch (error: any) {
    return sendResponse(res, 500, {
      error: { message: error?.message ?? "Error inesperado en gateway" },
    });
  }
};
