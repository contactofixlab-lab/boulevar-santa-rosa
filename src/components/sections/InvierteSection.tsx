import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const metrics = [
  { iconName: "trending-up", value: "5–6%",     label: "Rentabilidad bruta anual",  bg: "#E3F3FB", color: "#0671AE" },
  { iconName: "bar-chart-3",  value: "35–40%",   label: "Plusvalía proyectada",      bg: "#EBF7CC", color: "#65A81A" },
  { iconName: "users",        value: "Alta",     label: "Demanda de arriendo",       bg: "#E3F3FB", color: "#0671AE" },
  { iconName: "zap",          value: "Domótica", label: "Gastos comunes reducidos",  bg: "#EBF7CC", color: "#65A81A" },
];

export const InvierteSection = () => {
  return (
    <section id="inversion" className="py-20 bg-[#F4F9FB]">
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

          {/* RIGHT (3/5): 4 tarjetas una al lado de la otra, altura = columna izquierda */}
          <div className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-4 gap-4 h-full">
            {metrics.map(({ iconName, value, label, bg, color }) => (
              <div
                key={label}
                className="bg-white rounded-2xl px-4 py-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 h-full text-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm"
                  style={{ backgroundColor: bg, color }}
                >
                  <Icon name={iconName} size={30} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#033D6B] mb-1">{value}</p>
                  <p className="text-xs text-[#4A6275] leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
