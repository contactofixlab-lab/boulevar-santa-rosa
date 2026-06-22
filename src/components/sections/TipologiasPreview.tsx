import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PlanoReferencial } from "@/components/shared/PlanoReferencial";
import { Check } from "lucide-react";

const features = [
  "Terminaciones de primer nivel",
  "Cocina equipada con muebles y cubierta",
  "Baño completo con cerámicas",
  "Ventanas termopanel doble acristalamiento",
  "Preinstalación de aire acondicionado",
];

export const TipologiasPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B]">
            Encuentra tu{" "}
            <span className="text-[#0671AE]">espacio ideal</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left: floor plan */}
          <div className="relative">
            <div className="w-full aspect-square rounded-2xl overflow-hidden bg-[#E3F3FB] shadow-sm flex items-center justify-center p-8">
              <PlanoReferencial className="w-full h-full max-w-xs" />
            </div>

            {/* Small badge */}
            <div className="absolute top-4 right-4 bg-[#0671AE] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
              Referencial
            </div>
          </div>

          {/* Right: info */}
          <div>
            <span className="inline-block bg-[#E3F3FB] text-[#0671AE] text-sm font-semibold px-4 py-1.5 rounded-full mb-5">
              2D + 1B
            </span>

            <h3 className="text-2xl font-bold text-[#033D6B] mb-2">
              2 Dormitorios + 1 Baño
            </h3>

            <p className="text-3xl font-bold text-[#84CE25] mb-1">
              45.31 m²{" "}
              <span className="text-base text-[#4A6275] font-normal">totales</span>
            </p>

            <p className="text-[#4A6275] text-sm mb-7">
              Desde{" "}
              <span className="font-bold text-[#033D6B] text-base">UF 3.800</span>
            </p>

            <ul className="space-y-3 mb-8">
              {features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <Check size={16} className="text-[#84CE25] flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-[#4A6275] text-sm">{f}</span>
                </li>
              ))}
            </ul>

            <Link href="/tipologias">
              <Button variant="secondary" size="md">
                Ver más tipologías →
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
