import { Env } from "../types/env.js";
import { sendServerlessResponse } from "../utils/api.utils.js";

export const validateAuth = (request: Request, env: Env): Response | null => {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer "))
    return sendServerlessResponse(request, 401, {
      error: { message: "No se proporcionó un token de autorización válido" },
    });

  const token = authHeader.split(" ")[1];
  if (token !== env?.CLIENT_API_SECRET)
    return sendServerlessResponse(request, 403, {
      error: { message: "Token de acceso inválido o expirado" },
    });

  return null;
};
