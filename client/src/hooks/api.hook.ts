"use client";
import { useState, useCallback, useEffect } from "react";
import { ApiRequest, ApiResponse } from "@back-to-the-80s/shared";
import { useGlobalContext } from "@/context/global.context";
import { setApiUser } from "@/lib/api.client";
import { ApiFunction } from "@/types/api.types";

export function useApi<T = any, P = any>() {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [networkError, setNetworkError] = useState<string | null>(null);
  const { user } = useGlobalContext();

  useEffect(() => {
    setApiUser(user);
  }, [user]);

  const execute = useCallback(
    async (
      apiCall: ApiFunction<T, P>,
      payload?: P,
    ): Promise<ApiResponse<T>> => {
      setLoading(true);
      setNetworkError(null);
      try {
        const jsonOut = {
            ...(payload !== undefined && { data: payload as P }),
          } as ApiRequest<P>,
          result = await apiCall(jsonOut);
        setData(result);
        return result;
      } catch (err: any) {
        const msg = err.message || "Error de conexión con el servidor";
        setNetworkError(msg);

        const fallbackError: ApiResponse<any> = {
          code: 500 as any,
          error: [{ message: msg }] as any,
        };
        return fallbackError;
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  return {
    data, // La respuesta completa (code, response, error, reference)
    loading, // Estado de la petición
    networkError, // Error de red (fetch fallido)
    execute, // Función para disparar la petición
  };
}
