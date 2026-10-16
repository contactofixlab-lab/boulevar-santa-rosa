"use client";

import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { formatUF } from "@/cotizador/lib/mobysuite/format";
import { esDisponible } from "@/cotizador/lib/tipologias";
import { Campo } from "@/cotizador/components/ui/campos";
import { Selector } from "@/cotizador/components/ui/Selector";

/**
 * Selector de unidad dentro de la tipología.
 *
 * Antes era una grilla de pills: con 30 unidades por tipología ocupaba cuatro
 * o cinco filas y alargaba la ficha. Como desplegable ocupa una sola línea y
 * funciona igual en escritorio y en teléfono.
 *
 * `unidades` trae disponibles y vendidas juntas: las vendidas se listan
 * igual (tachadas, sin poder elegirlas) en vez de esconderlas, para que se
 * vea el panorama completo de la tipología.
 */
export function SelectorUnidad({
  unidades,
  unidadId,
  onUnidad,
  className = "",
}: {
  unidades: MobysuiteAsset[];
  unidadId: number;
  onUnidad: (id: number) => void;
  className?: string;
}) {
  const disponibles = unidades.filter(esDisponible).length;

  return (
    <Campo label={`Unidad · ${disponibles} disponibles`} className={className}>
      <Selector
        valor={unidadId}
        onCambio={(v) => onUnidad(Number(v))}
        opciones={unidades.map((u) => {
          const disponible = esDisponible(u);
          return {
            valor: u.id,
            texto: `N° ${u.assetNumber} · Piso ${u.floor}`,
            meta: disponible ? `UF ${formatUF(u.listValue)}` : "Vendido",
            resumen: disponible
              ? `N° ${u.assetNumber} · Piso ${u.floor} · UF ${formatUF(u.listValue)}`
              : `N° ${u.assetNumber} · Piso ${u.floor} · Vendido`,
            deshabilitada: !disponible,
          };
        })}
      />
    </Campo>
  );
}
