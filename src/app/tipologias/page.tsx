import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { TipologiaCard } from "@/components/shared/TipologiaCard";
import { tipologias } from "@/lib/data/tipologias";

export const metadata = {
  title: "Tipologías - Boulevard Santa Rosa",
  description: "Conoce todas las tipologías disponibles: departamentos, bodegas, locales y estacionamientos.",
};

export default function TipologiasPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Elige"
              titleBlue="Tu"
              title="Espacio"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {tipologias.map((t) => (
                <TipologiaCard key={t.id} tipologia={t} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
