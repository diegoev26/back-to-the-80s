import config from "@/config/env.config";

const GalleryItem = ({
  fileName,
  alt,
  size,
}: {
  fileName: string;
  alt: string;
  size: string;
}) => {
  const src = `${config?.assets}/${fileName}`;

  return (
    <div
      className={`relative group overflow-hidden rounded-xl border border-white/10 hover:border-primary transition-all duration-500 shadow-2xl ${size} cursor-pointer`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2 opacity-80 group-hover:opacity-100"
        loading="lazy"
      />

      {/* Overlays y Efectos */}
      <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

      <div className="absolute bottom-0 left-0 p-6 translate-y-10 group-hover:translate-y-0 transition-all duration-500">
        <p className="text-primary font-black italic text-lg tracking-tighter">
          VIEW MOMENT
        </p>
        <div className="h-1 w-0 group-hover:w-full bg-primary transition-all duration-500" />
      </div>

      <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500 pointer-events-none" />
    </div>
  );
};

export default function GallerySection() {
  const photos = [
    { id: 1, file: "flashback-01.jpg", size: "aspect-[4/5]" },
    { id: 2, file: "flashback-02.jpg", size: "aspect-square" },
    { id: 3, file: "flashback-03.jpg", size: "aspect-[3/4]" },
    { id: 4, file: "flashback-04.jpg", size: "aspect-square" },
    { id: 5, file: "flashback-05.jpg", size: "aspect-[4/5]" },
  ];

  return (
    <section
      id="galeria"
      className="py-24 px-8 bg-linear-to-b from-dark to-[#0a0a0a]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Cabecera idéntica a tus imágenes de referencia */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-danger to-warning py-2 pe-6 uppercase leading-none">
            EL FLASHBACK
          </h2>
          <p className="text-muted/50 max-w-xs text-sm font-bold uppercase tracking-widest leading-relaxed border-l-2 border-primary pl-4">
            Reviví los mejores momentos de nuestras últimas ediciones.
          </p>
        </div>

        {/* Grilla Inteligente */}
        <div className="flex flex-wrap justify-center gap-6">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.33%-1.5rem)] flex justify-center"
            >
              <GalleryItem
                fileName={photo.file}
                alt={`Back to the 80s - Evento`}
                size={photo.size}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
