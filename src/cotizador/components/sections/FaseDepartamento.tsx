"use client";

import {
  ArrowRight,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Compass,
  LayoutGrid,
  Maximize2,
  Ruler,
  ShieldCheck,
  Sun,
} from "lucide-react";
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
import { PlanoDepartamento } from "./PlanoDepartamento";
import { SelectorUnidad } from "./SelectorUnidad";

interface FaseDepartamentoProps {
  tipologias: Tipologia[];
  pisos: ConteoPiso[];
  tipologia: Tipologia;
  unidad: MobysuiteAsset;
  onTipologia: (t: Tipologia) => void;
  onUnidad: (id: number) => void;
  onContinuar: () => void;
}

export function FaseDepartamento({
  tipologias,
  pisos,
  tipologia,
  unidad,
  onTipologia,
  onUnidad,
  onContinuar,
}: FaseDepartamentoProps) {
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      {/* ── Columna izquierda: tipologías ── */}
      <aside className="no-print">
        <h3 className="mb-3 text-sm font-bold text-primary-blue">Tipologías</h3>
        {/* Alto fijo con scroll propio: con muchas tipologías, la columna no
            debe seguir creciendo y empujando la página hacia abajo. */}
        <div className="scroll-marca flex max-h-[480px] flex-col gap-3 overflow-y-auto pr-2">
          {tipologias.map((t) => {
            const activa = t.key === tipologia.key;
            return (
              <button
                key={t.key}
                type="button"
                onClick={() => onTipologia(t)}
                aria-pressed={activa}
                className={`rounded-xl border-2 px-4 py-3 text-left transition-colors ${
                  activa
                    ? "border-primary-green bg-surface-green"
                    : "border-gray-200 bg-white hover:border-primary-blue"
                }`}
              >
                {/* La tipología (Tipo A, B...) es el título; la cantidad de
                    dormitorios/baños no va acá — ya se ve en Características
                    al elegir la unidad. */}
                <p className="font-bold text-secondary-navy">{tipoLabel(t.key)}</p>
                <div className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-xs text-slate-blue">Desde {area(t.minArea)} útiles</span>
                  {/* "Desde": tanto el precio como el área son el mínimo entre
                      las unidades disponibles de esta tipología, y el precio
                      final depende de la unidad (piso, orientación). */}
                  <span className="text-sm font-bold text-primary-blue">
                    Desde UF {formatUF(t.minPrice)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <p className="mt-5 flex items-start gap-2 text-xs leading-snug text-slate-blue">
          <ShieldCheck size={16} className="mt-0.5 shrink-0 text-primary-green" />
          Bodega y estacionamiento son opcionales y se agregan en el paso siguiente.
        </p>
      </aside>

      {/* ── Panel de detalle ── */}
      <section id="zona-imprimible" className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-secondary-navy">Detalle del departamento</h3>
            {/* Precio en la misma línea que "Depto. X • Tipo", no en un
                bloque aparte: varía por unidad (piso, orientación), no
                es un dato fijo de la tipología, así que va en el detalle. */}
            <p className="mt-1 text-sm font-bold text-primary-blue">
              Depto. {unidad.assetNumber} • {tipologia.label} • UF {formatUF(unidad.listValue)}
            </p>
          </div>
          {/* Acción arriba a la derecha, igual que en el resto de las fases:
              reemplaza el botón "Elegir este departamento" que quedaba al
              pie del plano y confundía sobre cómo avanzar. */}
          <div className="no-print flex flex-col items-stretch gap-2 sm:items-end">
            <button
              type="button"
              onClick={onContinuar}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-navy"
            >
              Elegir
              <ArrowRight size={17} />
            </button>
            {/* El cambio de unidad vive junto al título: una línea en vez de
                una grilla de pills al pie que estiraba la ficha. */}
            <SelectorUnidad
              unidades={tipologia.units}
              unidadId={unidad.id}
              onUnidad={onUnidad}
              className="w-full sm:w-64"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_210px_minmax(0,260px)]">
          {/* Plano */}
          <div>
            <div className="rounded-xl border border-gray-200 p-3">
              <PlanoDepartamento
                src={unidad.fullUrlImageOne}
                alt={`Plano ${tipoLabel(tipologia.key)} — Depto. ${unidad.assetNumber}`}
                className="h-auto w-full"
              />
            </div>
            <p className="mt-3 text-xs leading-snug text-slate-blue">
              Las imágenes y dimensiones son referenciales y podrían experimentar variaciones durante el
              desarrollo del proyecto.
            </p>
          </div>

          {/* Ubicación en el edificio */}
          <div>
            <h4 className="mb-3 text-sm font-bold text-secondary-navy">Ubicación en el edificio</h4>
            <div className="flex flex-col gap-1">
              {pisos.map(({ piso, disponibles, total }) => {
                const actual = piso === unidad.floor;
                // Unidad de ESTA tipología disponible en ese piso, si existe:
                // clicar el piso salta directo a ella.
                const unidadDelPiso = tipologia.units.find((u) => u.floor === piso && esDisponible(u));

                const contenido = (
                  <>
                    <span className={`text-xs ${actual ? "font-bold" : "font-medium"}`}>Piso {piso}</span>
                    {/* Verde = disponible, rojo = vendido: se ve de un vistazo
                        cuánto queda por piso, no solo cuánto se muestra. */}
                    <span className="flex items-center gap-[3px]">
                      {Array.from({ length: total }, (_, i) => (
                        <span
                          key={i}
                          className={`h-3.5 w-2 rounded-[2px] ${
                            i < disponibles ? "bg-primary-green" : "bg-red-400"
                          }`}
                        />
                      ))}
                    </span>
                    <span className={`text-xs tabular-nums ${actual ? "font-bold" : ""}`}>
                      {disponibles}/{total}
                    </span>
                  </>
                );

                const clases = `grid w-full grid-cols-[56px_1fr_auto] items-center gap-2 rounded-md px-2 py-1 text-left transition-colors ${
                  actual
                    ? "bg-secondary-navy text-white"
                    : unidadDelPiso
                      ? "cursor-pointer text-slate-blue hover:bg-surface-blue"
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
            <p className="mt-3 flex items-center gap-3 text-xs leading-snug text-slate-blue">
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-primary-green" /> Disponible
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2.5 w-2.5 rounded-[2px] bg-red-400" /> Vendido
              </span>
            </p>
            <p className="mt-1 text-[11px] leading-snug text-slate-blue">
              Toca un piso para ver ahí una unidad disponible de este tipo.
            </p>
          </div>

          {/* Características + equipamiento */}
          <div className="flex flex-col gap-5">
            <div>
              <h4 className="mb-3 text-sm font-bold text-secondary-navy">Características</h4>
              <dl className="divide-y divide-gray-200 rounded-xl border border-gray-200">
                {/* Sin Precio ni Estado acá: el precio va en el detalle
                    (arriba) y el estado sobra porque el select ya solo
                    lista unidades disponibles. */}
                <Caracteristica icon={Ruler} label="Superficie útil" value={area(unidad.usableArea)} />
                {(unidad.terraceArea ?? 0) > 0 && (
                  <Caracteristica icon={Sun} label="Terraza" value={area(unidad.terraceArea ?? 0)} />
                )}
                <Caracteristica icon={Maximize2} label="Superficie total" value={area(superficieTotal(unidad))} />
                <Caracteristica icon={LayoutGrid} label="Tipología" value={tipoLabel(tipologia.key)} />
                <Caracteristica icon={BedDouble} label="Dormitorios" value={String(unidad.numberOfRooms)} />
                <Caracteristica icon={Bath} label="Baños" value={String(unidad.numberOfBathrooms)} />
                <Caracteristica icon={Compass} label="Orientación" value={orientacion(unidad.orientation)} />
                <Caracteristica icon={Building2} label="Piso" value={String(unidad.floor)} />
              </dl>
            </div>

            <div className="rounded-xl border border-gray-200 p-4">
              <h4 className="mb-3 text-sm font-bold text-secondary-navy">Equipamiento y terminaciones</h4>
              <ul className="flex flex-col gap-2">
                {equipamientoDe(tipologia.key).map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-snug text-slate-blue">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary-green" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

function Caracteristica({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Maximize2;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-3 px-4 py-2.5">
      <dt className="flex items-center gap-2 text-sm text-slate-blue">
        <Icon size={16} className="shrink-0 text-primary-blue" />
        {label}
      </dt>
      <dd className="text-sm font-bold text-secondary-navy">{value}</dd>
    </div>
  );
}
