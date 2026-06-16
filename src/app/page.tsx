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
        <SectionDivider fromColor="#E3F3FB" toColor="#FFFFFF" />
        <StatsBand />
        <SectionDivider fromColor="#E3F3FB" toColor="#FFFFFF" />
        <UbicacionSection />
        <SectionDivider fromColor="#FFFFFF" toColor="#F4F9FB" />
        <ConoceProyectoSection />
        <SectionDivider fromColor="#F4F9FB" toColor="#F4F9FB" />
        <InvierteSection />
        <SectionDivider fromColor="#F4F9FB" toColor="#FFFFFF" />
        <TipologiasPreview />
        <SectionDivider fromColor="#FFFFFF" toColor="#FFFFFF" />
        <AgendaVisita />
      </main>
      <Footer />
    </>
  );
}
