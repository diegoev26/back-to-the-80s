import { Env } from "../types/env.js";
import { getCorsHeaders } from "../middlewares/cors.js";
import { fetchImagesFromDrive } from "../services/google.services.js";

export const getGalleryImages = async (
  request: Request,
  env: Env,
): Promise<Response> => {
  const headers = getCorsHeaders(request);

  try {
    const images = await fetchImagesFromDrive(env);

    return new Response(JSON.stringify({ success: true, data: images }), {
      status: 200,
      headers,
    });
  } catch (error: any) {
    console.error("Error en getGalleryImages:", error.message);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Error al intentar obtener las imágenes desde Google Drive",
      }),
      { status: 500, headers },
    );
  }
};
