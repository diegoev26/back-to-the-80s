import { sendServerlessResponse } from "../../utils/api.utils.js";

export const testApi = async (request: Request): Promise<Response> => {
  try {
    return sendServerlessResponse(request, 200, {
      response: {
        message: "API funcionando OK",
      },
    });
  } catch (error: any) {
    return sendServerlessResponse(request, 500, {
      error: {
        message: `Error al recibir prueba - ${error?.message}`,
      },
    });
  }
};
