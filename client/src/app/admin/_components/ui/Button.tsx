"use client";
import React, { forwardRef } from "react";
import type { ButtonProps } from "@/app/admin/_interfaces/ui.interfaces";
import { Loader2 } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      isLoading,
      className = "",
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const baseStyles =
        "relative inline-flex items-center justify-center px-5 py-2 text-xs font-medium tracking-widest uppercase transition-all duration-200 font-primary hover:cursor-pointer rounded-sm group outline-none shadow-none focus:ring-0 border",
      disabledStyles =
        "disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none",
      isSolid = !["action", "ghost"].includes(variant),
      variantMaps: Record<string, string> = {
        primary:
          "bg-primary text-white border-primary enabled:hover:bg-primary/90 enabled:hover:shadow-lg enabled:hover:shadow-primary/30",
        secondary:
          "bg-secondary text-white border-secondary enabled:hover:bg-secondary/90 enabled:hover:shadow-lg enabled:hover:shadow-secondary/30",
        success:
          "bg-success text-white border-success enabled:hover:bg-success/90 enabled:hover:shadow-lg enabled:hover:shadow-success/30",
        warning:
          "bg-warning text-white border-warning enabled:hover:bg-warning/90 enabled:hover:shadow-lg enabled:hover:shadow-warning/30",
        danger:
          "bg-danger text-white border-danger enabled:hover:bg-danger/90 enabled:hover:shadow-lg enabled:hover:shadow-danger/30",
        dark: "bg-dark text-white border-dark enabled:hover:bg-dark/90 enabled:hover:shadow-lg enabled:hover:shadow-dark/30",
        action:
          "bg-primary/5 text-primary border-primary/40 enabled:hover:bg-primary enabled:hover:text-white",
        ghost:
          "bg-secondary/5 text-secondary border-secondary/40 enabled:hover:bg-secondary enabled:hover:text-white",
      };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variantMaps[variant],
          !isSolid && "shadow-none",
          disabledStyles,
          className,
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-3 w-3 animate-spin" />
            <span className="opacity-80 lowercase first-letter:uppercase">
              Procesando...
            </span>
          </div>
        ) : (
          children
        )}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
