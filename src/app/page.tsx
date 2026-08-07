"use client";

import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsBand } from "@/components/sections/StatsBand";
import { UbicacionSection } from "@/components/sections/UbicacionSection";
import { EncuentraEspacioIdeal } from "@/components/sections/EncuentraEspacioIdeal";
import { AgendaVisita } from "@/components/sections/AgendaVisita";
import { ProyectoPartnersSection } from "@/components/sections/ProyectoPartnersSection";

// Lazy load below-the-fold components
const ConoceProyectoSection = dynamic(
  () => import("@/components/sections/ConoceProyectoSection").then(mod => ({ default: mod.ConoceProyectoSection })),
  { ssr: false }
);

const InvierteSection = dynamic(
  () => import("@/components/sections/InvierteSection").then(mod => ({ default: mod.InvierteSection })),
  { ssr: false }
);

export default function Home() {
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
        <ProyectoPartnersSection />
      </main>
      <Footer />
    </>
  );
}
