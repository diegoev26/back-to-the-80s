"use client";
import { memo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  Row,
  HeaderGroup,
  Header,
  Cell,
} from "@tanstack/react-table";
import { Search } from "lucide-react";
import {
  TableProps,
  TableRowProps,
} from "@/app/admin/_interfaces/ui.interfaces";

const TableRow = memo(<T,>({ row, isSelected }: TableRowProps<T>) => {
  const selectEnable = row.getCanSelect();
  return (
    <tr
      onClick={row.getToggleSelectedHandler()}
      className={`group border-b border-secondary/10 transition-all duration-75 ${selectEnable ? "cursor-pointer" : "cursor-default"} ${
        isSelected
          ? "bg-primary/4 shadow-[inset_3px_0_0_0_var(--color-primary)]"
          : "hover:bg-secondary/3"
      }`}
    >
      {row.getVisibleCells().map((cell: Cell<T, unknown>) => (
        <td
          key={cell.id}
          className="px-4 py-2.5 text-[12px] text-dark truncate"
        >
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  );
});
TableRow.displayName = "TableRow";

export const Table = <T,>({
  data = [],
  columns = [],
  rowSelection = {},
  setRowSelection,
  isLoading,
  showPagination = false,
  showFilter = false,
  getRowId,
  pageSize = 50,
}: TableProps<T>) => {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { rowSelection: rowSelection ?? {}, sorting, globalFilter },
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting as any,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: getRowId ? (row: Row<T>) => getRowId(row) : undefined,
    enableRowSelection: setRowSelection ? true : false,
    initialState: { pagination: { pageSize } },
  });

  return (
    <div className="flex flex-col w-full h-[calc(100vh-180px)] gap-2">
      {/* Filtro Global */}
      {showFilter && (
        <div className="flex justify-end pe-2 items-center min-h-[50px] px-4 border-b border-secondary/10 bg-secondary-50/30 dark:bg-zinc-900/50">
          <div className="relative w-full max-w-[280px] flex items-center">
            {/* max-w-[280px] lo hace más pequeño y se mantiene a la izquierda por el flujo flex */}
            <Search className="absolute left-3 text-secondary/40" size={16} />
            <input
              type="text"
              value={globalFilter ?? ""}
              onChange={(e) => setGlobalFilter(e.target.value)}
              placeholder="Filtrar registros..."
              className="w-full h-8 pl-9 pr-3 text-xs bg-white dark:bg-dark-800 border border-secondary/20 dark:border-white/10 rounded focus:outline-none focus:ring-1 focus:ring-action/40 transition-all shadow-sm placeholder:text-secondary/40"
            />
          </div>
        </div>
      )}
      {/* Filtro Global */}

      <div className="flex flex-col w-full grow bg-white border border-secondary/30 rounded shadow-sm overflow-hidden">
        <div className="overflow-y-auto grow custom-scrollbar">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sticky top-0 z-20 bg-white border-b-2 border-secondary/20 shadow-sm">
              {table.getHeaderGroups().map((headerGroup: HeaderGroup<T>) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header: Header<T, unknown>) => (
                    <th
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                      style={{
                        width:
                          header.getSize() !== 150
                            ? `${header.getSize()}px`
                            : "auto",
                      }}
                      className="px-3 py-2 text-left text-[11px] font-bold text-dark/60 uppercase tracking-tight border-b border-secondary/20 cursor-pointer hover:text-dark transition-colors select-none"
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {/* Indicador de Sorting */}
                        <span className="text-[9px]">
                          {{ asc: "▲", desc: "▼" }[
                            header.column.getIsSorted() as string
                          ] ?? ""}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-10 text-center text-xs text-secondary italic"
                  >
                    Cargando registros...
                  </td>
                </tr>
              ) : table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="p-10 text-center text-xs text-secondary italic"
                  >
                    No se encontraron resultados
                  </td>
                </tr>
              ) : (
                table
                  .getRowModel()
                  .rows.map((row: Row<T>) => (
                    <TableRow
                      key={row.id}
                      row={row}
                      isSelected={!!rowSelection[row.id]}
                    />
                  ))
              )}
            </tbody>
          </table>
        </div>

        {/* Controles de Paginación */}
        {showPagination && (
          <div className="flex items-center justify-between px-4 py-2 bg-secondary/5 border-t border-secondary/20">
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-secondary font-medium uppercase tracking-wider">
                Mostrando {table.getRowModel().rows.length} de{" "}
                {table.getFilteredRowModel().rows.length} registros
              </span>

              {/* Selector de Filas por Página */}
              <div className="flex items-center gap-2 border-l border-secondary/20 pl-4">
                <span className="text-[10px] text-secondary font-bold uppercase">
                  Filas:
                </span>
                <select
                  value={table.getState().pagination.pageSize}
                  onChange={(e: any) => {
                    table.setPageSize(Number(e.target.value));
                  }}
                  className="text-[10px] bg-white border border-secondary/20 rounded px-1 py-0.5 outline-none focus:ring-1 focus:ring-primary/30 font-bold text-dark"
                >
                  {Array.from(new Set([pageSize, 50, 100, 250, 500]))
                    .sort((a, b) => a - b)
                    .map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
                className="hover:cursor-pointer text-[10px] uppercase tracking-tighter font-bold px-3 py-1 border border-secondary/20 rounded disabled:opacity-20 hover:bg-white transition-colors"
              >
                Anterior
              </button>
              <button
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
                className="hover:cursor-pointer text-[10px] uppercase tracking-tighter font-bold px-3 py-1 border border-secondary/20 rounded disabled:opacity-20 hover:bg-white transition-colors"
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
        {/* Controles de Paginación */}
      </div>
    </div>
  );
};
