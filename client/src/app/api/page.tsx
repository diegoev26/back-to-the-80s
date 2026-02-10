"use client";
import { useApi } from "@/hooks/test.hook";
import { apiPublicRoutes } from "@project/shared";

type Props = {};

const apiTest = (props: Props) => {
  const { execute, loading, result } = useApi<{ message: string }>();
  const handleTest = () => {
    execute(apiPublicRoutes.test);
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 border border-gray-200">
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-800">
          Prueba de Integración
        </h2>
        <p className="text-sm text-gray-500">Node Gateway ↔ C# Service</p>
      </div>

      <button
        onClick={handleTest}
        disabled={loading}
        className={`w-full py-2 px-4 rounded-lg font-semibold text-white transition-all
          ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 active:scale-95"
          }`}
      >
        {loading ? "Ejecutando..." : "Llamar Endpoint"}
      </button>

      {result && (
        <div
          className={`mt-4 p-4 rounded-md text-sm font-mono border ${
            result.code === 200
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <p className="font-bold border-b border-opacity-20 pb-1 mb-2">
            Status Code: {result.code}
          </p>
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};

export default apiTest;
