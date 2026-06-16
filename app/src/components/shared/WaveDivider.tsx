interface WaveDividerProps {
  fill: string;
  className?: string;
  flip?: boolean;
}

export const WaveDivider = ({ fill, className = "", flip = false }: WaveDividerProps) => (
  <div
    className={`absolute left-0 right-0 leading-none overflow-hidden ${className}`}
    aria-hidden="true"
  >
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      className={`block w-full h-16 md:h-20 ${flip ? "rotate-180" : ""}`}
      fill={fill}
    >
      <path d="M0,20 C240,80 480,0 720,40 C960,80 1200,0 1440,30 L1440,80 L0,80 Z" />
    </svg>
  </div>
);
