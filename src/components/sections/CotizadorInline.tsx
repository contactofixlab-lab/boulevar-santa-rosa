"use client";

import { CotizadorDetalle } from "@/components/sections/CotizadorDetalle";
import type { Tipologia } from "@/lib/data/tipologias";

interface CotizadorInlineProps {
  tipologias: Tipologia[];
}

export const CotizadorInline = ({ tipologias }: CotizadorInlineProps) => {
  return (
    <section className="py-12 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary-green font-semibold uppercase text-sm tracking-wide mb-2">
            ENCUENTRA TU ESPACIO IDEAL
          </p>
          <h2 className="text-4xl font-bold text-secondary-navy mb-3">
            Cotiza tu departamento
          </h2>
          <p className="text-slate-blue max-w-2xl mx-auto">
            Explora las tipologías disponibles y solicita tu cotización directamente.
            Nuestros ejecutivos te contactarán en menos de 2 horas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <CotizadorDetalle tipologias={tipologias} />
        </div>
      </div>
    </section>
  );
};
