"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { getDriveImages } from "../apis/images.apis";
import { unwrapApi } from "../utils/api.utils";
import type { GoogleDriveImage } from "@project/shared";
import { validateDriveImage } from "@/utils/images.utils";
import CarouselItem from "./CarouselItem";

// Listado centralizado de URLs candidatas de Google Drive
const getUrlCandidates = (file: GoogleDriveImage) => [
  `https://lh3.googleusercontent.com/d/${file.id}`,
  `https://drive.google.com/thumbnail?sz=w1200&id=${file.id}`,
  `https://docs.google.com/uc?export=view&id=${file.id}`,
  `https://drive.google.com/uc?export=view&id=${file.id}`,
  `https://drive.google.com/uc?id=${file.id}`,
];

// Componente Interno Skeleton para evitar Layout Shift (CLS)
const CarouselSkeleton = () => {
  return (
    <div className="flex gap-6 animate-pulse select-none overflow-hidden">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="flex-none w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)]"
        >
          <div className="relative aspect-4/5 w-full rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-t-primary border-white/10 rounded-full animate-spin" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default function Carousel() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [slides, setSlides] = useState<{ src: string; alt: string }[]>([]);

  const photos: string[] = [
    "flashback-01.jpg",
    "flashback-02.jpg",
    "flashback-03.jpg",
    "flashback-04.jpg",
    "flashback-05.jpg",
  ];

  // Loop infinito y Autoplay de 4 segundos sin detenerse por interacción
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", slidesToScroll: 1 },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  // Carga inicial y orquestación de validaciones asíncronas en paralelo
  useEffect(() => {
    const initImages = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await getDriveImages();
        const resData = unwrapApi(res);

        if (res.code < 300 && resData) {
          const rawImages: GoogleDriveImage[] = Array.isArray(resData)
            ? resData
            : [resData];

          // Validación concurrente usando la función de utilidad optimizada (Timeout 1.5s + Caché)
          const validationPromises = rawImages.map(async (img) => {
            const validSrc = await validateDriveImage(img, getUrlCandidates);
            return validSrc ? { src: validSrc, alt: img.name } : null;
          });

          const validatedResults = await Promise.all(validationPromises);
          const successfulSlides = validatedResults.filter(
            (item): item is { src: string; alt: string } => item !== null,
          );

          // Si el total de imágenes válidas es menor a 5, forzamos el fallback local por consistencia visual
          if (successfulSlides.length >= 5) setSlides(successfulSlides);
          else
            setSlides(
              photos.map((p) => ({
                src: `/${p}`,
                alt: "Back to the 80s - Evento",
              })),
            );
        } else
          setSlides(
            photos.map((p) => ({
              src: `/${p}`,
              alt: "Back to the 80s - Evento",
            })),
          );
      } catch (error) {
        setSlides(
          photos.map((p, i) => ({
            src: `/${p}`,
            alt: `Back to the 80s - Evento-${i}`,
          })),
        );
      } finally {
        setLoading(false);
      }
    };

    initImages();
  }, []);

  // Suscripción a eventos de Embla
  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Forzar re-inicialización del carrusel una vez que se inyectan los slides definitivos
  useEffect(() => {
    if (emblaApi) emblaApi.reInit();
  }, [emblaApi, slides.length]);

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
          {/* Controles de Navegación de Escritorio */}
          {!loading && (
            <>
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
            </>
          )}

          {/* Renderizado Condicional: Esqueleto vs Contenedor de Embla */}
          {loading ? (
            <CarouselSkeleton />
          ) : (
            <div
              className="overflow-hidden cursor-grab active:cursor-grabbing rounded-xl"
              ref={emblaRef}
            >
              <div className="flex gap-6 select-none">
                {slides.map((slide, idx) => (
                  <div
                    key={idx}
                    className="flex-none w-[85%] sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.33%-1rem)]"
                  >
                    <CarouselItem
                      src={slide.src}
                      alt={slide.alt}
                      size="aspect-[4/5]"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Indicadores de paginación para pantallas táctiles (Mobile) */}
        {!loading && (
          <div className="flex justify-center gap-2 mt-8 md:hidden">
            {slides.map((_, index) => (
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
        )}
      </div>
    </section>
  );
}
