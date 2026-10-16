"use client";

import { Bath, BedDouble, Building2, CheckCircle2, Compass, Maximize2, Ruler, Sun } from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { formatUF } from "@/cotizador/lib/mobysuite/format";
import { equipamientoDe } from "@/cotizador/lib/equipamiento";
import {
  area,
  esDisponible,
  orientacion,
  superficieTotal,
  tipoLabel,
  type ConteoPiso,
  type Tipologia,
} from "@/cotizador/lib/tipologias";
import { PlanoDepartamento } from "@/cotizador/components/sections/PlanoDepartamento";
import { SelectorUnidad } from "@/cotizador/components/sections/SelectorUnidad";
import { BarraAccion, Desplegable, TiraHorizontal } from "./piezas";

interface Props {
  tipologias: Tipologia[];
  pisos: ConteoPiso[];
  tipologia: Tipologia;
  unidad: MobysuiteAsset;
  onTipologia: (t: Tipologia) => void;
  onUnidad: (id: number) => void;
  onContinuar: () => void;
}

export function FaseDepartamentoMobile({
  tipologias,
  pisos,
  tipologia,
  unidad,
  onTipologia,
  onUnidad,
  onContinuar,
}: Props) {
  return (
    <div>
      {/* Tipologías: tira horizontal, no una columna que empuja todo hacia abajo */}
      <h3 className="mb-2 text-sm font-bold text-primary-blue">Tipologías</h3>
      <TiraHorizontal>
        {tipologias.map((t) => {
          const activa = t.key === tipologia.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onTipologia(t)}
              aria-pressed={activa}
              className={`w-40 shrink-0 snap-start rounded-xl border-2 px-3 py-2.5 text-left transition-colors ${
                activa ? "border-primary-green bg-surface-green" : "border-gray-200 bg-white"
              }`}
            >
              {/* La tipología (Tipo A, B...) es el título; la cantidad de
                  dormitorios/baños no va acá — ya se ve en Características
                  al elegir la unidad. */}
              <p className="text-sm font-bold text-secondary-navy">{tipoLabel(t.key)}</p>
              <p className="mt-0.5 text-[11px] text-slate-blue">Desde {area(t.minArea)} útiles</p>
              <p className="mt-1 text-sm font-bold text-primary-blue">Desde UF {formatUF(t.minPrice)}</p>
            </button>
          );
        })}
      </TiraHorizontal>

      <section className="mt-5 rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-secondary-navy">Depto. {unidad.assetNumber}</h3>
            <p className="text-xs font-bold text-primary-blue">
              {tipoLabel(tipologia.key)} · {tipologia.label}
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center rounded-full bg-surface-green px-2.5 py-0.5 text-[11px] font-semibold text-secondary-navy">
            Disponible
          </span>
        </div>

        {/* Cambiar de unidad desde un desplegable: una línea en vez de una tira
            larga al final de la ficha. */}
        <SelectorUnidad
          unidades={tipologia.units}
          unidadId={unidad.id}
          onUnidad={onUnidad}
          className="mt-3 block"
        />

        <div className="mt-3 overflow-hidden rounded-xl border border-gray-200">
          <PlanoDepartamento
            src={unidad.fullUrlImageOne}
            alt={`Plano ${tipoLabel(tipologia.key)} — Depto. ${unidad.assetNumber}`}
          />
        </div>
        <p className="mt-2 text-[11px] leading-snug text-slate-blue">
          Las imágenes y dimensiones son referenciales y podrían experimentar variaciones durante el
          desarrollo del proyecto.
        </p>

        {/* Características como mosaico: se lee de un vistazo, sin scroll largo */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Dato icon={Ruler} label="Sup. útil" value={area(unidad.usableArea)} />
          {(unidad.terraceArea ?? 0) > 0 && <Dato icon={Sun} label="Terraza" value={area(unidad.terraceArea ?? 0)} />}
          <Dato icon={Maximize2} label="Sup. total" value={area(superficieTotal(unidad))} />
          <Dato icon={Building2} label="Piso" value={String(unidad.floor)} />
          <Dato icon={BedDouble} label="Dormitorios" value={String(unidad.numberOfRooms)} />
          <Dato icon={Bath} label="Baños" value={String(unidad.numberOfBathrooms)} />
          <Dato icon={Compass} label="Orientación" value={orientacion(unidad.orientation)} />
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <Desplegable titulo="Ubicación en el edificio" resumen={`Piso ${unidad.floor}`}>
            <div className="flex flex-col gap-1">
              {pisos.map(({ piso, disponibles, total }) => {
                const actual = piso === unidad.floor;
                // Unidad de ESTA tipología disponible en ese piso, si existe:
                // tocar el piso salta directo a ella.
                const unidadDelPiso = tipologia.units.find((u) => u.floor === piso && esDisponible(u));

                const contenido = (
                  <>
                    <span className={`text-[11px] ${actual ? "font-bold" : "font-medium"}`}>
                      Piso {piso}
                    </span>
                    <span className="flex items-center gap-[2px]">
                      {Array.from({ length: total }, (_, i) => (
                        <span
                          key={i}
                          className={`h-3 w-1.5 rounded-[1px] ${
                            i < disponibles ? "bg-primary-green" : "bg-red-400"
                          }`}
                        />
                      ))}
                    </span>
                    <span className={`text-[11px] tabular-nums ${actual ? "font-bold" : ""}`}>
                      {disponibles}/{total}
                    </span>
                  </>
                );

                const clases = `grid w-full grid-cols-[52px_1fr_auto] items-center gap-2 rounded-md px-2 py-1 text-left transition-colors ${
                  actual
                    ? "bg-secondary-navy text-white"
                    : unidadDelPiso
                      ? "text-slate-blue active:bg-surface-blue"
                      : "text-slate-blue"
                }`;

                return unidadDelPiso ? (
                  <button
                    key={piso}
                    type="button"
                    onClick={() => onUnidad(unidadDelPiso.id)}
                    className={clases}
                  >
                    {contenido}
                  </button>
                ) : (
                  <div key={piso} className={clases}>
                    {contenido}
                  </div>
                );
              })}
            </div>
            <p className="mt-2 flex items-center gap-3 text-[11px] text-slate-blue">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-[1px] bg-primary-green" /> Disponible
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-[1px] bg-red-400" /> Vendido
              </span>
            </p>
            <p className="mt-1 text-[10px] leading-snug text-slate-blue">
              Toca un piso para ver ahí una unidad disponible de este tipo.
            </p>
          </Desplegable>

          <Desplegable titulo="Equipamiento y terminaciones" resumen={`${equipamientoDe(tipologia.key).length} incluidos`}>
            <ul className="flex flex-col gap-2">
              {equipamientoDe(tipologia.key).map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] leading-snug text-slate-blue">
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-primary-green" />
                  {item}
                </li>
              ))}
            </ul>
          </Desplegable>
        </div>

      </section>

      <BarraAccion
        etiqueta={`Depto. ${unidad.assetNumber}`}
        valor={`UF ${formatUF(unidad.listValue)}`}
        textoBoton="Elegir"
        onAccion={onContinuar}
      />
    </div>
  );
}

function Dato({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Maximize2;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-200 px-3 py-2">
      <p className="flex items-center gap-1.5 text-[11px] text-slate-blue">
        <Icon size={13} className="shrink-0 text-primary-blue" />
        {label}
      </p>
      <p className="mt-0.5 text-sm font-bold text-secondary-navy">{value}</p>
    </div>
  );
}
