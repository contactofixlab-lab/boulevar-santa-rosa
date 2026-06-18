import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const metrics = [
  { iconName: "trending-up", value: "5–6%",     label: "Rentabilidad bruta anual",  bg: "#0671AE", iconColor: "#0671AE" },
  { iconName: "bar-chart-3",  value: "35–40%",   label: "Plusvalía proyectada",      bg: "#84CE25", iconColor: "#84CE25" },
  { iconName: "users",        value: "Alta",     label: "Demanda de arriendo",       bg: "#0671AE", iconColor: "#0671AE" },
  { iconName: "zap",          value: "Domótica", label: "Gastos comunes reducidos",  bg: "#84CE25", iconColor: "#84CE25" },
];

export const InvierteSection = () => {
  return (
    <section id="inversion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch">

          {/* LEFT (2/5): título + descripción + CTA */}
          <div className="lg:col-span-2 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight mb-3">
              Invierte en{" "}
              <span className="text-[#0671AE]">San Miguel</span>
            </h2>
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-6" />
            <p className="text-[#4A6275] text-base leading-relaxed mb-8">
              San Miguel es una de las comunas con mayor crecimiento en Santiago.
              La demanda de arriendo supera la oferta y la plusvalía crece año a año.
            </p>
            <Link href="/cotizador">
              <Button variant="primary" size="md">Cotizar ahora →</Button>
            </Link>
          </div>

          {/* RIGHT (3/5): 4 tarjetas intercaladas azul/verde */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {metrics.map(({ iconName, value, label, bg, iconColor }) => (
              <div
                key={label}
                className="rounded-2xl px-4 py-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 h-full text-center text-white"
                style={{ backgroundColor: bg }}
              >
                <Icon name={iconName} size={32} className="flex-shrink-0" style={{ color: iconColor }} aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold mb-1">{value}</p>
                  <p className="text-xs leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
