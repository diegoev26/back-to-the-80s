import { useState } from "react";
import { apiPublicRoutes, ApiResponse } from "@project/shared";

export const useApi = <T>() => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ApiResponse<T> | null>(null);

  const execute = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(apiPublicRoutes.backend + url);
      const data: ApiResponse<T> = await response.json();
      setResult(data);
      return data;
    } catch (error) {
      console.error("Error en la integración:", error);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, result };
};
