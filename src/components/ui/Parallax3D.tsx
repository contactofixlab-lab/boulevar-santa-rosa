"use client";

import { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Parallax3DProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export const Parallax3D = ({ children, offset = 50, className = "" }: Parallax3DProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [offset, -offset]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <motion.div
      ref={ref}
      style={{
        y,
        rotateX,
        perspective: 1000,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
