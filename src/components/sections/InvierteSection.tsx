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

          {/* RIGHT (3/4): 4 tarjetas 3D premium */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-full" style={{ perspective: "1200px" }}>
            {metrics.map(({ iconName, value, title, description, bgGradient, iconColor }, idx) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 50, rotateX: 45 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{
                  y: -20,
                  scale: 1.1,
                  rotateY: 15,
                  rotateX: -15,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-2xl px-5 py-12 sm:py-14 flex flex-col items-center justify-center gap-5 sm:gap-6 h-full text-center group overflow-hidden relative cursor-pointer"
                style={{
                  background: bgGradient,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Sombra dinámica 3D */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4/5 h-6 rounded-full blur-2xl opacity-30 group-hover:opacity-60 transition-opacity"
                  style={{
                    background: idx % 2 === 0 ? "rgba(6, 113, 174, 0.3)" : "rgba(132, 206, 37, 0.3)",
                  }}
                  whileHover={{ scaleX: 1.2, scaleY: 0.8 }}
                />

                {/* Luz de fondo dinamica */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${iconColor}25, transparent 70%)`,
                  }}
                  transition={{ duration: 0.3 }}
                />

                {/* Icon con rotación 3D pronunciada */}
                <motion.div
                  whileHover={{
                    scale: 1.3,
                    rotate: 25,
                    z: 10,
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="relative z-10"
                >
                  <Icon name={iconName} size={48} style={{ color: iconColor }} aria-hidden="true" />
                </motion.div>

                {/* Contenido con animación de texto */}
                <div className="space-y-2 relative z-10">
                  <motion.p
                    whileHover={{ scale: 1.1, color: iconColor }}
                    className="text-3xl sm:text-4xl font-bold text-[#033D6B] transition-colors"
                  >
                    {value}
                  </motion.p>
                  <p className="text-xs sm:text-sm font-semibold text-[#033D6B]">{title}</p>
                  <p className="text-xs text-[#4A6275] leading-relaxed">{description}</p>
                </div>

                {/* Efecto de borde brillante en 3D */}
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)",
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
