interface PlanoReferencialProps {
  className?: string;
}

/**
 * Plano 2D referencial (línea blueprint) reutilizado en TipologiasPreview y en
 * el detalle del cotizador. Único plano dibujado hoy — se muestra para
 * cualquier tipología con la leyenda "Referencial" ya visible en el badge.
 */
export const PlanoReferencial = ({ className = "" }: PlanoReferencialProps) => (
  <svg
    viewBox="0 0 300 300"
    className={className}
    aria-label="Plano referencial 2D+1B"
  >
    {/* Outer wall */}
    <rect x="10" y="10" width="280" height="280" rx="4"
      stroke="#0671AE" strokeWidth="3" fill="#f0f7fc"/>

    {/* Room dividers */}
    <line x1="170" y1="10" x2="170" y2="180" stroke="#0671AE" strokeWidth="2"/>
    <line x1="10" y1="180" x2="290" y2="180" stroke="#0671AE" strokeWidth="2"/>
    <line x1="170" y1="180" x2="170" y2="290" stroke="#0671AE" strokeWidth="2"/>

    {/* Room labels */}
    <text x="88" y="100" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Dormitorio</text>
    <text x="88" y="114" fill="#0671AE" fontSize="9" textAnchor="middle">Principal</text>

    <text x="232" y="90" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Sala /</text>
    <text x="232" y="104" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Comedor</text>

    <text x="88" y="235" fill="#0671AE" fontSize="11" textAnchor="middle" fontWeight="700">Cocina</text>

    <text x="232" y="225" fill="#84CE25" fontSize="10" textAnchor="middle" fontWeight="700">Baño</text>

    {/* Door symbols */}
    <path d="M170,175 Q195,175 195,150" stroke="#0671AE" strokeWidth="1" fill="none" strokeDasharray="3,2"/>
    <path d="M10,185 Q10,210 35,210" stroke="#0671AE" strokeWidth="1" fill="none" strokeDasharray="3,2"/>

    {/* Window marks */}
    <rect x="10" y="40" width="3" height="40" fill="#84CE25" rx="1"/>
    <rect x="10" y="100" width="3" height="40" fill="#84CE25" rx="1"/>
    <rect x="60" y="10" width="60" height="3" fill="#84CE25" rx="1"/>
    <rect x="200" y="10" width="60" height="3" fill="#84CE25" rx="1"/>
    <rect x="287" y="50" width="3" height="60" fill="#84CE25" rx="1"/>

    {/* Compass */}
    <circle cx="265" cy="265" r="16" fill="white" stroke="#E3F3FB" strokeWidth="1"/>
    <text x="265" y="270" fill="#0671AE" fontSize="12" textAnchor="middle" fontWeight="900">N</text>
  </svg>
);
