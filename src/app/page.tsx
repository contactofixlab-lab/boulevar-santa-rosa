import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { UbicacionSection } from "@/components/sections/UbicacionSection";
import { ConoceProyectoSection } from "@/components/sections/ConoceProyectoSection";
import { InvierteSection } from "@/components/sections/InvierteSection";
import { TipologiasPreview } from "@/components/sections/TipologiasPreview";
import { AgendaVisita } from "@/components/sections/AgendaVisita";
import { SectionDivider } from "@/components/shared/SectionDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <HeroSection />
        <SectionDivider color1="#E3F3FB" color2="#FFFFFF" />
        <StatsBand />
        <SectionDivider color1="#E3F3FB" color2="#FFFFFF" />
        <UbicacionSection />
        <SectionDivider color1="#FFFFFF" color2="#F4F9FB" />
        <ConoceProyectoSection />
        <SectionDivider color1="#F4F9FB" color2="#F4F9FB" />
        <InvierteSection />
        <SectionDivider color1="#F4F9FB" color2="#FFFFFF" />
        <TipologiasPreview />
        <SectionDivider color1="#FFFFFF" color2="#FFFFFF" />
        <AgendaVisita />
      </main>
      <Footer />
    </>
  );
}
