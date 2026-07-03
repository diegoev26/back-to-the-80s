"use client";

interface CarouselItemProps {
  src: string;
  alt: string;
  size?: string;
}

export default function CarouselItem({
  src,
  alt,
  size = "aspect-[4/5]",
}: CarouselItemProps) {
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

      {/* Overlays y Efectos Visuales */}
      <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
    </div>
  );
}
