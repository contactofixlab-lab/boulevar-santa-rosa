"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

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
            <h2 className="text-3xl md:text-4xl font-bold text-[#0671AE] leading-tight mb-4">
              San Miguel
            </h2>
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-8" />
            <p className="text-[#4A6275] text-sm leading-relaxed mb-10">
              San Miguel es una de las comunas con mayor crecimiento en Santiago.
              La demanda de arriendo supera la oferta y la plusvalía crece año a año.
            </p>
            <Link href="/#cotizador" className="block">
              <Button
                variant="primary"
                size="md"
                type="button"
              >
                Cotizar ahora →
              </Button>
            </Link>
          </div>

          {/* RIGHT (3/4): 4 tarjetas con glass 3D */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full">
            {metrics.map(({ iconName, value, title, description, iconColor }, idx) => (
              <motion.div
                key={title}
                whileHover={{ y: -12, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-2xl px-5 py-12 sm:py-14 flex flex-col items-center justify-center gap-5 sm:gap-6 h-full text-center group overflow-hidden relative"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255, 255, 255, 0.25)",
                  boxShadow: `
                    0 8px 32px rgba(0, 0, 0, 0.1),
                    inset 0 1px 2px rgba(255, 255, 255, 0.3),
                    0 0 30px ${idx % 2 === 0 ? 'rgba(6, 113, 174, 0.15)' : 'rgba(132, 206, 37, 0.15)'}
                  `,
                }}
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at center, ${iconColor}15, transparent)`,
                  }}
                />

                <motion.div
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="relative z-10"
                >
                  <Icon name={iconName} size={48} style={{ color: iconColor }} aria-hidden="true" />
                </motion.div>

                <div className="space-y-2 relative z-10">
                  <p className="text-3xl sm:text-4xl font-bold text-[#033D6B]">{value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#033D6B]">{title}</p>
                  <p className="text-xs text-[#4A6275] leading-relaxed">{description}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
