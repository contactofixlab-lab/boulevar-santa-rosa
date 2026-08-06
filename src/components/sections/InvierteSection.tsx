"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

const metrics = [
  {
    iconName: "trending-up",
    value: "5–6%",
    title: "Rentabilidad bruta estimada",
    description: "Ingresos estables desde el primer día",
    bgGradient: "rgba(6, 113, 174, 0.12)",
    iconColor: "#0671AE"
  },
  {
    iconName: "bar-chart-3",
    value: "35–40%",
    title: "Plusvalía proyectada a 5 años",
    description: "Crecimiento sostenido del valor de inversión",
    bgGradient: "rgba(132, 206, 37, 0.12)",
    iconColor: "#84CE25"
  },
  {
    iconName: "users",
    value: "Alta",
    title: "Alta demanda de arriendo",
    description: "Excelente ubicación para vivir o invertir",
    bgGradient: "rgba(6, 113, 174, 0.12)",
    iconColor: "#0671AE"
  },
  {
    iconName: "zap",
    value: "Domótica",
    title: "Domótica y gastos comunes reducidos",
    description: "Eficiencia y tecnología al servicio de tu hogar",
    bgGradient: "rgba(132, 206, 37, 0.12)",
    iconColor: "#84CE25"
  },
];

export const InvierteSection = () => {
  return (
    <section id="inversion" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-stretch">

          {/* LEFT (1/4): título + descripción + CTA */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight mb-2">
              Invierte en
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-[#0671AE] leading-tight mb-4">
              San Miguel
            </h3>
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-8" aria-hidden="true" />
            <p className="text-[#4A6275] text-sm leading-relaxed mb-10">
              San Miguel es una de las comunas con mayor crecimiento en Santiago.
              La demanda de arriendo supera la oferta y la plusvalía crece año a año.
            </p>
            <a href="#cotizador" className="block" aria-label="Ir a cotizador de inversión">
              <Button
                variant="primary"
                size="md"
                type="button"
                aria-label="Cotizar inversión en Boulevard Santa Rosa"
              >
                Cotizar ahora →
              </Button>
            </a>
          </div>

          {/* RIGHT (3/4): 4 tarjetas premium optimizadas */}
          <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 h-full">
            {metrics.map(({ iconName, value, title, description, bgGradient, iconColor }, idx) => (
              <div
                key={title}
                className="rounded-2xl px-3 py-6 sm:py-8 lg:px-5 lg:py-12 flex flex-col items-center justify-center gap-3 sm:gap-4 lg:gap-5 h-full text-center group overflow-hidden relative transition-transform duration-300 hover:shadow-lg hover:-translate-y-2"
                style={{
                  background: bgGradient,
                }}
                role="article"
                aria-label={`${title}: ${value}`}
              >
                {/* Sombra sutil */}
                <div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"
                  style={{
                    background: idx % 2 === 0 ? "rgba(6, 113, 174, 0.3)" : "rgba(132, 206, 37, 0.3)",
                  }}
                  aria-hidden="true"
                />

                {/* Luz de fondo */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${iconColor}15, transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
                  <Icon name={iconName} size={48} style={{ color: iconColor }} aria-hidden="true" />
                </div>

                {/* Contenido */}
                <div className="space-y-2 relative z-10">
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#033D6B]">
                    {value}
                  </p>
                  <p className="text-[10px] sm:text-xs lg:text-sm font-semibold text-[#033D6B]">{title}</p>
                  <p className="text-[9px] sm:text-xs lg:text-xs text-[#4A6275] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
