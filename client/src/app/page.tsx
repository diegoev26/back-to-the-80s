import Carousel from "@/components/Carousel";
import CommunityCard from "@/components/ComunityCard";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
export const runtime = "edge";

export default function Page() {
  return (
    <main className="bg-dark text-muted min-h-screen selection:bg-primary selection:text-dark font-primary">
      <Nav />

      <Hero />

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
