import { CheckCircle2, AlertCircle, HelpCircle, Info } from "lucide-react";
import Button from "./Button";

const Modal = ({ options, onClose, onConfirm }: any) => {
  const getMessage = () => {
    if (options?.result) {
      const res = options?.result;
      if ("code" in res)
        return res.code >= 400
          ? (res?.error?.message ?? res?.error?.[0]?.message ?? "Error de API")
          : (res?.response?.message ??
              res?.response?.[0]?.message ??
              "Operación Exitosa");
      if ("status" in res)
        return res?.message || (res?.status ? "Éxito" : "Error");
    }
    return options?.description;
  };

  const isError =
      options?.type === "error" ||
      (options?.result && "error" in options?.result && options?.result?.error),
    isSuccess = options?.type === "success",
    isWarning = options?.type === "warning",
    isInfo = options?.type === "info",
    iconStyles = isError
      ? "bg-danger/10 text-danger"
      : isSuccess
        ? "bg-success/10 text-success"
        : isWarning
          ? "bg-warning/10 text-warning"
          : "bg-primary/10 text-primary",
    sizeClasses = {
      xl: "max-w-4xl",
      lg: "max-w-2xl",
      md: "max-w-md",
    },
    maxWidthClass =
      sizeClasses[options?.size as keyof typeof sizeClasses] || "max-w-md";

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-dark/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`bg-white w-full ${maxWidthClass} rounded shadow-2xl border border-secondary/20`}
      >
        {/* Cabecera con Icono Dinámico */}
        <div className="p-6 flex flex-col items-center text-center gap-4">
          <div className={`p-3 rounded-full ${iconStyles}`}>
            {isError || isWarning ? (
              <AlertCircle size={40} />
            ) : options.type === "action" ? (
              <HelpCircle size={40} />
            ) : isInfo ? (
              <Info size={40} />
            ) : (
              <CheckCircle2 size={40} />
            )}
          </div>

          <div>
            <h3 className="text-lg font-bold text-dark uppercase tracking-tight">
              {options?.title}
            </h3>
            <p className="text-sm text-secondary mt-1">{getMessage()}</p>
          </div>
        </div>

        {/* Espacio para Formulario (si existe) */}
        {options.content && <div className="px-6 pb-6">{options.content}</div>}

        {/* Botonera */}
        <div className="flex bg-secondary/5 p-4 gap-3 justify-end border-t border-secondary/10">
          {(options?.type === "action" ||
            options.type === "form" ||
            isInfo) && (
            <Button variant="secondary" onClick={onClose}>
              {isInfo ? options.confirmText || "Cerrar" : "Cancelar"}
            </Button>
          )}
          {!isInfo && (
            <Button
              variant={
                isError
                  ? "danger"
                  : isSuccess
                    ? "success"
                    : isWarning
                      ? "warning"
                      : "action"
              }
              onClick={onConfirm}
              disabled={options?.isConfirmDisabled || options?.isLoading}
            >
              {options?.isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Procesando...</span>
                </div>
              ) : (
                options?.confirmText || "Aceptar"
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
