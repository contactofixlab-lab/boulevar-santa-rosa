interface SectionDividerProps {
  fromColor?: string;
  toColor?: string;
  height?: number;
}

export const SectionDivider = ({
  fromColor = "#E3F3FB",
  toColor = "#FFFFFF",
  height = 100,
}: SectionDividerProps) => {
  return (
    <svg
      viewBox="0 0 1440 160"
      className="w-full"
      style={{ height: `${height}px` }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="dividerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={fromColor} />
          <stop offset="100%" stopColor={toColor} />
        </linearGradient>
      </defs>

      {/* Onda superior suave - comienza desde arriba */}
      <path
        d="M 0,30 Q 360,0 720,30 T 1440,30 L 1440,0 L 0,0 Z"
        fill={fromColor}
      />

      {/* Onda principal - ondulación grande y suave */}
      <path
        d="M 0,40 Q 240,10 480,40 T 960,40 T 1440,40 L 1440,80 Q 1080,110 720,80 Q 360,50 0,80 Z"
        fill="url(#dividerGrad)"
        opacity="0.8"
      />

      {/* Onda secundaria para más fluidez */}
      <path
        d="M 0,70 Q 360,100 720,70 T 1440,70 L 1440,120 L 0,120 Z"
        fill={toColor}
        opacity="0.6"
      />

      {/* Base sólida */}
      <rect x="0" y="120" width="1440" height="40" fill={toColor} />
    </svg>
  );
};
