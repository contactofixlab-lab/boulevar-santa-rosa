"use client";

import { AlertCircle } from "lucide-react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { PAISES, buscarPais } from "@/cotizador/lib/paises";
import { Bandera } from "./Bandera";
import { Selector } from "./Selector";

/**
 * Campos de formulario del cotizador.
 *
 * Usan los tokens de marca en vez de grises neutros: el borde en reposo es
 * `surface-blue`, el foco pasa a `primary-blue` con un halo suave, y el error
 * usa rojo solo en el borde para no romper la paleta. Así los formularios se
 * ven parte del mismo sistema que las tarjetas y no un control de navegador.
 */

const base =
  "w-full rounded-lg border-2 bg-white px-3.5 py-2.5 text-sm text-secondary-navy transition-colors outline-none placeholder:text-slate-blue/50";

const estado = (error: boolean) =>
  error
    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
    : "border-surface-blue hover:border-primary-blue/60 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10";

export function Campo({
  label,
  error,
  ayuda,
  children,
  className = "",
  requerido,
}: {
  label: string;
  error?: string;
  ayuda?: string;
  children: ReactNode;
  className?: string;
  /** Sin definir: no muestra marca (para campos que no son del formulario,
   *  ej. el selector de unidad). `true` = obligatorio, `false` = opcional. */
  requerido?: boolean;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-secondary-navy">
        {label}
        {requerido === true && (
          <span className="text-red-500" aria-hidden="true">
            *
          </span>
        )}
        {requerido === false && (
          <span className="text-[10px] font-semibold normal-case tracking-normal text-slate-blue">
            (Opcional)
          </span>
        )}
      </span>
      {children}
      {error ? (
        <span className="mt-1.5 flex items-center gap-1 text-xs font-medium text-red-600">
          <AlertCircle size={13} className="shrink-0" />
          {error}
        </span>
      ) : (
        ayuda && <span className="mt-1.5 block text-[11px] text-slate-blue">{ayuda}</span>
      )}
    </label>
  );
}

interface CampoTextoProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function CampoTexto({ error = false, className = "", ...props }: CampoTextoProps) {
  return <input {...props} className={`${base} ${estado(error)} ${className}`} />;
}

/**
 * Teléfono con selector de país: bandera + código dentro del mismo campo.
 * Se usa un `<select>` nativo a propósito — en el teléfono abre el selector
 * del sistema, que se maneja mucho mejor que una lista desplegable propia.
 */
export function CampoTelefono({
  codigoPais,
  onCodigoPais,
  error = false,
  className = "",
  ...props
}: CampoTextoProps & { codigoPais: string; onCodigoPais: (codigo: string) => void }) {
  const pais = buscarPais(codigoPais);

  return (
    <div
      className={`flex items-stretch overflow-hidden rounded-lg border-2 bg-white transition-colors focus-within:ring-4 ${
        error
          ? "border-red-400 focus-within:border-red-500 focus-within:ring-red-500/10"
          : "border-surface-blue focus-within:border-primary-blue focus-within:ring-primary-blue/10"
      } ${className}`}
    >
      {/* Desplegable propio: así la lista puede mostrar la bandera dibujada
          junto al nombre del país, cosa que un <select> nativo no permite. */}
      <div className="shrink-0 border-r-2 border-surface-blue bg-surface-blue">
        <Selector
          valor={pais.codigo}
          onCambio={onCodigoPais}
          etiquetaAria="Código de país"
          embebido
          opciones={PAISES.map((p) => ({
            valor: p.codigo,
            texto: p.nombre,
            resumen: p.codigo,
            meta: p.codigo,
            adorno: <Bandera codigo={p.codigo} />,
          }))}
        />
      </div>
      <input
        {...props}
        type="tel"
        inputMode="numeric"
        className="w-full bg-transparent px-3.5 py-2.5 text-sm text-secondary-navy outline-none placeholder:text-slate-blue/50"
      />
    </div>
  );
}

/* Los desplegables usan `components/ui/Selector.tsx`, no `<select>` nativo:
   así el panel abierto también lleva los colores y la forma del cotizador. */
