"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface Glass3DCardProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const Glass3DCard = ({ children, className = "", style }: Glass3DCardProps) => {
  return (
    <motion.div
      className={`relative rounded-xl overflow-hidden backdrop-blur-md ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: `
          0 8px 32px rgba(0, 0, 0, 0.1),
          inset 0 1px 2px rgba(255, 255, 255, 0.3),
          0 0 20px rgba(6, 113, 174, 0.1)
        `,
        ...style,
      }}
      whileHover={{
        y: -8,
        boxShadow: `
          0 20px 48px rgba(0, 0, 0, 0.15),
          inset 0 1px 2px rgba(255, 255, 255, 0.3),
          0 0 40px rgba(6, 113, 174, 0.2)
        `,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {children}
    </motion.div>
  );
};
