"use client";
import { useRef, useState } from "react";
import * as XLSX from "xlsx";
import { FileSpreadsheet } from "lucide-react";
import { useModal } from "@/app/admin/_context/modal.context";
import Button from "./Button";

interface Props {
  onDataLoaded: (data: any[]) => void;
  expectedColumns: string[];
  title: string;
}

const XlsxImporter = ({ onDataLoaded, expectedColumns, title }: Props) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { openModal } = useModal();

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const bstr = e.target?.result,
          workbook = XLSX.read(bstr, { type: "array" }),
          worksheet = workbook.Sheets[workbook.SheetNames[0]],
          json = XLSX.utils.sheet_to_json(worksheet);

        // Validación básica de columnas
        if (json.length > 0) {
          const columns = Object.keys(json[0] as object),
            colName = (str: string) =>
              str.toString().toLowerCase().replace(/\s+/g, " ").trim(),
            normalizedCol = columns.map(colName);

          if (
            !expectedColumns.every((col) =>
              normalizedCol.includes(colName(col)),
            )
          ) {
            openModal({
              title: "Formato de archivo incorrecto",
              type: "error",
              description: `El Excel no contiene las columnas necesarias. Esperadas: ${expectedColumns.join(", ")}`,
              confirmText: "Entendido",
            });

            if (fileInputRef.current) fileInputRef.current.value = "";
            return;
          }
          onDataLoaded(json);
        } else {
          openModal({
            title: "Archivo vacío",
            type: "warning",
            description:
              "El archivo seleccionado no contiene datos procesables.",
          });
        }
      } catch (error: any) {
        openModal({
          title: "Error de lectura",
          type: "error",
          description: `No se pudo procesar el archivo Excel. Asegúrate de que no esté protegido o dañado - ${error?.message}`,
        });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files[0]) processFile(e.dataTransfer.files[0]);
      }}
      className={`border-2 border-dashed rounded-xl p-8 transition-all text-center ${
        isDragging
          ? "border-primary bg-primary/5 scale-[1.01]"
          : "border-secondary/20 bg-gray-50"
      }`}
    >
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        accept=".xlsx,.xls"
        onChange={(e: any) =>
          e.target.files?.[0] && processFile(e.target.files[0])
        }
      />
      <div className="flex flex-col items-center gap-3">
        <div className="p-4 bg-white rounded-full shadow-sm">
          <FileSpreadsheet className="text-primary" size={32} />
        </div>
        <div>
          <h4 className="font-semibold text-dark">{title}</h4>
          <p className="text-xs text-secondary mt-1">
            Arrastra tu Excel aquí o haz clic para buscar
          </p>
        </div>
        <Button
          variant="dark"
          onClick={() => fileInputRef.current?.click()}
          className="mt-2"
        >
          Seleccionar Archivo
        </Button>
      </div>
    </div>
  );
};

export default XlsxImporter;
