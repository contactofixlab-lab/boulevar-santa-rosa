"use client";

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, Car, Check, Warehouse, X } from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { assetTypeLabel, formatUF } from "@/cotizador/lib/mobysuite/format";
import { area, esDisponible } from "@/cotizador/lib/tipologias";

interface FaseExtrasProps {
  assets: MobysuiteAsset[];
  departamento: MobysuiteAsset;
  extras: number[];
  onToggleExtra: (id: number) => void;
  onAtras: () => void;
  onContinuar: () => void;
  onOmitir: () => void;
}

const GRUPOS = [
  { tipo: "BODEGA", titulo: "Bodegas", icon: Warehouse },
  { tipo: "ESTACIONAMIENTO", titulo: "Estacionamientos", icon: Car },
  // "Motos" a secas se prestaba a confusión (parecía venta de motos): esto es
  // el estacionamiento para moto, no la moto.
  { tipo: "ESTACIONAMIENTO_MOTO", titulo: "Estacionamientos motos", icon: Car },
] as const;

export function FaseExtras({
  assets,
  departamento,
  extras,
  onToggleExtra,
  onAtras,
  onContinuar,
  onOmitir,
}: FaseExtrasProps) {
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

  const lista = porTipo.get(tipoActivo) ?? [];
  const seleccionados = assets.filter((a) => extras.includes(a.id));
  const total = departamento.listValue + seleccionados.reduce((s, a) => s + a.listValue, 0);

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      {/* Acciones arriba a la derecha: quedan a la vista sin recorrer la lista. */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold text-secondary-navy">¿Agregas algo más a tu cotización?</h3>
          <p className="mt-1 text-sm text-slate-blue">
            Bodegas y estacionamientos son opcionales. Puedes elegir los que quieras o saltarte este paso.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onAtras}
            className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-surface-blue px-4 py-2.5 text-sm font-semibold text-secondary-navy transition-colors hover:border-primary-blue hover:text-primary-blue"
          >
            <ArrowLeft size={17} />
            Atrás
          </button>
          <button
            type="button"
            onClick={onOmitir}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-green px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-green-dark"
          >
            Saltar este paso
          </button>
          <button
            type="button"
            onClick={onContinuar}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-navy"
          >
            Continuar
            <ArrowRight size={17} />
          </button>
        </div>
      </div>

      {/* Pestañas por tipo: antes eran tres listados uno debajo del otro. */}
      <div className="mt-6 inline-flex rounded-xl border-2 border-surface-blue bg-surface-blue p-1">
        {gruposConStock.map(({ tipo, titulo, icon: Icon }) => {
          const activo = tipo === tipoActivo;
          // El contador de la pestaña es sobre disponibles, no sobre el total
          // (que ahora incluye vendidos) — es lo que realmente se puede elegir.
          const cantidad = (porTipo.get(tipo) ?? []).filter(esDisponible).length;
          const elegidos = seleccionados.filter((a) => a.assetTypeValue === tipo).length;
          return (
            <button
              key={tipo}
              type="button"
              onClick={() => setTipoActivo(tipo)}
              aria-pressed={activo}
              className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold text-primary-blue transition-colors ${
                activo ? "bg-primary-green shadow-sm" : "hover:text-secondary-navy"
              }`}
            >
              <Icon size={16} />
              {titulo}
              <span
                className={`rounded-full px-1.5 py-0.5 text-[11px] font-bold ${
                  activo
                    ? "bg-white text-primary-green"
                    : elegidos > 0
                      ? "bg-primary-green text-white"
                      : "bg-surface-blue text-slate-blue"
                }`}
              >
                {elegidos > 0 ? `${elegidos}/${cantidad}` : cantidad}
              </span>
            </button>
          );
        })}
      </div>

      {/* Elegidos siempre visibles, sin tener que recorrer las listas */}
      {seleccionados.length > 0 && (
        <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl bg-surface-green px-4 py-3">
          <span className="text-xs font-bold uppercase tracking-wide text-secondary-navy">
            Agregados
          </span>
          {seleccionados.map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => onToggleExtra(a.id)}
              className="inline-flex items-center gap-1.5 rounded-full border border-primary-green bg-white px-3 py-1 text-xs font-semibold text-secondary-navy transition-colors hover:border-red-400 hover:text-red-600"
              aria-label={`Quitar ${assetTypeLabel(a.assetTypeValue)} N° ${a.assetNumber}`}
            >
              {assetTypeLabel(a.assetTypeValue)} N° {a.assetNumber}
              <X size={13} />
            </button>
          ))}
        </div>
      )}

      {/* Alto fijo con scroll propio en vez de paginar con "Ver más": la
          sección no sigue creciendo por más unidades que tenga el tipo. */}
      <div className="scroll-marca mt-5 max-h-[300px] overflow-y-auto pr-2">
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
          {lista.map((a) => {
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
                    ? "cursor-not-allowed border-surface-blue bg-surface-light text-slate-blue/50 line-through"
                    : activo
                      ? "border-primary-green bg-surface-green"
                      : "border-surface-blue bg-white hover:border-primary-blue"
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
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border-2 border-surface-blue bg-surface-blue px-5 py-4">
        <span className="text-sm text-secondary-navy">
          Depto. {departamento.assetNumber}
          {seleccionados.length > 0 &&
            ` + ${seleccionados.length} extra${seleccionados.length > 1 ? "s" : ""}`}
        </span>
        <span className="text-sm font-bold text-secondary-navy">
          Total <span className="text-lg text-primary-blue">UF {formatUF(total)}</span>
        </span>
      </div>

    </section>
  );
}
