import Link from "next/link";
import { Button } from "@/components/ui/Button";
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
              <svg
                viewBox="0 0 300 300"
                className="w-full h-full max-w-xs"
                aria-label="Plano referencial 2D+1B"
              >
                {/* Outer wall */}
                <rect x="10" y="10" width="280" height="280" rx="4"
                  stroke="#0671AE" strokeWidth="3" fill="#f0f7fc"/>

                {/* Room dividers */}
                {/* Vertical divider */}
                <line x1="170" y1="10" x2="170" y2="180" stroke="#0671AE" strokeWidth="2"/>
                {/* Horizontal divider */}
                <line x1="10" y1="180" x2="290" y2="180" stroke="#0671AE" strokeWidth="2"/>
                {/* Bathroom divider */}
                <line x1="170" y1="180" x2="170" y2="290" stroke="#0671AE" strokeWidth="2"/>

                {/* Room labels */}
                <text x="88" y="100" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Dormitorio</text>
                <text x="88" y="114" fill="#0671AE" fontSize="9" textAnchor="middle">Principal</text>

                <text x="232" y="90" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Sala /</text>
                <text x="232" y="104" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Comedor</text>

                <text x="88" y="235" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Cocina</text>

                <text x="232" y="225" fill="#84CE25" fontSize="10" textAnchor="middle" fontWeight="700">Baño</text>

                {/* Door symbols */}
                <path d="M170,175 Q195,175 195,150" stroke="#0671AE" strokeWidth="1" fill="none" strokeDasharray="3,2"/>
                <path d="M10,185 Q10,210 35,210" stroke="#0671AE" strokeWidth="1" fill="none" strokeDasharray="3,2"/>

                {/* Window marks */}
                <rect x="10" y="40" width="3" height="40" fill="#84CE25" rx="1"/>
                <rect x="10" y="100" width="3" height="40" fill="#84CE25" rx="1"/>
                <rect x="60" y="10" width="60" height="3" fill="#84CE25" rx="1"/>
                <rect x="200" y="10" width="60" height="3" fill="#84CE25" rx="1"/>
                <rect x="287" y="50" width="3" height="60" fill="#84CE25" rx="1"/>

                {/* Compass */}
                <circle cx="265" cy="265" r="16" fill="white" stroke="#E3F3FB" strokeWidth="1"/>
                <text x="265" y="270" fill="#0671AE" fontSize="12" textAnchor="middle" fontWeight="900">N</text>
              </svg>
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
