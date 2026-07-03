import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { UbicacionSection } from "@/components/sections/UbicacionSection";
import { ConoceProyectoSection } from "@/components/sections/ConoceProyectoSection";
import { InvierteSection } from "@/components/sections/InvierteSection";
import { EncuentraEspacioIdeal } from "@/components/sections/EncuentraEspacioIdeal";
import { AgendaVisita } from "@/components/sections/AgendaVisita";

export default async function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <StatsBand />
        <div id="ubicacion">
          <UbicacionSection />
        </div>
        <div id="conoce">
          <ConoceProyectoSection />
        </div>
        <div id="inversion">
          <InvierteSection />
        </div>
        <div id="cotizador">
          <EncuentraEspacioIdeal />
        </div>
        <div id="agenda">
          <AgendaVisita />
        </div>
      </main>
      <Footer />
    </>
  );
}
