"use client";
import Link from "next/link";
import { ButtonGroupProps } from "@/app/admin/_interfaces/ui.interfaces";

export function ButtonGroup({
  tabs,
  activeTab,
  onChange,
  className = "",
  variant = "default",
}: ButtonGroupProps) {
  const normalize = (val: any) => String(val ?? "").replace(/\/$/, "");
  return (
    <div
      className={`inline-flex bg-slate-100/80 p-1 rounded-xl border border-slate-200/60 ${className}`}
    >
      {tabs.map((tab) => {
        const isActive =
          normalize(activeTab) === normalize(tab.id) ||
          (tab.href && normalize(activeTab) === normalize(tab.href));

        const commonClass = `
          relative flex items-center justify-center gap-2 transition-all duration-200 ease-in-out rounded-lg active:scale-95 cursor-pointer
          ${variant === "compact" ? "px-3 py-1 text-[10px]" : "px-6 py-2.5 text-[11px]"}
          font-bold uppercase tracking-tight
          ${
            isActive
              ? "bg-white text-primary shadow-sm opacity-100"
              : "text-slate-500 hover:text-slate-700 hover:bg-white/50 opacity-70 hover:opacity-100"
          }
        `,
          content = (
            <>
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {isActive && (
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-in fade-in zoom-in duration-300" />
              )}
            </>
          );

        if (tab.href) {
          return (
            <Link key={tab.id} href={tab.href} className={commonClass}>
              {content}
            </Link>
          );
        }

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange?.(tab.id)}
            className={commonClass}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
}
