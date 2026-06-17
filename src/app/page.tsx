import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { UbicacionSection } from "@/components/sections/UbicacionSection";
import { ConoceProyectoSection } from "@/components/sections/ConoceProyectoSection";
import { InvierteSection } from "@/components/sections/InvierteSection";
import { TipologiasPreview } from "@/components/sections/TipologiasPreview";
import { AgendaVisita } from "@/components/sections/AgendaVisita";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <StatsBand />
        <UbicacionSection />
        <ConoceProyectoSection />
        <InvierteSection />
        <TipologiasPreview />
        <AgendaVisita />
      </main>
      <Footer />
    </>
  );
}
