"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search } from "lucide-react";
import type { SelectProps } from "@/app/admin/_interfaces/ui.interfaces";

const Select = ({
  options,
  value,
  onChange,
  placeholder = "Seleccione una opción",
  label,
  className = "",
  disabled = false,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropUp, setDropUp] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value),
    filteredOptions = options.filter((opt) =>
      opt.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpen = () => {
    if (!isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect(),
        spaceBelow = window.innerHeight - rect.bottom,
        menuHeight = 300; // Altura estimada (max-h-60 + buscador + paddings)

      // Si hay menos espacio abajo que la altura del menú y hay espacio arriba
      if (spaceBelow < menuHeight && rect.top > menuHeight) {
        setDropUp(true);
      } else {
        setDropUp(false);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`} ref={containerRef}>
      {label && (
        <label className="text-[10px] uppercase font-bold text-secondary/70 tracking-wider ml-1">
          {label}
        </label>
      )}

      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={handleOpen}
          className={`
            w-full flex items-center justify-between px-4 h-10 text-[12px] bg-white border transition-all duration-200
            ${disabled ? "bg-secondary/5 opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-primary/50"}
            ${isOpen ? `border-primary ring-1 ring-primary/10 ${dropUp ? "rounded-b-lg shadow-md" : "rounded-t-lg"}` : "border-secondary/20 rounded-lg shadow-sm"}
          `}
        >
          <span
            className={
              selectedOption ? "text-dark font-medium" : "text-secondary/50"
            }
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            size={16}
          />
        </button>

        {isOpen && !disabled && (
          <div
            className={`
              absolute z-100 w-full bg-white border border-primary/20 shadow-xl animate-in fade-in duration-200
              ${
                dropUp
                  ? "bottom-full mb-0 rounded-t-lg slide-in-from-bottom-1 border-b-0"
                  : "top-full mt-0 rounded-b-lg slide-in-from-top-1 border-t-0"
              }
            `}
          >
            {/* Buscador Interno */}
            <div className="p-2 border-b border-secondary/5">
              <div className="relative flex items-center">
                <Search
                  className="absolute left-2.5 text-secondary/40"
                  size={13}
                />
                <input
                  autoFocus
                  className="w-full pl-8 pr-3 py-1.5 text-[11px] bg-secondary/5 border-none rounded focus:ring-0 placeholder:text-secondary/30"
                  placeholder="Buscar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {/* Listado */}
            <ul className="max-h-60 overflow-y-auto custom-scrollbar p-1">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt) => (
                  <li
                    key={opt.value}
                    onClick={() => {
                      onChange(opt.value);
                      setIsOpen(false);
                      setSearchTerm("");
                    }}
                    className={`
                      px-3 py-2 text-[11px] rounded cursor-pointer transition-colors
                      ${opt.value === value ? "bg-primary/10 text-primary font-bold" : "text-dark/70 hover:bg-secondary/5"}
                    `}
                  >
                    {opt.label}
                  </li>
                ))
              ) : (
                <li className="px-3 py-4 text-[11px] text-center text-secondary italic">
                  No se encontraron resultados
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
