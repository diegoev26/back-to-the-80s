import CommunityCard from "@/components/ComunityCard";
import Nav from "@/components/Nav";

export default function Page() {
  return (
    <main className="bg-dark text-muted min-h-screen selection:bg-primary selection:text-dark font-primary">
      <Nav />

      {/* Hero Section con Video Banner */}
      <section className="relative h-[90vh] md:h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Overlay para oscurecer y dar gradiente */}
          <div className="absolute inset-0 bg-linear-to-t from-dark via-dark/40 to-transparent z-10" />

          {/* YouTube Iframe como Background */}
          <iframe
            src="https://www.youtube.com/embed/HzfKDh5DaY4?autoplay=1&mute=1&loop=1&playlist=HzfKDh5DaY4&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&disablekb=1"
            className="w-screen h-[56.25vw] min-h-screen min-w-[177.77vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50"
            allow="autoplay; fullscreen"
          ></iframe>
        </div>

        <div className="relative z-20 text-center px-4 max-w-5xl mx-auto">
          <h1 className="relative text-2xl md:text-[10rem] font-black italic tracking-tighter leading-[0.8] md:leading-[0.75] mb-12 uppercase py-10 px-4">
            <span className="relative block bg-linear-to-b from-danger via-secondary to-warning bg-clip-text text-transparent drop-shadow-[0_10px_15px_rgba(255,69,0,0.4)] pb-4">
              BACK TO
            </span>

            <span className="relative block text-muted drop-shadow-[0_0_30px_rgba(0,255,255,0.4)] -mt-2 md:-mt-6">
              THE 80S
            </span>
          </h1>
          <p className="text-sm md:text-lg font-bold tracking-[0.5em] uppercase mb-10 text-primary">
            Buenos Aires • Edición Limitada
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="bg-warning text-dark px-12 py-4 font-black uppercase tracking-tighter hover:bg-primary transition-all duration-300 transform hover:-translate-y-1 rounded-sm shadow-lg cursor-pointer">
              Próxima Fecha
            </button>
            <button className="border-2 border-primary text-primary px-12 py-4 font-black uppercase tracking-tighter hover:bg-primary hover:text-dark transition-all duration-300 rounded-sm cursor-pointer">
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

      {/* Gallery Preview Section */}
      <section
        id="galeria"
        className="py-24 px-8 bg-linear-to-b from-dark to-[#0a0a0a]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-linear-to-r from-danger to-warning py-2 pe-6">
              EL FLASHBACK
            </h2>
            <p className="text-muted/50 max-w-xs text-sm font-bold uppercase tracking-widest leading-relaxed border-l-2 border-primary pl-4">
              Reviví los mejores momentos de nuestras últimas ediciones.
            </p>
          </div>

          <div className="columns-1 md:columns-3 gap-6 space-y-6">
            <div className="relative group overflow-hidden bg-white/5 aspect-4/5 rounded-xl border border-white/10 hover:border-primary transition-colors duration-500">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted/20 uppercase tracking-[0.5em] font-bold">
                S3_ASSET_01
              </div>
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
            <div className="relative group overflow-hidden bg-white/5 aspect-square rounded-xl border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted/20 uppercase tracking-[0.5em] font-bold">
                S3_ASSET_02
              </div>
            </div>
            <div className="relative group overflow-hidden bg-white/5 aspect-3/4 rounded-xl border border-white/10">
              <div className="absolute inset-0 flex items-center justify-center text-[10px] text-muted/20 uppercase tracking-[0.5em] font-bold">
                S3_ASSET_03
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
