import { Env } from "../types/env.js";
import { getCorsHeaders } from "./cors.js";

export const validateAuth = (request: Request, env: Env): Response | null => {
  const authHeader = request.headers.get("Authorization");
  const headers = getCorsHeaders(request);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return new Response(
      JSON.stringify({
        error: "No se proporcionó un token de autorización válido",
      }),
      { status: 401, headers },
    );
  }

  const token = authHeader.split(" ")[1];

  if (token !== env.CLIENT_API_SECRET) {
    return new Response(
      JSON.stringify({ error: "Token de acceso inválido o expirado" }),
      { status: 403, headers },
    );
  }

  return null;
};
