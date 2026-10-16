"use client";

import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

/** Carrusel horizontal con scroll por gesto — evita columnas que alargan la página. */
export function TiraHorizontal({ children }: { children: ReactNode }) {
  return (
    <div className="-mx-4 overflow-x-auto px-4 pb-1">
      <div className="flex w-max snap-x snap-mandatory gap-2">{children}</div>
    </div>
  );
}

/**
 * Bloque colapsable con <details> nativo: accesible y sin JavaScript.
 * En móvil el contenido secundario arranca cerrado para no alargar el scroll.
 */
export function Desplegable({
  titulo,
  resumen,
  children,
}: {
  titulo: string;
  resumen?: string;
  children: ReactNode;
}) {
  return (
    <details className="group rounded-xl border border-gray-200">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2.5 [&::-webkit-details-marker]:hidden">
        <span className="text-xs font-bold text-secondary-navy">{titulo}</span>
        <span className="flex items-center gap-1.5">
          {resumen && <span className="text-[11px] text-slate-blue">{resumen}</span>}
          <ChevronDown
            size={16}
            className="text-primary-blue transition-transform group-open:rotate-180"
          />
        </span>
      </summary>
      <div className="border-t border-gray-200 px-3 py-3">{children}</div>
    </details>
  );
}

/**
 * Barra de acción fija al pie: en móvil el botón principal debe quedar siempre
 * al alcance del pulgar, sin obligar a llegar al final del scroll.
 */
export function BarraAccion({
  etiqueta,
  valor,
  textoBoton,
  onAccion,
  deshabilitado = false,
  secundario,
}: {
  etiqueta: string;
  valor: string;
  textoBoton: string;
  onAccion: () => void;
  deshabilitado?: boolean;
  secundario?: ReactNode;
}) {
  return (
    // pr-24: deja libre el botón flotante de WhatsApp de la web, que si no tapa el botón principal.
    <div className="sticky bottom-0 z-20 -mx-4 mt-4 border-t border-gray-200 bg-white pb-4 pl-4 pr-24 pt-3 shadow-[0_-4px_12px_rgba(0,0,0,0.06)]">
      {secundario && <div className="mb-2 flex justify-center">{secundario}</div>}
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] text-slate-blue">{etiqueta}</p>
          <p className="text-base font-bold text-primary-blue">{valor}</p>
        </div>
        <button
          type="button"
          onClick={onAccion}
          disabled={deshabilitado}
          className="shrink-0 rounded-lg bg-primary-blue px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-navy disabled:opacity-60"
        >
          {textoBoton}
        </button>
      </div>
    </div>
  );
}
