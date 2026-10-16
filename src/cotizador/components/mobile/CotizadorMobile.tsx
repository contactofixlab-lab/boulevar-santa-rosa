"use client";

import { ArrowLeft } from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import type { ConteoPiso, Tipologia } from "@/cotizador/lib/tipologias";
import { PASOS } from "@/cotizador/components/sections/PasosCotizador";
import { FaseDatos, type DatosCliente } from "@/cotizador/components/sections/FaseDatos";
import type { EstadoCotizacion } from "@/cotizador/components/sections/FaseResumen";
import { FaseDepartamentoMobile } from "./FaseDepartamentoMobile";
import { FaseExtrasMobile } from "./FaseExtrasMobile";
import { FaseResumenMobile } from "./FaseResumenMobile";

export interface CotizadorMobileProps {
  assets: MobysuiteAsset[];
  tipologias: Tipologia[];
  pisos: ConteoPiso[];
  tipologia: Tipologia;
  unidad: MobysuiteAsset;
  extras: number[];
  extrasSeleccionados: MobysuiteAsset[];
  datos: DatosCliente;
  fase: number;
  nombreProyecto?: string;
  onTipologia: (t: Tipologia) => void;
  onUnidad: (id: number) => void;
  onToggleExtra: (id: number) => void;
  onDatos: (d: DatosCliente) => void;
  onIrA: (fase: number) => void;
  onOmitirExtras: () => void;
  onNuevaCotizacion: () => void;
  cotizacion: EstadoCotizacion;
  onCotizar: () => void;
}

/**
 * Versión del cotizador para teléfono y tablet vertical.
 *
 * No es el diseño de escritorio encogido: cambia la estructura donde el ancho
 * no da — tipologías y unidades en tiras horizontales, características en
 * mosaico, bloques secundarios colapsados, tabla del resumen convertida en
 * tarjetas, y la acción principal fija al pie. El estado vive en `Cotizador`,
 * así que cambiar de tamaño no pierde la selección.
 */
export function CotizadorMobile(props: CotizadorMobileProps) {
  const { fase, onIrA } = props;

  return (
    <div className="pb-2">
      {/* Encabezado compacto: paso actual + volver */}
      <div className="mb-4 flex items-center gap-3">
        {fase > 1 && (
          <button
            type="button"
            onClick={() => onIrA(fase - 1)}
            aria-label="Volver al paso anterior"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gray-200 text-secondary-navy"
          >
            <ArrowLeft size={17} />
          </button>
        )}
        <div className="min-w-0">
          <p className="text-[11px] font-semibold text-slate-blue">
            Paso {fase} de {PASOS.length}
          </p>
          <p className="truncate text-sm font-bold text-secondary-navy">{PASOS[fase - 1]}</p>
        </div>
      </div>

      {/* Progreso como barra: ocupa menos que cuatro etiquetas */}
      <div className="mb-5 flex gap-1.5" aria-hidden="true">
        {PASOS.map((paso, i) => (
          <span
            key={paso}
            className={`h-1.5 flex-1 rounded-full ${
              i < fase ? "bg-primary-green" : "bg-gray-200"
            }`}
          />
        ))}
      </div>

      {fase === 1 && (
        <FaseDepartamentoMobile
          tipologias={props.tipologias}
          pisos={props.pisos}
          tipologia={props.tipologia}
          unidad={props.unidad}
          onTipologia={props.onTipologia}
          onUnidad={props.onUnidad}
          onContinuar={() => onIrA(2)}
        />
      )}

      {fase === 2 && (
        <FaseExtrasMobile
          assets={props.assets}
          departamento={props.unidad}
          extras={props.extras}
          onToggleExtra={props.onToggleExtra}
          onContinuar={() => onIrA(3)}
          onOmitir={props.onOmitirExtras}
        />
      )}

      {/* El formulario ya es de una columna: se reutiliza tal cual */}
      {fase === 3 && (
        <FaseDatos
          datos={props.datos}
          onCambio={props.onDatos}
          onAtras={() => onIrA(2)}
          onContinuar={() => onIrA(4)}
        />
      )}

      {fase === 4 && (
        <FaseResumenMobile
          departamento={props.unidad}
          extras={props.extrasSeleccionados}
          datos={props.datos}
          nombreProyecto={props.nombreProyecto}
          cotizacion={props.cotizacion}
          onCotizar={props.onCotizar}
          onNuevaCotizacion={props.onNuevaCotizacion}
        />
      )}
    </div>
  );
}
