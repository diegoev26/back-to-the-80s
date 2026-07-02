import { useState } from "react";
import { buildPath } from "@project/shared";
import config from "../_config/config";
import type { ApiResponse } from "@project/shared";
const { gateway: api } = config.routes.root;

export const useApi = <T>() => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse<T> | null>(null);

  const execute = async (url: string): Promise<ApiResponse<T> | undefined> => {
    setLoading(true);
    try {
      const response = await fetch(buildPath([api, url]));
      const data: ApiResponse<T> = await response.json();
      setResult(data);
      return data;
    } catch (error) {
      console.error("Error en la integración:", error);
      return undefined;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, result };
};
