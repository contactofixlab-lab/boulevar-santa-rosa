"use client";

import { useState } from "react";
import { Check, Ruler } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Alert } from "@/components/shared/Alert";
import { PlanoReferencial } from "@/components/shared/PlanoReferencial";
import { Icon } from "@/components/ui/Icon";
import type { Tipologia } from "@/lib/data/tipologias";

const TOTAL_PISOS = 6;

const EQUIPAMIENTO = [
  "Cocina equipada con muebles y cubierta",
  "Baño completo con cerámicas",
  "Ventanas termopanel doble acristalamiento",
  "Preinstalación de aire acondicionado",
  "Terminaciones de primer nivel",
];

const statusMap = {
  disponible: "available" as const,
  presale: "presale" as const,
  vendido: "sold" as const,
};

const statusLabel = {
  disponible: "Disponible",
  presale: "Pre-venta",
  vendido: "Vendido",
};

interface CotizadorDetalleProps {
  tipologias: Tipologia[];
}

export const CotizadorDetalle = ({ tipologias }: CotizadorDetalleProps) => {
  const departamentos = tipologias.filter((t) => t.tipo === "departamento");
  const [selectedId, setSelectedId] = useState(
    departamentos.find((t) => t.destacado)?.id || departamentos[0]?.id
  );
  const [submitted, setSubmitted] = useState(false);

  const selected = departamentos.find((t) => t.id === selectedId);
  if (!selected) return null;

  const totalPisos = Math.max(TOTAL_PISOS, ...departamentos.map((t) => t.piso || 0));

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setSubmitted(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 max-w-5xl mx-auto">
      {/* ── Izquierda: lista de tipologías disponibles ── */}
      <div>
        <h3 className="text-lg font-bold text-primary-blue mb-1">Tipologías disponibles</h3>
        <p className="text-xs text-slate-blue mb-4">
          Elige el espacio que más se ajusta a lo que buscas.
        </p>
        <div className="space-y-3">
          {departamentos.map((t) => (
            <button
              key={t.id}
              onClick={() => handleSelect(t.id)}
              className={`w-full text-left rounded-xl border-2 px-4 py-3 transition-colors ${
                t.id === selectedId
                  ? "border-primary-blue bg-surface-blue"
                  : "border-surface-blue bg-white hover:border-primary-blue/50"
              }`}
            >
              <p className="font-bold text-primary-blue text-sm">{t.nombre}</p>
              <p className="text-xs text-slate-blue mt-0.5">
                Desde <span className="font-semibold text-secondary-navy">UF {t.precioUF.toLocaleString()}</span>
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ── Derecha: detalle del departamento seleccionado ── */}
      <div className="bg-white border-2 border-surface-blue rounded-2xl p-6 md:p-8">
        <h3 className="text-xl font-bold text-secondary-navy mb-6">Detalle del departamento</h3>

        {submitted && (
          <Alert
            variant="success"
            title="¡Cotización enviada!"
            description="Te contactamos en menos de 2 horas."
            className="mb-6"
          />
        )}
        {!submitted && selected.estado === "presale" && (
          <Alert
            variant="info"
            title="Pre-venta activa"
            description="Precio de lanzamiento disponible."
            className="mb-6"
          />
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Plano */}
          <div>
            <div className="relative bg-surface-blue rounded-xl p-6 flex items-center justify-center aspect-square">
              <PlanoReferencial className="w-full h-full" />
              <span className="absolute top-3 right-3 bg-primary-blue text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                Referencial
              </span>
            </div>
            <p className="text-xs text-slate-blue mt-2">
              Imagen referencial, puede no coincidir con el departamento final.
            </p>
          </div>

          {/* Info */}
          <div>
            {/* Ubicación en el edificio */}
            <p className="text-xs font-semibold text-slate-blue uppercase tracking-wide mb-2">
              Ubicación en el edificio
            </p>
            <div className="flex items-end gap-1.5 mb-6">
              {Array.from({ length: totalPisos }, (_, i) => totalPisos - i).map((piso) => (
                <div
                  key={piso}
                  className={`flex-1 h-6 rounded flex items-center justify-center text-[10px] font-bold ${
                    piso === selected.piso
                      ? "bg-primary-green text-white"
                      : "bg-surface-blue text-slate-blue"
                  }`}
                  title={`Piso ${piso}`}
                >
                  {piso === selected.piso ? selected.piso : ""}
                </div>
              ))}
            </div>

            {/* Características */}
            <p className="text-xs font-semibold text-slate-blue uppercase tracking-wide mb-2">
              Características
            </p>
            <div className="grid grid-cols-2 gap-3 mb-6">
              {selected.m2 && (
                <div className="flex items-center gap-2">
                  <Ruler size={16} className="text-primary-blue flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-secondary-navy">{selected.m2} m² útiles</span>
                </div>
              )}
              {selected.dormitorios && (
                <div className="flex items-center gap-2">
                  <Icon name="dormitorios" size={16} className="text-primary-blue flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-secondary-navy">{selected.dormitorios} Dormitorios</span>
                </div>
              )}
              {selected.banos && (
                <div className="flex items-center gap-2">
                  <Icon name="banos" size={16} className="text-primary-blue flex-shrink-0" aria-hidden="true" />
                  <span className="text-sm text-secondary-navy">{selected.banos} Baños</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <StatusBadge status={statusMap[selected.estado]}>
                  {statusLabel[selected.estado]}
                </StatusBadge>
              </div>
            </div>

            {/* Equipamiento */}
            <p className="text-xs font-semibold text-slate-blue uppercase tracking-wide mb-2">
              Equipamiento y terminaciones
            </p>
            <ul className="space-y-1.5 mb-6">
              {EQUIPAMIENTO.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <Check size={14} className="text-primary-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="text-xs text-slate-blue">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-2 pt-6 border-t border-surface-blue">
          <Button
            variant="outline"
            size="sm"
            disabled
            title="Ficha disponible próximamente"
            className="opacity-50 cursor-not-allowed"
          >
            Descargar ficha
          </Button>
          <Button variant="secondary" size="sm" onClick={() => setSubmitted(true)}>
            Solicitar cotización
          </Button>
          <p className="text-xs text-slate-blue ml-auto">
            Asesoría personalizada con nuestros ejecutivos
          </p>
        </div>
      </div>
    </div>
  );
};
