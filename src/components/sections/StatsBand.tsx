"use client";

import { Icon } from "@/components/ui/Icon";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useState } from "react";

const stats = [
  { iconName: "proyecto-pisos",  value: "10",  label: "Pisos totales",     iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "departamentos",   value: "94", label: "Departamentos",     iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
  { iconName: "estacionamiento", value: "62", label: "Estacionamientos",  iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "bodegas",         value: "48", label: "Bodegas",           iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
  { iconName: "store",           value: "19", label: "Locales comerciales", iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, rotateX: 60 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  },
};

export const StatsBand = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="relative z-20 pb-6 md:pb-10" style={{ perspective: "1000px" }}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 -mt-[78px] md:-mt-[103px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ iconName, value, label, iconColor, bgGradient }, idx) => (
            <motion.div
              key={label}
              variants={itemVariants}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              whileHover={{
                y: -16,
                scale: 1.08,
                rotateY: 10,
                rotateX: -10,
              }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="group h-20 md:h-24 rounded-xl px-2 md:px-3 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5 relative"
              style={{
                background: `linear-gradient(${bgGradient}, ${bgGradient}), #ffffff`,
                boxShadow: hoveredIdx === idx
                  ? `
                    0 25px 50px rgba(0, 0, 0, 0.15),
                    0 0 40px ${idx % 2 === 0 ? 'rgba(6, 113, 174, 0.25)' : 'rgba(132, 206, 37, 0.25)'},
                    inset 0 1px 2px rgba(255, 255, 255, 0.5)
                  `
                  : `
                    0 10px 30px rgba(0, 0, 0, 0.08),
                    0 0 20px ${idx % 2 === 0 ? 'rgba(6, 113, 174, 0.1)' : 'rgba(132, 206, 37, 0.1)'},
                    inset 0 1px 0 rgba(255, 255, 255, 1)
                  `,
              }}
            >
              {/* Gradient overlay on hover */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  background: `linear-gradient(135deg, ${iconColor}20, transparent)`,
                }}
              />

              <motion.div
                whileHover={{
                  scale: 1.25,
                  rotate: 15,
                  z: 10,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="relative z-10"
              >
                <Icon name={iconName} size={28} style={{ color: iconColor }} aria-hidden="true" />
              </motion.div>

              <motion.span
                animate={{
                  color: hoveredIdx === idx ? iconColor : "#033D6B",
                }}
                className="text-lg md:text-2xl font-bold leading-none text-center relative z-10"
              >
                {value}
              </motion.span>

              <span className="text-[10px] md:text-xs text-[#4A6275] font-medium leading-tight text-center relative z-10">
                {label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
