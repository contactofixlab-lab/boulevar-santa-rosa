"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SlideInSectionProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}

export const SlideInSection = ({
  children,
  direction = "left",
  className = ""
}: SlideInSectionProps) => {
  const xStart = direction === "left" ? -100 : 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: xStart, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
        duration: 0.6,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
