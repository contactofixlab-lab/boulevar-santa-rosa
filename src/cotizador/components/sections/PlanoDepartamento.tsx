"use client";

import { useState } from "react";

interface PlanoDepartamentoProps {
  /** `fullUrlImageOne` del bien en Mobysuite — hay un plano por tipología. */
  src?: string;
  alt: string;
  className?: string;
}

/**
 * Plano del departamento. Usa la imagen real de Mobysuite; si el bien no la
 * trae (o falla la descarga) cae a un esquema referencial.
 *
 * Nota: los endpoints `get-asset-map-images` / `get-building-map-images`
 * devuelven [] en este proyecto — Mobysuite aún no carga esos planos, así que
 * la fuente válida hoy es `fullUrlImageOne`.
 */
export function PlanoDepartamento({ src, alt, className = "" }: PlanoDepartamentoProps) {
  const [falló, setFalló] = useState<string | null>(null);

  if (src && falló !== src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- imagen remota de Mobysuite, sin optimización
      <img
        src={src}
        alt={alt}
        onError={() => setFalló(src)}
        className={`w-full object-contain ${className}`}
      />
    );
  }

  return <PlanoEsquematico className={className} />;
}

const PlanoEsquematico = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 290 200" className={className} aria-label="Plano referencial del departamento">
    <g stroke="#0671AE" strokeWidth="1.2" fill="#F4F9FD">
      <rect x="8" y="8" width="132" height="96" rx="3" />
      <rect x="150" y="8" width="132" height="96" rx="3" />
      <rect x="8" y="114" width="132" height="78" rx="3" />
      <rect x="150" y="114" width="62" height="78" rx="3" />
      <rect x="222" y="114" width="60" height="78" rx="3" />
    </g>
    <g fill="#4A6275" fontSize="7.5" textAnchor="middle" fontWeight="500">
      <text x="74" y="59">Living / Comedor</text>
      <text x="216" y="59">Dormitorio</text>
      <text x="74" y="156">Terraza</text>
      <text x="181" y="156">Baño</text>
      <text x="252" y="156">Logia</text>
    </g>
  </svg>
);
