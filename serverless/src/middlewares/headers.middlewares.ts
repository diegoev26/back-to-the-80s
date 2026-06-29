import { sendServerlessResponse } from "../utils/api.utils";

export const getCorsHeaders = (_: Request) => {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Authorization, Content-Type",
    "Content-Type": "application/json",
  };
};

export const handleOptions = (request: Request): Response | null => {
  if (request.method === "OPTIONS")
    return sendServerlessResponse(request, 204, {});
  return null;
};
