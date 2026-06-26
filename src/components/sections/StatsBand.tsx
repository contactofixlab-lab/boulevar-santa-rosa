"use client";

import { Icon } from "@/components/ui/Icon";
import { motion } from "framer-motion";

const stats = [
  { iconName: "proyecto-pisos",  value: "10",  label: "Pisos totales",     iconColor: "#0671AE" },
  { iconName: "departamentos",   value: "94", label: "Departamentos",     iconColor: "#84CE25" },
  { iconName: "estacionamiento", value: "62", label: "Estacionamientos",  iconColor: "#0671AE" },
  { iconName: "bodegas",         value: "48", label: "Bodegas",           iconColor: "#84CE25" },
  { iconName: "store",           value: "19", label: "Locales comerciales", iconColor: "#0671AE" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 30 },
  },
};

export const StatsBand = () => {
  return (
    <section className="relative z-20 pb-6 md:pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-3 -mt-[78px] md:-mt-[103px]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ iconName, value, label, iconColor }, idx) => (
            <motion.div
              key={label}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="group h-20 md:h-24 rounded-xl px-2 md:px-3 py-3 md:py-4 flex flex-col items-center justify-center gap-1.5"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: `
                  0 8px 32px rgba(0, 0, 0, 0.08),
                  inset 0 1px 1px rgba(255, 255, 255, 0.4),
                  0 0 20px ${idx % 2 === 0 ? 'rgba(6, 113, 174, 0.1)' : 'rgba(132, 206, 37, 0.1)'}
                `,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Icon name={iconName} size={28} style={{ color: iconColor }} aria-hidden="true" />
              </motion.div>
              <span className="text-lg md:text-2xl font-bold text-[#033D6B] leading-none text-center">{value}</span>
              <span className="text-[10px] md:text-xs text-[#4A6275] font-medium leading-tight text-center">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
