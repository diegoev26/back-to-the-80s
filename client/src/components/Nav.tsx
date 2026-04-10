"use client";
import config from "@/config/env.config";
import { useState, useEffect } from "react";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-4 bg-linear-to-b from-dark/95 to-transparent backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto flex justify-between items-center relative z-50">
        {/* Logo */}
        <a
          href="/"
          className="relative z-50 transition-transform active:scale-95"
        >
          <img
            src={`/logo-removebg.png`}
            alt="Back to the 80s Logo"
            className="h-10 w-auto md:h-14 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 text-sm font-black uppercase tracking-[0.2em] text-muted">
          <a
            href="#comunidad"
            className="hover:text-primary transition-colors py-2 relative group"
          >
            Comunidad
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </a>
          <a
            href="#galeria"
            className="hover:text-primary transition-colors py-2 relative group"
          >
            Galería
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
          </a>
          <a
            href="https://linktr.ee/fiestabacktothe80s"
            target="_blank"
            className="bg-danger text-white px-8 py-3 rounded-full font-black italic tracking-tighter hover:bg-warning hover:text-dark transition-all duration-500 shadow-[0_0_30px_rgba(255,0,0,0.4)]"
          >
            ENTRADAS
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden relative z-50 p-2 text-primary focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu Overlay - CORRECCIÓN DE ALTO Y FONDO */}
      <div
        className={`fixed inset-0 h-screen w-screen bg-[#050505] transition-all duration-500 md:hidden z-40 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        {/* Contenido centrado con espacio suficiente */}
        <div className="flex flex-col items-center justify-center h-full gap-12 p-8">
          <a
            href="#comunidad"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-black italic tracking-tighter text-muted hover:text-primary transition-colors uppercase"
          >
            COMUNIDAD
          </a>
          <a
            href="#galeria"
            onClick={() => setIsOpen(false)}
            className="text-4xl font-black italic tracking-tighter text-muted hover:text-primary transition-colors uppercase"
          >
            GALERÍA
          </a>
          <a
            href="https://linktr.ee/fiestabacktothe80s"
            target="_blank"
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs text-center bg-danger text-white py-6 rounded-full font-black italic text-2xl shadow-[0_0_40px_rgba(255,0,0,0.5)] uppercase active:scale-95 transition-transform"
          >
            ENTRADAS
          </a>

          {/* Sello de cierre al final del menú */}
          <div className="absolute bottom-12 text-center">
            <p className="text-primary/40 text-[10px] font-bold tracking-[0.4em] uppercase border-t border-primary/10 pt-4">
              La mejor fiesta 80s de Latinoamerica
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
