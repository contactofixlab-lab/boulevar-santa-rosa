import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { CotizadorModes } from "@/components/sections/CotizadorModes";
import { getTipologiasFromMobysuite } from "@/lib/mobysuite/api";

export const metadata = {
  title: "Cotizador - Boulevard Santa Rosa",
  description: "Cotiza tu departamento, bodega, local o estacionamiento en Boulevard Santa Rosa.",
};

export default async function CotizadorPage() {
  const { data, source } = await getTipologiasFromMobysuite();

  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Obtén tu"
              title="Cotización"
              centered
              description="Comparativa de las 3 formas de integrar el cotizador Mobysuite, mientras definimos cuál usar en producción."
            />
            <CotizadorModes tipologias={data} dataSource={source} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
