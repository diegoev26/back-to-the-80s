import { Env } from "../types/env.js";
import { fetchImagesFromDrive } from "../services/google.services.js";
import { sendServerlessResponse } from "../utils/api.utils.js";

export const getGalleryImages = async (
  request: Request,
  env: Env,
): Promise<Response> => {
  try {
    const images = await fetchImagesFromDrive(env);

    return sendServerlessResponse(request, 200, {
      response: {
        message: "Imágenes encontradas",
        data: images,
      },
    });
  } catch (error: any) {
    return sendServerlessResponse(request, 500, {
      error: {
        message: `Error al intentar obtener las imágenes desde Google Drive - ${error?.message}`,
      },
    });
  }
};
