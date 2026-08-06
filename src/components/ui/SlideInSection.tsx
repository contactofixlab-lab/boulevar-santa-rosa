"use client";

import { ReactNode } from "react";

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
  const animationClass = direction === "left" ? "animate-slide-in-left" : "animate-slide-in-right";

  return (
    <div className={`${animationClass} ${className}`}>
      {children}
    </div>
  );
};
