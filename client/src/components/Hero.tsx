"use client";
import { useState } from "react";

export default function Hero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
      {/* CONTENEDOR DEL VIDEO Y SKELETON */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-dark">
        {!isVideoLoaded && (
          <div className="absolute inset-0 bg-dark flex items-center justify-center animate-pulse z-30">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        )}

        <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/60 to-transparent z-10" />

        <iframe
          src="https://www.youtube.com/embed/HzfKDh5DaY4?autoplay=1&mute=1&loop=1&playlist=HzfKDh5DaY4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1&playsinline=1&fs=0"
          className={`w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity duration-700 ${
            isVideoLoaded ? "opacity-60" : "opacity-0"
          }`}
          style={{ pointerEvents: "none", touchAction: "none" }}
          allow="autoplay; fullscreen"
          onLoad={() => setIsVideoLoaded(true)}
        ></iframe>

        <div
          className="absolute inset-0 z-20 bg-transparent"
          style={{ pointerEvents: "auto", touchAction: "none" }}
        />
      </div>

      {/* CONTENIDO DEL HERO */}
      <div className="relative z-30 text-center px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
        <div className="relative mb-12 md:mb-16 flex justify-center w-full">
          <h1 className="sr-only">
            BACK TO THE 80S - Buenos Aires, Edición Limitada - La mejor fiesta
            80s de Latinoamerica
          </h1>
          <a
            href="https://www.instagram.com/fiestabacktothe80s/"
            target="_blank"
            rel="noopener noreferrer"
            className="block transition-transform duration-300 hover:scale-[1.02]"
          >
            <img
              src="/logo-original.png"
              alt="Logo oficial de Back to the 80s"
              className="h-auto w-[320px] md:w-187.5 lg:w-237.5 drop-shadow-[0_10px_30px_rgba(255,100,0,0.5)]"
            />
          </a>
        </div>

        <p className="text-sm md:text-lg lg:text-xl font-bold tracking-[0.6em] uppercase mb-12 text-primary drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
          La mejor fiesta 80s de Latinoamerica
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center w-full max-w-sm md:max-w-none">
          <button className="w-full md:w-auto border-2 border-warning text-warning px-14 py-4 font-black uppercase tracking-tighter hover:bg-warning hover:text-dark transition-all duration-300 transform hover:-translate-y-1 rounded-sm shadow-lg cursor-pointer hidden">
            Próxima Fecha
          </button>
          <button className="w-full md:w-auto border-2 border-primary text-primary px-14 py-4 font-black uppercase tracking-tighter hover:bg-primary hover:text-dark transition-all duration-300 rounded-sm cursor-pointer hidden">
            Galería
          </button>
        </div>
      </div>
    </section>
  );
}
