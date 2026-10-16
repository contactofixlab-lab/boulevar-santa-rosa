import { Check } from "lucide-react";

export const PASOS = ["Departamento", "Extras", "Tus datos", "Cotización"] as const;

export function PasosCotizador({ fase }: { fase: number }) {
  return (
    <ol className="no-print flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
      {PASOS.map((label, i) => {
        const numero = i + 1;
        const completado = numero < fase;
        const activo = numero === fase;
        return (
          <li key={label} className="flex items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                completado
                  ? "bg-primary-green text-white"
                  : activo
                    ? "bg-secondary-navy text-white"
                    : "border-2 border-gray-200 bg-white text-slate-blue"
              }`}
            >
              {completado ? <Check size={14} /> : numero}
            </span>
            <span
              className={`text-xs font-semibold ${
                activo ? "text-secondary-navy" : "text-slate-blue"
              }`}
            >
              {label}
            </span>
            {i < PASOS.length - 1 && <span className="ml-1 h-px w-6 bg-gray-200 sm:w-10" />}
          </li>
        );
      })}
    </ol>
  );
}
