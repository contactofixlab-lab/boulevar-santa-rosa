"use client";

import { useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  CalendarCheck,
  CheckCircle2,
  Download,
  Loader2,
  RefreshCw,
  RotateCcw,
} from "lucide-react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { assetTypeLabel, formatUF } from "@/cotizador/lib/mobysuite/format";
import { area, superficieTotal, tipoLabel } from "@/cotizador/lib/tipologias";
import type { DatosCliente } from "./FaseDatos";

/** Estado del registro de la cotización en Mobysuite (vive en `Cotizador`). */
export type EstadoCotizacion =
  | { estado: "idle" }
  | { estado: "enviando" }
  | { estado: "listo"; codigo: string | null }
  | { estado: "error"; mensaje: string };

interface FaseResumenProps {
  departamento: MobysuiteAsset;
  extras: MobysuiteAsset[];
  datos: DatosCliente;
  nombreProyecto?: string;
  cotizacion: EstadoCotizacion;
  onCotizar: () => void;
  onAtras: () => void;
  onNuevaCotizacion: () => void;
}

export function FaseResumen({
  departamento,
  extras,
  datos,
  nombreProyecto,
  cotizacion,
  onCotizar,
  onAtras,
  onNuevaCotizacion,
}: FaseResumenProps) {
  const [avisoReserva, setAvisoReserva] = useState(false);
  const total = departamento.listValue + extras.reduce((s, a) => s + a.listValue, 0);
  const nombreCompleto = `${datos.nombre} ${datos.apellidoPaterno} ${datos.apellidoMaterno}`.trim();

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <div id="zona-imprimible">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-secondary-navy">Tu cotización</h3>
            {nombreProyecto && <p className="mt-1 text-sm font-bold text-primary-blue">{nombreProyecto}</p>}
          </div>

          {/* Acciones arriba a la derecha, igual que en las fases anteriores. */}
          <div className="no-print flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAtras}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-surface-blue px-4 py-2.5 text-sm font-semibold text-secondary-navy transition-colors hover:border-primary-blue hover:text-primary-blue"
            >
              <ArrowLeft size={17} />
              Atrás
            </button>
            <button
              type="button"
              onClick={onNuevaCotizacion}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-surface-blue px-4 py-2.5 text-sm font-semibold text-secondary-navy transition-colors hover:border-primary-blue hover:text-primary-blue"
            >
              <RotateCcw size={17} />
              Nueva
            </button>
            {/* Deshabilitado a propósito: el PDF debe ser el de la cotización oficial de
                Mobysuite y todavía no está conectado; no se simula con el resumen en pantalla. */}
            <button
              type="button"
              disabled
              title="Próximamente: PDF de la cotización oficial"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-primary-blue px-4 py-2.5 text-sm font-semibold text-primary-blue disabled:opacity-50"
            >
              <Download size={17} />
              Descargar
            </button>
            <BotonReserva
              cotizacion={cotizacion}
              onReservar={() => setAvisoReserva(true)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-green px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-green-dark disabled:opacity-60"
            />
          </div>
        </div>

        {/* Detalle */}
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-surface-blue text-left text-xs font-bold uppercase tracking-wide text-secondary-navy">
                <th className="px-4 py-2.5">Bien</th>
                <th className="px-4 py-2.5">Detalle</th>
                <th className="px-4 py-2.5 text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="px-4 py-3 font-bold text-secondary-navy">
                  Depto. {departamento.assetNumber}
                </td>
                <td className="px-4 py-3 text-slate-blue">
                  {tipoLabel(departamento.departmentTypology)} · {departamento.numberOfRooms}D +{" "}
                  {departamento.numberOfBathrooms}B · {area(superficieTotal(departamento))} · Piso{" "}
                  {departamento.floor}
                </td>
                <td className="px-4 py-3 text-right font-bold tabular-nums text-secondary-navy">
                  UF {formatUF(departamento.listValue)}
                </td>
              </tr>
              {extras.map((a) => (
                <tr key={a.id}>
                  <td className="px-4 py-3 font-bold text-secondary-navy">
                    {assetTypeLabel(a.assetTypeValue)} N° {a.assetNumber}
                  </td>
                  <td className="px-4 py-3 text-slate-blue">
                    {area(a.totalArea)} · Piso {a.floor}
                  </td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums text-secondary-navy">
                    UF {formatUF(a.listValue)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-surface-blue bg-surface-blue">
                <td className="px-4 py-3 font-bold text-secondary-navy" colSpan={2}>
                  Total
                </td>
                <td className="px-4 py-3 text-right text-lg font-bold tabular-nums text-primary-blue">
                  UF {formatUF(total)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Datos del cliente */}
        <div className="mt-6 rounded-xl border border-gray-200 p-5">
          <h4 className="mb-3 text-sm font-bold text-secondary-navy">Datos de contacto</h4>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            <Dato label="Nombre" value={nombreCompleto} />
            <Dato label="RUT" value={datos.rut} />
            <Dato label="Correo" value={datos.email} />
            <Dato label="Teléfono" value={`${datos.codigoPais} ${datos.telefono}`} />
            <Dato label="Destino de la compra" value={datos.destinoCompra} />
            <Dato label="Rango de renta" value={datos.rangoRenta} />
            <Dato label="Rango de edad" value={datos.rangoEdad} />
          </dl>
        </div>

        <p className="mt-4 text-xs leading-snug text-slate-blue">
          Valores expresados en UF y referenciales; no constituyen una reserva ni una promesa de
          compraventa. Sujetos a disponibilidad al momento de la firma.
        </p>
      </div>

      <AvisoCotizacion cotizacion={cotizacion} email={datos.email} onReintentar={onCotizar} />
      {avisoReserva && cotizacion.estado === "listo" && <AvisoReserva />}
    </section>
  );
}

/**
 * La cotización se registra sola al ver el resumen, así que "Reservar" NO la envía:
 * es la puerta de la reserva con pago en línea (Fintoc), que se conectará cuando haya API,
 * y la reserva quedará registrada en Mobysuite (`POST /booking`). Por ahora solo avisa
 * que viene pronto, sin simular ningún pago ni reserva. Se habilita con la cotización ya registrada.
 */
export function BotonReserva({
  cotizacion,
  onReservar,
  className,
}: {
  cotizacion: EstadoCotizacion;
  onReservar: () => void;
  className: string;
}) {
  return (
    <button type="button" onClick={onReservar} disabled={cotizacion.estado !== "listo"} className={className}>
      <CalendarCheck size={17} />
      Reservar
    </button>
  );
}

/** Aviso transitorio de "Reservar" hasta que exista el pago en línea. */
export function AvisoReserva({ compacto = false }: { compacto?: boolean }) {
  return (
    <div
      role="status"
      className={`no-print mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-primary-blue bg-surface-blue ${
        compacto ? "px-3 py-2.5" : "px-4 py-3"
      }`}
    >
      <CalendarCheck size={compacto ? 18 : 20} className="mt-0.5 shrink-0 text-primary-blue" />
      <div>
        <p className={`font-bold text-secondary-navy ${compacto ? "text-xs" : "text-sm"}`}>
          La reserva en línea estará disponible muy pronto
        </p>
        <p className={`mt-0.5 text-slate-blue ${compacto ? "text-[11px]" : "text-xs"}`}>
          Tu cotización ya quedó registrada y un ejecutivo te contactará para ayudarte con la reserva.
        </p>
      </div>
    </div>
  );
}

/** Resultado del registro: confirmación o error, con el mismo estilo en escritorio y móvil. */
export function AvisoCotizacion({
  cotizacion,
  email,
  onReintentar,
  compacto = false,
}: {
  cotizacion: EstadoCotizacion;
  email: string;
  onReintentar: () => void;
  compacto?: boolean;
}) {
  if (cotizacion.estado === "enviando") {
    return (
      <div
        role="status"
        className={`no-print mt-6 flex items-center gap-3 rounded-r-lg border-l-4 border-primary-blue bg-surface-blue ${
          compacto ? "px-3 py-2.5" : "px-4 py-3"
        }`}
      >
        <Loader2 size={compacto ? 18 : 20} className="shrink-0 animate-spin text-primary-blue" />
        <p className={`font-bold text-secondary-navy ${compacto ? "text-xs" : "text-sm"}`}>
          Registrando tu cotización…
        </p>
      </div>
    );
  }

  if (cotizacion.estado === "listo") {
    return (
      <div
        role="status"
        className={`no-print mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-primary-green bg-surface-green ${
          compacto ? "px-3 py-2.5" : "px-4 py-3"
        }`}
      >
        <CheckCircle2 size={compacto ? 18 : 20} className="mt-0.5 shrink-0 text-primary-green" />
        <div>
          <p className={`font-bold text-secondary-navy ${compacto ? "text-xs" : "text-sm"}`}>
            Cotización registrada{cotizacion.codigo ? ` · N° ${cotizacion.codigo}` : ""}
          </p>
          <p className={`mt-0.5 text-slate-blue ${compacto ? "text-[11px]" : "text-xs"}`}>
            Un ejecutivo te contactará a {email} para continuar el proceso.
          </p>
        </div>
      </div>
    );
  }

  if (cotizacion.estado === "error") {
    return (
      <div
        role="alert"
        className={`no-print mt-6 flex items-start gap-3 rounded-r-lg border-l-4 border-red-400 bg-red-50 ${
          compacto ? "px-3 py-2.5" : "px-4 py-3"
        }`}
      >
        <AlertCircle size={compacto ? 18 : 20} className="mt-0.5 shrink-0 text-red-500" />
        <div>
          <p className={`font-bold text-secondary-navy ${compacto ? "text-xs" : "text-sm"}`}>
            No se pudo registrar tu cotización
          </p>
          <p className={`mt-0.5 text-slate-blue ${compacto ? "text-[11px]" : "text-xs"}`}>
            {cotizacion.mensaje}
          </p>
          <button
            type="button"
            onClick={onReintentar}
            className={`mt-2 inline-flex items-center gap-1.5 rounded-md border-2 border-primary-blue font-semibold text-primary-blue transition-colors hover:bg-surface-blue ${
              compacto ? "px-2.5 py-1 text-[11px]" : "px-3 py-1.5 text-xs"
            }`}
          >
            <RefreshCw size={compacto ? 13 : 14} />
            Reintentar envío
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function Dato({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-1.5">
      <dt className="text-slate-blue">{label}</dt>
      <dd className="text-right font-semibold text-secondary-navy">{value || "—"}</dd>
    </div>
  );
}
