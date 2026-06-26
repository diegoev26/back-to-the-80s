"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getDriveImages } from "@/apis/images.apis";

const CarouselItem = ({
  fileName,
  alt,
  size,
}: {
  fileName: string;
  alt: string;
  size: string;
}) => {
  const src = `/${fileName}`;

  return (
    <div
      className={`relative group overflow-hidden rounded-xl border border-white/10 hover:border-primary transition-all duration-500 shadow-2xl ${size} w-full cursor-grab active:cursor-grabbing`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
        loading="lazy"
      />

      {/* Overlays y Efectos */}
      <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

      {/*
      <div className="absolute bottom-0 left-0 p-6 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
        <p className="text-primary font-black italic text-lg tracking-tighter">
          VIEW MOMENT
        </p>
        <div className="h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
      </div>
      */}

      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const photos: string[] = [
    "flashback-01.jpg",
    "flashback-02.jpg",
    "flashback-03.jpg",
    "flashback-04.jpg",
    "flashback-05.jpg",
  ];

  // Loop infinito, alineación al inicio y Autoplay de 4 segundos
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  // Funciones de navegación para las flechas
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    async function initImages() {
      console.log(await getDriveImages());
    }

    initImages();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section
      id="galeria"
      className="py-24 px-8 bg-linear-to-b from-dark to-[#0a0a0a] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-danger to-warning py-2 pe-6 uppercase leading-none">
              EL FLASHBACK
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full md:w-auto gap-4">
            <p className="text-muted/50 max-w-xs text-sm font-bold uppercase tracking-widest leading-relaxed border-l-2 border-primary pl-4">
              Reviví los mejores momentos de nuestras últimas ediciones.
            </p>
          </div>
        </div>

        <div className="relative group/carousel">
          {/* Botón Izquierdo */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-xl bg-dark/60 backdrop-blur-md border border-white/10 text-white/70 hover:border-primary hover:text-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex items-center justify-center cursor-pointer select-none shadow-xl"
            aria-label="Foto anterior"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>

          {/* Botón Derecho */}
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-4 rounded-xl bg-dark/60 backdrop-blur-md border border-white/10 text-white/70 hover:border-primary hover:text-primary transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 hidden md:flex items-center justify-center cursor-pointer select-none shadow-xl"
            aria-label="Siguiente foto"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>

          {/* Embla */}
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing rounded-xl"
            ref={emblaRef}
          >
            {/* Slides */}
            <div className="flex gap-6 select-none">
              {photos.map((photo, key) => (
                <div
                  key={key}
                  className="flex-none w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)]"
                >
                  <CarouselItem
                    fileName={photo}
                    alt={`Back to the 80s - Evento`}
                    size="aspect-[4/5]"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Indicador de imagen (mobile) */}
        <div className="flex justify-center gap-2 mt-8 md:hidden">
          {photos.map((_, index) => (
            <div
              key={index}
              className={`h-1 transition-all duration-500 rounded-full ${
                index === selectedIndex
                  ? "w-6 bg-primary shadow-lg shadow-primary/50"
                  : "w-2 bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
