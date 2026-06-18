import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const metrics = [
  { iconName: "trending-up", value: "5–6%",     label: "Rentabilidad bruta anual" },
  { iconName: "bar-chart-3",  value: "35–40%",   label: "Plusvalía proyectada" },
  { iconName: "users",        value: "Alta",     label: "Demanda de arriendo" },
  { iconName: "zap",          value: "Domótica", label: "Gastos comunes reducidos" },
];

// Proyección de plusvalía UF por año (valores referenciales)
const plusvaliaData = [
  { year: "2025", value: 3800, height: 48 },
  { year: "2026", value: 4180, height: 60 },
  { year: "2027", value: 4560, height: 73 },
  { year: "2028", value: 4940, height: 86 },
  { year: "2029", value: 5320, height: 100 },
];

// Demanda de arriendo (índice 0-100)
const demandaData = [
  { month: "Ene", value: 62 },
  { month: "Mar", value: 70 },
  { month: "May", value: 75 },
  { month: "Jul", value: 82 },
  { month: "Sep", value: 88 },
  { month: "Nov", value: 95 },
];

export const InvierteSection = () => {
  // Construir el path de la línea de demanda
  const chartWidth = 280;
  const chartHeight = 120;
  const maxVal = 100;
  const points = demandaData.map((d, i) => {
    const x = (i / (demandaData.length - 1)) * chartWidth;
    const y = chartHeight - (d.value / maxVal) * chartHeight;
    return { x, y, ...d };
  });
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");
  const areaPath = `${linePath} L ${chartWidth},${chartHeight} L 0,${chartHeight} Z`;

  return (
    <section id="inversion" className="py-20 bg-[#F4F9FB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Encabezado */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-stretch mb-10">

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
            {metrics.map(({ iconName, value, label }) => (
              <div
                key={label}
                className="bg-white rounded-2xl px-4 py-6 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-4 h-full text-center"
              >
                <Icon name={iconName} size={32} className="text-[#0671AE] flex-shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-2xl font-bold text-[#033D6B] mb-1">{value}</p>
                  <p className="text-xs text-[#4A6275] leading-snug">{label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Gráficas de inversión */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Gráfico 1: Proyección de plusvalía (barras) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="bar-chart-3" size={20} className="text-[#84CE25]" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#033D6B]">Proyección de plusvalía</h3>
            </div>
            <p className="text-xs text-[#4A6275] mb-6">Valor estimado en UF por año</p>

            <div className="flex items-end justify-between gap-3 h-48">
              {plusvaliaData.map((d, i) => (
                <div key={d.year} className="flex-1 flex flex-col items-center justify-end h-full gap-2">
                  <span className="text-xs font-bold text-[#0671AE]">{d.value.toLocaleString("es-CL")}</span>
                  <div
                    className="w-full rounded-t-lg transition-all duration-500"
                    style={{
                      height: `${d.height}%`,
                      background: i === plusvaliaData.length - 1
                        ? "linear-gradient(to top, #84CE25, #a5e05a)"
                        : "linear-gradient(to top, #0671AE, #3a93c8)",
                    }}
                  />
                  <span className="text-xs text-[#4A6275] font-medium">{d.year}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gráfico 2: Demanda de arriendo (línea + área) */}
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-2 mb-1">
              <Icon name="trending-up" size={20} className="text-[#0671AE]" aria-hidden="true" />
              <h3 className="text-lg font-bold text-[#033D6B]">Demanda de arriendo</h3>
            </div>
            <p className="text-xs text-[#4A6275] mb-6">Índice de demanda en aumento sostenido</p>

            <div className="relative h-48 flex items-center">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight + 24}`}
                className="w-full"
                preserveAspectRatio="none"
                aria-label="Gráfico de demanda de arriendo en aumento"
              >
                <defs>
                  <linearGradient id="demandaArea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0671AE" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0671AE" stopOpacity="0" />
                  </linearGradient>
                </defs>

                {/* Líneas de cuadrícula horizontales */}
                {[0, 0.25, 0.5, 0.75, 1].map((t) => (
                  <line
                    key={t}
                    x1="0" y1={chartHeight * t}
                    x2={chartWidth} y2={chartHeight * t}
                    stroke="#E3F3FB" strokeWidth="1"
                  />
                ))}

                {/* Área bajo la curva */}
                <path d={areaPath} fill="url(#demandaArea)" />

                {/* Línea principal */}
                <path d={linePath} fill="none" stroke="#0671AE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Puntos */}
                {points.map((p) => (
                  <g key={p.month}>
                    <circle cx={p.x} cy={p.y} r="4" fill="white" stroke="#0671AE" strokeWidth="2.5" />
                    <text x={p.x} y={chartHeight + 18} fill="#4A6275" fontSize="9" textAnchor="middle" fontWeight="500">
                      {p.month}
                    </text>
                  </g>
                ))}

                {/* Destacar último punto */}
                <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r="6" fill="#84CE25" stroke="white" strokeWidth="2" />
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
