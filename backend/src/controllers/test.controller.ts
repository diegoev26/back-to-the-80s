import type { Request, Response } from "express";
import { sendResponse } from "functions/api.functions.js";
import type { paths } from "@project/shared";
import axios from "axios";
import config from "../config/config.js";

export const testApi = async (_: Request, res: Response) => {
  try {
    const url: keyof paths = "/api/test";
    console.log(`${config?.routes?.serviceUrl}${url}`);

    try {
      const { data } = await axios(`${config?.routes?.serviceUrl}${url}`, {
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
