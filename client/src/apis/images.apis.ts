import config from "@/config/env.config";
import { apiClient } from "@/lib/api.client";
import { ApiResponse } from "@back-to-the-80s/shared";

export const getDriveImages = (): Promise<ApiResponse> =>
  apiClient(`${config.images.url}`);
