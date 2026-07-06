import Carousel from "@/components/Carousel";
import CommunityCard from "@/components/ComunityCard";
import Nav from "@/components/Nav";

export const dynamic = "force-dynamic";
export const runtime = "edge";

export default function Page() {
  return (
    <main className="bg-dark text-muted min-h-screen selection:bg-primary selection:text-dark font-primary">
      <Nav />

      {/* Hero Section con Video Banner */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Overlay para oscurecer y dar gradiente */}
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/60 to-transparent z-10" />

          {/* YouTube Iframe como Background (Ajustada la opacidad para mejor contraste con el nuevo logo) */}
          <iframe
            src="https://www.youtube.com/embed/HzfKDh5DaY4?autoplay=1&mute=1&loop=1&playlist=HzfKDh5DaY4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            className="w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>

        <div className="relative z-20 text-center px-6 max-w-6xl mx-auto flex flex-col items-center w-full">
          {/* REEMPLAZO TÉCNICO: Imagen con Transparencia por Texto CSS */}
          <div className="relative mb-12 md:mb-16 flex justify-center w-full">
            {/* Etiqueta h1 oculta visualmente pero presente para SEO (Accesibilidad) */}
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
                src={`/logo-original.png`}
                alt="Logo oficial de Back to the 80s"
                className="h-auto w-[320px] md:w-187.5 lg:w-237.5 drop-shadow-[0_10px_30px_rgba(255,100,0,0.5)]"
              />
            </a>
          </div>

          {/* Eslogan principal */}
          <p className="text-sm md:text-lg lg:text-xl font-bold tracking-[0.6em] uppercase mb-12 text-primary drop-shadow-[0_0_10px_rgba(0,255,255,0.3)]">
            La mejor fiesta 80s de Latinoamerica
          </p>

          {/* Botones (Activados según el flujo de la web) */}
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

      {/* Communities Grid */}
      <section id="comunidad" className="py-24 px-8 border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-xs font-bold tracking-[0.8em] text-secondary uppercase mb-16 text-center">
            COMUNIDADES EXCLUSIVAS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CommunityCard
              zona="Comunidad Buenos Aires"
              link="https://chat.whatsapp.com/KpWlzQq153Z5qmaEyOgDeC"
            />
            <CommunityCard
              zona="Comunidad Rosario"
              link="https://chat.whatsapp.com/EiQIY9vLvKT6bMvn2RM7C5"
            />
            <CommunityCard
              zona="Comunidad Córdoba"
              link="https://chat.whatsapp.com/G96r5VqnwsqFCUe16Jl4Ml"
            />
          </div>
        </div>
      </section>

      <Carousel />
    </main>
  );
}
