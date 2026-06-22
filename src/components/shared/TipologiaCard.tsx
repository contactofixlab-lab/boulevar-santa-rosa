"use client";

import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/Button";
import { cotizadorDialogHandle } from "@/lib/cotizadorDialog";
import type { Tipologia } from "@/lib/data/tipologias";

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

interface TipologiaCardProps {
  tipologia: Tipologia;
}

export const TipologiaCard = ({ tipologia: t }: TipologiaCardProps) => {
  return (
    <div className="bg-white border-2 border-surface-blue rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-primary-blue">{t.nombre}</h3>
          {t.m2 && <p className="text-sm text-slate-blue mt-1">{t.m2}m²</p>}
        </div>
        <StatusBadge status={statusMap[t.estado]}>
          {statusLabel[t.estado]}
        </StatusBadge>
      </div>

      <div className="mb-4 py-2 border-t border-b border-surface-blue">
        <p className="text-2xl font-bold text-primary-green">
          UF {t.precioUF.toLocaleString()}
        </p>
        {t.precioCLP && (
          <p className="text-xs text-slate-blue mt-1">
            ${(t.precioCLP / 1000000).toFixed(1)}M CLP
          </p>
        )}
      </div>

      {t.dormitorios && (
        <p className="text-sm text-slate-blue mb-4">
          {t.dormitorios}D · {t.banos}B {t.piso && `· Piso ${t.piso}`}
        </p>
      )}

      <Button
        variant="primary"
        size="md"
        className="w-full"
        onClick={() => cotizadorDialogHandle.openWithPayload(t.id)}
      >
        Ver Detalles
      </Button>
    </div>
  );
};
