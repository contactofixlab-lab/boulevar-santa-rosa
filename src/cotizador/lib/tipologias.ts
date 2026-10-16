import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";

export interface Tipologia {
  key: string;
  label: string;
  rooms: number;
  baths: number;
  minArea: number;
  minPrice: number;
  units: MobysuiteAsset[];
}

/** Superficies con un decimal, como en la referencia de diseño (31.3 m²). */
export const area = (value: number) => `${value.toFixed(1)} m²`;

/**
 * Superficie total = útil + terraza, como en el brochure. Ojo: la API entrega
 * `totalArea` igual a la útil (sin terraza), por eso no se usa como "total".
 */
export const superficieTotal = (asset: MobysuiteAsset) => asset.usableArea + (asset.terraceArea ?? 0);

export const orientacion = (value: string) =>
  !value || value === "EMPTY" ? "—" : value.charAt(0) + value.slice(1).toLowerCase();

export const esDisponible = (asset: MobysuiteAsset) => asset.available && asset.showOnWebQuote;

export const tipoLabel = (key: string) => key.replace("TIPO", "Tipo");

/**
 * Agrupa por tipología. `units` incluye TODAS las unidades (disponibles y
 * vendidas) para que el selector pueda mostrar las vendidas tachadas en vez
 * de esconderlas — pero una tipología solo aparece en el listado si le queda
 * al menos una unidad disponible, y el precio/área "desde" se calculan solo
 * sobre las disponibles (una vendida no debe fijar el precio de partida).
 */
export function agruparTipologias(assets: MobysuiteAsset[]): Tipologia[] {
  const grupos = new Map<string, MobysuiteAsset[]>();

  for (const asset of assets) {
    if (asset.assetTypeValue !== "DEPARTAMENTO") continue;
    const key = asset.departmentTypology || "SIN TIPOLOGÍA";
    grupos.set(key, [...(grupos.get(key) ?? []), asset]);
  }

  return [...grupos.entries()]
    .filter(([, units]) => units.some(esDisponible))
    .map(([key, units]) => {
      const ordenadas = [...units].sort((a, b) => a.listValue - b.listValue);
      const disponibles = ordenadas.filter(esDisponible);
      const base = disponibles[0];
      return {
        key,
        label: `${base.numberOfRooms}D + ${base.numberOfBathrooms}B`,
        rooms: base.numberOfRooms,
        baths: base.numberOfBathrooms,
        minArea: Math.min(...disponibles.map((u) => u.totalArea)),
        minPrice: base.listValue,
        units: ordenadas,
      };
    })
    .sort((a, b) => a.minPrice - b.minPrice);
}

export interface ConteoPiso {
  piso: number;
  disponibles: number;
  /** Total de departamentos en ese piso (disponibles + vendidos). */
  total: number;
}

/**
 * Departamentos por piso — alimenta las barras del edificio, con disponibles
 * y total para poder pintar en rojo las unidades que ya no están.
 *
 * La altura del edificio se deduce de los propios datos: se recorre el rango
 * completo entre el piso más bajo y el más alto con departamentos, de modo que
 * un edificio de 10 pisos siempre muestre 10 filas aunque algún piso se haya
 * vendido entero (queda en 0 disponibles, pero el total real igual se ve). Así
 * calza con cualquier proyecto.
 */
export function contarPorPiso(assets: MobysuiteAsset[]): ConteoPiso[] {
  const disponibles = new Map<number, number>();
  const totales = new Map<number, number>();
  for (const asset of assets) {
    if (asset.assetTypeValue !== "DEPARTAMENTO") continue;
    totales.set(asset.floor, (totales.get(asset.floor) ?? 0) + 1);
    if (esDisponible(asset)) disponibles.set(asset.floor, (disponibles.get(asset.floor) ?? 0) + 1);
  }
  if (totales.size === 0) return [];

  const pisos = [...totales.keys()];
  const min = Math.min(...pisos);
  const max = Math.max(...pisos);

  const filas: ConteoPiso[] = [];
  for (let piso = max; piso >= min; piso--) {
    filas.push({ piso, disponibles: disponibles.get(piso) ?? 0, total: totales.get(piso) ?? 0 });
  }
  return filas;
}
