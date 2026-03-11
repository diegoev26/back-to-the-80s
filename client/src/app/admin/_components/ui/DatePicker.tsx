import { useMemo } from "react";
import { Calendar } from "lucide-react";
import { DatePickerProps } from "@/app/admin/_interfaces/ui.interfaces";
import { formatDateDisplay } from "@/app/admin/_utils/date.utils";

const DatePicker = ({
  value,
  onChange,
  label,
  error,
  className,
}: DatePickerProps) => {
  const displayDate = useMemo(() => {
    return formatDateDisplay(value);
  }, [value]);

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {label && (
        <label className="text-[10px] font-extrabold text-secondary uppercase tracking-wider ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary/50 group-focus-within:text-primary transition-colors z-10 pointer-events-none">
          <Calendar size={16} />
        </div>

        <div
          className={`absolute inset-0 flex items-center pl-10 pr-4 pointer-events-none text-sm font-medium text-dark z-10 ${!value ? "opacity-40" : "opacity-100"}`}
        >
          {displayDate || "Seleccionar fecha"}
        </div>

        <input
          type="date"
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          className={`relative w-full h-10 pl-10 pr-4 bg-white border rounded-lg text-sm outline-none transition-all appearance-none cursor-pointer z-0 ${error ? "border-danger" : "border-secondary/20"} text-transparent`}
        />

        <style jsx>{`
          /* Mantenemos el área del selector nativo activa en todo el input */
          input::-webkit-calendar-picker-indicator {
            background: transparent;
            bottom: 0;
            color: transparent;
            cursor: pointer;
            height: auto;
            left: 0;
            position: absolute;
            right: 0;
            top: 0;
            width: auto;
          }
          /* Ocultamos el placeholder nativo en algunos navegadores */
          input[type="date"]::-webkit-datetime-edit {
            color: transparent;
          }
        `}</style>
      </div>
      {error && <span className="text-[10px] text-danger ml-1">{error}</span>}
    </div>
  );
};

export default DatePicker;
