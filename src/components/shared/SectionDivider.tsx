interface SectionDividerProps {
  color1?: string;
  color2?: string;
  height?: number;
  direction?: "top" | "bottom";
}

export const SectionDivider = ({
  color1 = "#E3F3FB",
  color2 = "#FFFFFF",
  height = 80,
  direction = "bottom",
}: SectionDividerProps) => {
  const viewBox = direction === "top" ? "0 0 1440 120" : "0 0 1440 120";
  const pathD =
    direction === "top"
      ? "M0,40 Q360,0 720,40 T1440,40 L1440,120 L0,120 Z"
      : "M0,80 Q360,120 720,80 T1440,80 L1440,0 L0,0 Z";

  return (
    <svg
      viewBox={viewBox}
      className="w-full"
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={color1} />
          <stop offset="100%" stopColor={color2} />
        </linearGradient>
      </defs>
      <path d={pathD} fill={color1} />
      <path
        d={direction === "top"
          ? "M0,50 Q360,20 720,50 T1440,50 L1440,120 L0,120 Z"
          : "M0,90 Q360,110 720,90 T1440,90 L1440,0 L0,0 Z"}
        fill={color2}
        opacity="0.5"
      />
    </svg>
  );
};
