"use client";

import { useState } from "react";
import { Check, X, Leaf } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Alert } from "@/components/shared/Alert";
import { PlanoReferencial } from "@/components/shared/PlanoReferencial";
import { Icon } from "@/components/ui/Icon";
import type { Tipologia } from "@/lib/data/tipologias";

const TOTAL_PISOS = 7;

const EQUIPAMIENTO = [
  "Cocina equipada con horno, encimera y campana",
  "Dormitorios con closet",
  "Dormitorio principal en suite",
  "Buena iluminación natural",
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

interface ContactForm {
  nombre: string;
  email: string;
  telefono: string;
}

interface CotizadorDetalleProps {
  tipologias: Tipologia[];
  initialSelectedId?: string;
}

export const CotizadorDetalle = ({ tipologias, initialSelectedId }: CotizadorDetalleProps) => {
  // Filtrar solo departamentos disponibles
  const departamentos = tipologias
    .filter((t) => t.tipo === "departamento" && t.estado === "disponible")
    .sort((a, b) => (b.destacado ? 1 : 0) - (a.destacado ? 1 : 0));
  const otrosBienes = tipologias.filter((t) => t.tipo !== "departamento");

  const [selectedDeptoId, setSelectedDeptoId] = useState(
    (initialSelectedId && departamentos.some((t) => t.id === initialSelectedId) ? initialSelectedId : undefined) ||
      departamentos.find((t) => t.destacado)?.id ||
      departamentos[0]?.id
  );

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({ nombre: "", email: "", telefono: "" });
  const [submitted, setSubmitted] = useState(false);

  const selected = departamentos.find((t) => t.id === selectedDeptoId);
  if (!selected) return null;

  const totalPisos = Math.max(TOTAL_PISOS, ...departamentos.map((t) => t.piso || 0));

  // Formulario view
  if (showForm) {
    return (
      <div className="bg-white border-2 border-surface-blue rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-navy mb-2">Completa tu cotización</h2>
        <p className="text-sm text-slate-blue mb-6">
          Nos pondremos en contacto en menos de 2 horas para finalizar tu cotización.
        </p>

        <div className="bg-surface-blue rounded-xl p-4 mb-6">
          <h3 className="text-sm font-bold text-primary-blue mb-3">Bien a cotizar:</h3>
          <p className="text-sm text-secondary-navy">
            {selected.nombre} • <span className="font-bold text-primary-green">UF {selected.precioUF.toLocaleString()}</span>
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (formData.nombre && formData.email && formData.telefono) {
              setSubmitted(true);
              setShowForm(false);
            }
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-secondary-navy mb-1">Nombre completo *</label>
            <input
              type="text"
              required
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full px-4 py-2 border-2 border-surface-blue rounded-lg focus:border-primary-blue focus:outline-none"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-navy mb-1">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border-2 border-surface-blue rounded-lg focus:border-primary-blue focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary-navy mb-1">Teléfono *</label>
            <input
              type="tel"
              required
              value={formData.telefono}
              onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
              className="w-full px-4 py-2 border-2 border-surface-blue rounded-lg focus:border-primary-blue focus:outline-none"
              placeholder="+56 9 ..."
            />
          </div>

          <div className="flex gap-3 mt-6">
            <Button type="submit" variant="secondary" size="md">
              Enviar cotización
            </Button>
            <Button type="button" variant="outline" size="md" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  // Modal view - Layout 3 columnas (Figma reference)
  return (
    <div>
      {submitted && (
        <Alert
          variant="success"
          title="¡Cotización enviada!"
          description="Te contactamos en menos de 2 horas."
          className="mb-6"
        />
      )}

      <div className="border-2 border-surface-blue rounded-2xl p-8">
        {/* Selector de departamentos */}
        {departamentos.length > 1 && (
          <div className="mb-8">
            <label className="block text-xs font-bold text-slate-blue uppercase tracking-wide mb-3">Selecciona un departamento</label>
            <select
              value={selectedDeptoId || ""}
              onChange={(e) => setSelectedDeptoId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-surface-blue rounded-lg focus:border-primary-blue focus:outline-none bg-white text-secondary-navy font-semibold"
            >
              {departamentos.map((depto) => (
                <option key={depto.id} value={depto.id}>
                  {depto.nombre} • {depto.dormitorios}D+{depto.banos}B • UF {depto.precioUF.toLocaleString()}
                </option>
              ))}
            </select>
            <div className="border-b border-surface-blue mt-6 mb-6" />
          </div>
        )}

        <h2 className="text-2xl font-bold text-primary-blue mb-1">Detalle del departamento</h2>
        <p className="text-sm text-slate-blue mb-6">
          {selected.nombre} • <span className="font-bold">{selected.dormitorios}D + {selected.banos}B</span>
        </p>

        {/* Grid 3 columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_300px_1fr] gap-8 mb-8">

          {/* ══════════════════════════════════════════ */}
          {/* COLUMNA 1: FOTO DEL DEPARTAMENTO (Solitaria) */}
          {/* ══════════════════════════════════════════ */}
          <div className="space-y-3">
            <div className="bg-slate-300 rounded-xl h-96 flex items-center justify-center overflow-hidden border-2 border-primary-blue">
              <PlanoReferencial className="w-full h-full" />
            </div>
            <p className="text-xs text-slate-blue text-center leading-tight">
              Las imágenes y dimensiones son referenciales y podrían experimentar variaciones durante el desarrollo del proyecto.
            </p>
          </div>

          {/* ══════════════════════════════════════════ */}
          {/* COLUMNA 2: UBICACIÓN EN EL EDIFICIO */}
          {/* ══════════════════════════════════════════ */}
          <div className="space-y-4">
            <div>
              <h3 className="text-xs font-bold text-slate-blue uppercase tracking-wide mb-2">Ubicación en el edificio</h3>
              <p className="text-sm font-semibold text-secondary-navy mb-1">Torre A</p>
              <p className="text-xs text-slate-blue mb-4">Planta Tipo (Pisos 3 al 6)</p>
            </div>

            {/* Floor plan 2D del piso - PLACEHOLDER PARA IMAGEN */}
            <div>
              <p className="text-xs font-semibold text-slate-blue mb-2">Planta del piso</p>
              <div className="bg-slate-200 rounded-lg h-32 flex items-center justify-center border-2 border-dashed border-primary-blue">
                <p className="text-xs text-slate-blue text-center">Imagen del floor plan del piso</p>
              </div>
            </div>

            {/* Edificio en altura - PLACEHOLDER PARA IMAGEN con flecha */}
            <div>
              <p className="text-xs font-semibold text-slate-blue mb-2">Edificio en altura</p>
              <div className="bg-slate-200 rounded-lg p-3 h-48 flex flex-col items-center justify-center border-2 border-dashed border-primary-blue relative">
                {/* Flecha visual apuntando al piso */}
                <div className="absolute left-0 flex items-center gap-1">
                  {Array.from({ length: totalPisos }, (_, i) => totalPisos - i).map((piso) => (
                    <div key={piso} className="flex items-center gap-1">
                      {piso === selected.piso && (
                        <div className="text-primary-green font-bold text-xl animate-pulse">➜</div>
                      )}
                      <div
                        className={`w-8 h-6 rounded flex items-center justify-center text-[9px] font-bold border ${
                          piso === selected.piso
                            ? "bg-primary-green text-white border-primary-green"
                            : "bg-white text-slate-blue border-primary-blue"
                        }`}
                      >
                        {piso}
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-slate-blue">Imagen del edificio (altura)</p>
              </div>
            </div>
          </div>

          {/* ══════════════════════════════════════════ */}
          {/* COLUMNA 3: CARACTERÍSTICAS + EQUIPAMIENTO */}
          {/* ══════════════════════════════════════════ */}
          <div className="space-y-6">

            {/* RECUADRO: Características */}
            <div className="bg-surface-blue border-2 border-primary-blue rounded-xl p-5">
              <h3 className="text-xs font-bold text-primary-blue uppercase tracking-wide mb-4">Características</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-navy">Superficie útil</span>
                  <span className="text-sm font-bold text-primary-green">{selected.m2} m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-navy">Terraza</span>
                  <span className="text-sm font-bold text-primary-green">4,20 m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-navy">Superficie total</span>
                  <span className="text-sm font-bold text-primary-green">49,51 m²</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-navy">Orientación</span>
                  <span className="text-sm font-bold text-secondary-navy">Norponiente</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-secondary-navy">Piso</span>
                  <span className="text-sm font-bold text-secondary-navy">{selected.piso}</span>
                </div>
                <div className="flex items-center justify-between border-t pt-3">
                  <span className="text-sm text-secondary-navy">Estado</span>
                  <StatusBadge status={statusMap[selected.estado]}>
                    {statusLabel[selected.estado]}
                  </StatusBadge>
                </div>
              </div>
            </div>

            {/* RECUADRO: Equipamiento y terminaciones */}
            <div className="bg-surface-green border-2 border-primary-green rounded-xl p-5">
              <h3 className="text-xs font-bold text-primary-blue uppercase tracking-wide mb-4">Equipamiento y terminaciones</h3>
              <ul className="space-y-2">
                {EQUIPAMIENTO.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={14} className="text-primary-green flex-shrink-0 mt-0.5 font-bold" />
                    <span className="text-sm text-secondary-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Botones */}
            <div className="pt-4 border-t border-surface-blue">
              <div className="flex gap-3 mb-3">
                <Button variant="outline" size="md" disabled title="Ficha disponible próximamente" className="flex-1 opacity-50 cursor-not-allowed">
                  Descargar ficha
                </Button>
                <Button variant="secondary" size="md" className="flex-1" onClick={() => setShowForm(true)}>
                  Solicitar cotización
                </Button>
              </div>
              <p className="text-xs text-slate-blue text-center">Asesoría personalizada con nuestros ejecutivos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
