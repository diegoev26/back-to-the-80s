import config from "@/config/env.config";
import { apiClient } from "@/lib/api.client";
import type { ApiResponse } from "@project/shared";

export const getDriveImages = (): Promise<ApiResponse> =>
  apiClient({ endpoint: config.routes.images.url, method: "GET" });
