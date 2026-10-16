"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { assetTypeLabel, formatUF } from "@/cotizador/lib/mobysuite/format";
import { area, superficieTotal, tipoLabel } from "@/cotizador/lib/tipologias";
import type { DatosCliente } from "@/cotizador/components/sections/FaseDatos";
import {
  AvisoCotizacion,
  AvisoReserva,
  BotonDescargar,
  BotonReserva,
  type EstadoCotizacion,
} from "@/cotizador/components/sections/FaseResumen";
import { Desplegable } from "./piezas";

interface Props {
  departamento: MobysuiteAsset;
  extras: MobysuiteAsset[];
  datos: DatosCliente;
  nombreProyecto?: string;
  cotizacion: EstadoCotizacion;
  onCotizar: () => void;
  onNuevaCotizacion: () => void;
}

export function FaseResumenMobile({
  departamento,
  extras,
  datos,
  nombreProyecto,
  cotizacion,
  onCotizar,
  onNuevaCotizacion,
}: Props) {
  const [avisoReserva, setAvisoReserva] = useState(false);
  const total = departamento.listValue + extras.reduce((s, a) => s + a.listValue, 0);
  const nombreCompleto = `${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`.trim();

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm">
      <h3 className="text-lg font-bold text-secondary-navy">Tu cotización</h3>
      {nombreProyecto && <p className="text-xs font-bold text-primary-blue">{nombreProyecto}</p>}

      {/* En móvil la tabla se convierte en tarjetas: nada de scroll horizontal */}
      <div className="mt-4 flex flex-col gap-2">
        <Bien
          titulo={`Depto. ${departamento.assetNumber}`}
          detalle={`${tipoLabel(departamento.departmentTypology)} · ${departamento.numberOfRooms}D + ${departamento.numberOfBathrooms}B · ${area(superficieTotal(departamento))} · Piso ${departamento.floor}`}
          valor={departamento.listValue}
        />
        {extras.map((a) => (
          <Bien
            key={a.id}
            titulo={`${assetTypeLabel(a.assetTypeValue)} N° ${a.assetNumber}`}
            detalle={`${area(a.totalArea)} · Piso ${a.floor}`}
            valor={a.listValue}
          />
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between rounded-xl bg-surface-blue px-4 py-3">
        <span className="text-sm font-bold text-secondary-navy">Total</span>
        <span className="text-lg font-bold tabular-nums text-primary-blue">UF {formatUF(total)}</span>
      </div>

      <div className="mt-4">
        <Desplegable titulo="Datos de contacto" resumen={nombreCompleto.split(" ")[0]}>
          <dl className="flex flex-col gap-1.5 text-[13px]">
            <Dato label="Nombre" value={nombreCompleto} />
            <Dato label="RUT" value={datos.rut} />
            <Dato label="Correo" value={datos.email} />
            <Dato label="Teléfono" value={`${datos.codigoPais} ${datos.telefono}`} />
            <Dato label="Destino" value={datos.destinoCompra} />
            <Dato label="Renta" value={datos.rangoRenta} />
            <Dato label="Edad" value={datos.rangoEdad} />
          </dl>
        </Desplegable>
      </div>

      <p className="mt-3 text-[11px] leading-snug text-slate-blue">
        Valores expresados en UF y referenciales; no constituyen una reserva ni una promesa de
        compraventa.
      </p>

      <AvisoCotizacion cotizacion={cotizacion} email={datos.email} onReintentar={onCotizar} compacto />
      {avisoReserva && cotizacion.estado === "listo" && <AvisoReserva compacto />}

      {/* Acciones a ancho completo: el pulgar llega a todas */}
      <div className="mt-5 flex flex-col gap-2">
        <BotonReserva
          cotizacion={cotizacion}
          onReservar={() => setAvisoReserva(true)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-green py-3 text-sm font-semibold text-white transition-colors hover:bg-secondary-green-dark disabled:opacity-60"
        />
        <BotonDescargar
          cotizacion={cotizacion}
          texto="Descargar cotización"
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-blue py-3 text-sm font-semibold text-primary-blue"
        />
        <button
          type="button"
          onClick={onNuevaCotizacion}
          className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-200 py-3 text-sm font-semibold text-secondary-navy"
        >
          <RotateCcw size={17} />
          Nueva cotización
        </button>
      </div>
    </section>
  );
}

function Bien({ titulo, detalle, valor }: { titulo: string; detalle: string; valor: number }) {
  return (
    <div className="rounded-xl border border-gray-200 px-3 py-2.5">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-bold text-secondary-navy">{titulo}</p>
        <p className="shrink-0 text-sm font-bold tabular-nums text-secondary-navy">
          UF {formatUF(valor)}
        </p>
      </div>
      <p className="mt-0.5 text-[11px] leading-snug text-slate-blue">{detalle}</p>
    </div>
  );
}

function Dato({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-gray-100 pb-1">
      <dt className="shrink-0 text-slate-blue">{label}</dt>
      <dd className="text-right font-semibold text-secondary-navy">{value || "—"}</dd>
    </div>
  );
}
