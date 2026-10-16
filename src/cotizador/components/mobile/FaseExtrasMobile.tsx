"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { formatUF } from "@/cotizador/lib/mobysuite/format";
import { area, esDisponible } from "@/cotizador/lib/tipologias";
import { BarraAccion } from "./piezas";

const GRUPOS = [
  { tipo: "BODEGA", titulo: "Bodegas" },
  { tipo: "ESTACIONAMIENTO", titulo: "Estacionamientos" },
  // "Motos" a secas se prestaba a confusión (parecía venta de motos): esto es
  // el estacionamiento para moto, no la moto.
  { tipo: "ESTACIONAMIENTO_MOTO", titulo: "Estacionamientos motos" },
] as const;

/** Con 50+ unidades por tipo, en móvil se muestran de a tandas. */
const TANDA = 8;

interface Props {
  assets: MobysuiteAsset[];
  departamento: MobysuiteAsset;
  extras: number[];
  onToggleExtra: (id: number) => void;
  onContinuar: () => void;
  onOmitir: () => void;
}

export function FaseExtrasMobile({
  assets,
  departamento,
  extras,
  onToggleExtra,
  onContinuar,
  onOmitir,
}: Props) {
  // Incluye también los vendidos (antes se filtraban acá): se listan igual,
  // tachados y sin poder elegirlos, en vez de desaparecer.
  const porTipo = useMemo(() => {
    const mapa = new Map<string, MobysuiteAsset[]>();
    for (const a of assets) {
      if (a.assetTypeValue === "DEPARTAMENTO") continue;
      mapa.set(a.assetTypeValue, [...(mapa.get(a.assetTypeValue) ?? []), a]);
    }
    for (const lista of mapa.values()) lista.sort((a, b) => a.listValue - b.listValue);
    return mapa;
  }, [assets]);

  const gruposConStock = GRUPOS.filter((g) => (porTipo.get(g.tipo) ?? []).some(esDisponible));
  const [tipoActivo, setTipoActivo] = useState<string>(gruposConStock[0]?.tipo ?? "");
  const [visibles, setVisibles] = useState(TANDA);

  const lista = porTipo.get(tipoActivo) ?? [];
  const seleccionados = assets.filter((a) => extras.includes(a.id));
  const total = departamento.listValue + seleccionados.reduce((s, a) => s + a.listValue, 0);

  const cambiarTipo = (tipo: string) => {
    setTipoActivo(tipo);
    setVisibles(TANDA);
  };

  return (
    <div>
      <section className="rounded-2xl bg-white p-4 shadow-sm">
        <h3 className="text-lg font-bold text-secondary-navy">¿Agregas algo más?</h3>
        <p className="mt-1 text-xs text-slate-blue">
          Bodegas y estacionamientos son opcionales. Puedes saltarte este paso.
        </p>

        {/* Pestañas por tipo: en móvil no caben tres listas largas seguidas */}
        <div className="mt-4 flex gap-1.5 rounded-lg bg-surface-light p-1">
          {gruposConStock.map((g) => {
            const activo = g.tipo === tipoActivo;
            const cantidad = (porTipo.get(g.tipo) ?? []).filter(esDisponible).length;
            const elegidos = seleccionados.filter((a) => a.assetTypeValue === g.tipo).length;
            return (
              <button
                key={g.tipo}
                type="button"
                onClick={() => cambiarTipo(g.tipo)}
                aria-pressed={activo}
                className={`min-w-0 flex-1 rounded-md px-2 py-2 text-xs font-semibold leading-tight text-slate-blue transition-colors ${
                  activo ? "bg-primary-green shadow-sm" : ""
                }`}
              >
                {/* min-w-0 evita que el texto largo ("Estacionamientos motos")
                    se desborde de su columna en vez de partirse en dos líneas. */}
                {g.titulo}{" "}
                <span className="font-normal">({elegidos > 0 ? `${elegidos}/${cantidad}` : cantidad})</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {lista.slice(0, visibles).map((a) => {
            const disponible = esDisponible(a);
            const activo = extras.includes(a.id);
            return (
              <button
                key={a.id}
                type="button"
                onClick={() => onToggleExtra(a.id)}
                disabled={!disponible}
                aria-pressed={activo}
                className={`rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                  !disponible
                    ? "cursor-not-allowed border-gray-200 bg-surface-light text-slate-blue/50 line-through"
                    : activo
                      ? "border-primary-green bg-surface-green"
                      : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-sm font-bold ${disponible ? "text-secondary-navy" : ""}`}>
                    N° {a.assetNumber}
                  </span>
                  {activo && <Check size={15} className="shrink-0 text-primary-green" />}
                </div>
                <p className={`mt-0.5 text-[11px] ${disponible ? "text-slate-blue" : ""}`}>
                  {area(a.totalArea)} · Piso {a.floor}
                </p>
                <p className={`mt-1 text-sm font-bold ${disponible ? "text-primary-blue" : ""}`}>
                  {disponible ? `UF ${formatUF(a.listValue)}` : "Vendido"}
                </p>
              </button>
            );
          })}
        </div>

        {visibles < lista.length && (
          <button
            type="button"
            onClick={() => setVisibles((v) => v + TANDA)}
            className="mt-3 w-full rounded-lg border-2 border-gray-200 py-2.5 text-xs font-semibold text-secondary-navy"
          >
            Ver más ({lista.length - visibles} restantes)
          </button>
        )}
      </section>

      <BarraAccion
        etiqueta={
          seleccionados.length > 0
            ? `Depto. ${departamento.assetNumber} + ${seleccionados.length} extra${seleccionados.length > 1 ? "s" : ""}`
            : `Depto. ${departamento.assetNumber}`
        }
        valor={`UF ${formatUF(total)}`}
        textoBoton="Continuar"
        onAccion={onContinuar}
        secundario={
          <button
            type="button"
            onClick={onOmitir}
            className="rounded-lg bg-primary-green px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-secondary-green-dark"
          >
            Saltar este paso
          </button>
        }
      />
    </div>
  );
}
