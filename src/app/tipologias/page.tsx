import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/Button";
import { tipologias } from "@/lib/data/tipologias";

export const metadata = {
  title: "Tipologías - Boulevard Santa Rosa",
  description: "Conoce todas las tipologías disponibles: departamentos, bodegas, locales y estacionamientos.",
};

export default function TipologiasPage() {
  const statusMap = {
    disponible: "available" as const,
    presale: "presale" as const,
    vendido: "sold" as const,
  };

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
                <div key={t.id} className="bg-white border-2 border-surface-blue rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-primary-blue">{t.nombre}</h3>
                      {t.m2 && <p className="text-sm text-slate-blue mt-1">{t.m2}m²</p>}
                    </div>
                    <StatusBadge status={statusMap[t.estado]}>
                      {t.estado === "disponible" ? "Disponible" : t.estado === "presale" ? "Pre-venta" : "Vendido"}
                    </StatusBadge>
                  </div>
                  
                  <div className="mb-4 py-2 border-t border-b border-surface-blue">
                    <p className="text-2xl font-bold text-primary-green">
                      UF {t.precioUF.toLocaleString()}
                    </p>
                    {t.precioCLP && (
                      <p className="text-xs text-slate-blue mt-1">
                        ${(t.precioCLP / 1000000).toFixed(1)}M CLP
                      </p>
                    )}
                  </div>

                  {t.dormitorios && (
                    <p className="text-sm text-slate-blue mb-4">
                      {t.dormitorios}D · {t.banos}B {t.piso && `· Piso ${t.piso}`}
                    </p>
                  )}
                  
                  <Button variant="primary" size="md" className="w-full">
                    Ver Detalles
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
