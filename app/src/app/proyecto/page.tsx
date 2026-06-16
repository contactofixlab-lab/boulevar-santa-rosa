import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { DataCard } from "@/components/shared/DataCard";
import { areas } from "@/lib/data/areas";
import * as Icons from "lucide-react";

export const metadata = {
  title: "El Proyecto - Boulevard Santa Rosa",
  description: "Conoce detalles del proyecto Boulevard Santa Rosa: descripción, tipologías, amenidades y más.",
};

const iconMap: Record<string, any> = {
  piscina: Icons.Waves,
  gimnasio: Icons.Dumbbell,
  coworking: Icons.Laptop,
  "areas-verdes": Icons.Leaf,
  seguridad: Icons.Shield,
  estacionamientos: Icons.ParkingCircle,
};

export default function ProyectoPage() {
  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Descubre"
              titleBlue="Boulevard"
              title="Santa Rosa"
              centered
            />
            <div className="mt-12 text-center text-slate-blue max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed mb-4">
                Boulevard Santa Rosa es un nuevo proyecto inmobiliario ubicado en San Miguel, 
                a solo 3 minutos del metro. Con arquitectura contemporánea y amplios espacios, 
                ofrece deptos, bodegas, locales y estacionamientos.
              </p>
              <p className="text-lg leading-relaxed">
                12 pisos · 68 departamentos · 14 locales · ubicación privilegiada
              </p>
            </div>
          </div>
        </section>

        <section className="bg-surface-light py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Disfruta"
              title="Áreas Comunes"
              titleGreen="Boulevard"
              centered
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              {areas.map((area) => (
                <DataCard
                  key={area.id}
                  icon={iconMap[area.id] || Icons.Building2}
                  title={area.nombre}
                  description={area.descripcion}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
