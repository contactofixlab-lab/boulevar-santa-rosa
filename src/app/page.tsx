import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { UbicacionSection } from "@/components/sections/UbicacionSection";
import { ConoceProyectoSection } from "@/components/sections/ConoceProyectoSection";
import { InvierteSection } from "@/components/sections/InvierteSection";
import { TipologiasPreview } from "@/components/sections/TipologiasPreview";
import { AgendaVisita } from "@/components/sections/AgendaVisita";
import { CotizadorInline } from "@/components/sections/CotizadorInline";
import { getTipologiasFromMobysuite } from "@/lib/mobysuite/api";

export default async function Home() {
  const result = await getTipologiasFromMobysuite();
  const tipologias = result.data;

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

        {/* Opción 3: Cotizador inline en el landing */}
        <section id="cotizador-inline">
          <CotizadorInline tipologias={tipologias} />
        </section>

        <AgendaVisita />
      </main>
      <Footer />
    </>
  );
}
