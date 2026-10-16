"use client";

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";

export interface Opcion {
  valor: string | number;
  texto: string;
  /** Texto secundario alineado a la derecha (precio, piso, etc.). */
  meta?: string;
  /** Elemento a la izquierda del texto (bandera, ícono). */
  adorno?: ReactNode;
  /** Versión corta para el disparador, si el texto de la lista es más largo. */
  resumen?: string;
  /** Se muestra tachada y no se puede elegir (ej. unidad vendida). */
  deshabilitada?: boolean;
}

interface SelectorProps {
  valor: string | number;
  onCambio: (valor: string) => void;
  opciones: Opcion[];
  marcador?: string;
  error?: boolean;
  /** Variante sin borde propio, para ir dentro de otro campo (ej. el teléfono). */
  embebido?: boolean;
  etiquetaAria?: string;
  className?: string;
}

/**
 * Desplegable propio.
 *
 * El `<select>` nativo no permite estilizar el panel abierto — lo dibuja el
 * sistema operativo — así que la lista se construye acá para que use los
 * colores, el radio y las tipografías del cotizador. Mantiene el
 * comportamiento esperado: teclado (flechas, Enter, Esc, inicio/fin), cierre
 * al hacer clic fuera y roles ARIA de listbox.
 */
export function Selector({
  valor,
  onCambio,
  opciones,
  marcador = "Selecciona…",
  error = false,
  embebido = false,
  etiquetaAria,
  className = "",
}: SelectorProps) {
  const [abierto, setAbierto] = useState(false);
  const [resaltado, setResaltado] = useState(0);
  const contenedor = useRef<HTMLDivElement>(null);
  const lista = useRef<HTMLUListElement>(null);
  const id = useId();

  const seleccionada = opciones.find((o) => String(o.valor) === String(valor));

  useEffect(() => {
    if (!abierto) return;
    const fuera = (e: MouseEvent) => {
      if (!contenedor.current?.contains(e.target as Node)) setAbierto(false);
    };
    document.addEventListener("mousedown", fuera);
    return () => document.removeEventListener("mousedown", fuera);
  }, [abierto]);

  // Al abrir, parte sobre la opción vigente y la deja a la vista.
  useEffect(() => {
    if (!abierto) return;
    const indice = Math.max(0, opciones.findIndex((o) => String(o.valor) === String(valor)));
    setResaltado(indice);
    requestAnimationFrame(() => {
      lista.current?.children[indice]?.scrollIntoView({ block: "nearest" });
    });
  }, [abierto, valor, opciones]);

  const elegir = (opcion: Opcion) => {
    onCambio(String(opcion.valor));
    setAbierto(false);
  };

  const mover = (delta: number) => {
    setResaltado((prev) => {
      const siguiente = Math.min(opciones.length - 1, Math.max(0, prev + delta));
      lista.current?.children[siguiente]?.scrollIntoView({ block: "nearest" });
      return siguiente;
    });
  };

  const teclado = (e: React.KeyboardEvent) => {
    if (!abierto && (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")) {
      e.preventDefault();
      setAbierto(true);
      return;
    }
    if (!abierto) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setAbierto(false);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      mover(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      mover(-1);
    } else if (e.key === "Home") {
      e.preventDefault();
      setResaltado(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setResaltado(opciones.length - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const opcion = opciones[resaltado];
      if (opcion && !opcion.deshabilitada) elegir(opcion);
    }
  };

  const disparador = embebido
    ? "flex items-center gap-2 py-2.5 pl-3 pr-8 text-sm font-semibold text-primary-blue outline-none"
    : `flex w-full items-center gap-2 rounded-lg border-2 bg-white py-2.5 pl-3.5 pr-9 text-left text-sm font-medium transition-colors outline-none ${
        error
          ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-500/10"
          : abierto
            ? "border-primary-blue ring-4 ring-primary-blue/10"
            : "border-surface-blue hover:border-primary-blue/60 focus:border-primary-blue focus:ring-4 focus:ring-primary-blue/10"
      }`;

  return (
    <div ref={contenedor} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        onKeyDown={teclado}
        aria-haspopup="listbox"
        aria-expanded={abierto}
        aria-label={etiquetaAria}
        className={disparador}
      >
        {seleccionada?.adorno}
        <span
          className={`min-w-0 flex-1 truncate ${
            seleccionada ? "text-secondary-navy" : "text-slate-blue/70"
          } ${embebido ? "text-primary-blue" : ""}`}
        >
          {seleccionada ? (seleccionada.resumen ?? seleccionada.texto) : marcador}
        </span>
        <ChevronDown
          size={embebido ? 14 : 17}
          className={`pointer-events-none absolute ${embebido ? "right-2" : "right-3"} text-primary-blue transition-transform ${
            abierto ? "rotate-180" : ""
          }`}
        />
      </button>

      {abierto && (
        <ul
          ref={lista}
          role="listbox"
          id={id}
          className="absolute z-30 mt-1.5 max-h-64 w-full min-w-max overflow-y-auto rounded-xl border-2 border-surface-blue bg-white p-1.5 shadow-[0_12px_32px_rgba(3,61,107,0.14)]"
        >
          {opciones.map((o, i) => {
            const activa = String(o.valor) === String(valor);
            const enfocada = i === resaltado;
            return (
              <li key={o.valor} role="option" aria-selected={activa} aria-disabled={o.deshabilitada}>
                <button
                  type="button"
                  onClick={() => elegir(o)}
                  onMouseEnter={() => setResaltado(i)}
                  disabled={o.deshabilitada}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                    o.deshabilitada
                      ? "cursor-not-allowed text-slate-blue/50 line-through"
                      : activa
                        ? "bg-surface-green font-semibold text-secondary-navy"
                        : enfocada
                          ? "bg-surface-blue text-secondary-navy"
                          : "text-secondary-navy"
                  }`}
                >
                  {o.adorno}
                  <span className="min-w-0 flex-1 truncate">{o.texto}</span>
                  {o.meta && (
                    <span
                      className={`shrink-0 text-xs font-bold ${
                        o.deshabilitada ? "text-slate-blue/50" : "text-primary-blue"
                      }`}
                    >
                      {o.meta}
                    </span>
                  )}
                  {activa && !o.deshabilitada && <Check size={15} className="shrink-0 text-primary-green" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
