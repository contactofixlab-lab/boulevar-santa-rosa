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
  const departamentos = tipologias.filter((t) => t.tipo === "departamento");
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

  // Modal view (referencia Figma)
  return (
    <div className="max-w-4xl mx-auto">
      {submitted && (
        <Alert
          variant="success"
          title="¡Cotización enviada!"
          description="Te contactamos en menos de 2 horas."
          className="mb-6"
        />
      )}

      <div className="bg-white border-2 border-surface-blue rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-primary-blue mb-1">Detalle del departamento</h2>
        <p className="text-sm text-slate-blue mb-6">
          {selected.nombre} • <span className="font-bold">{selected.dormitorios}D + {selected.banos}B</span>
        </p>

        <div className="grid grid-cols-1 md:grid-cols-[350px_1fr] gap-8 mb-8">
          {/* Foto + Plano Izquierda */}
          <div>
            <div className="bg-slate-300 rounded-xl h-80 flex items-center justify-center mb-4 overflow-hidden">
              <PlanoReferencial className="w-full h-full" />
            </div>
            <p className="text-xs text-slate-blue text-center">
              Las imágenes y dimensiones son referenciales y podrían experimentar variaciones durante el desarrollo del proyecto.
            </p>
          </div>

          {/* Info Derecha */}
          <div className="space-y-6">
            {/* Ubicación en el edificio + Floor plan */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-xs font-bold text-slate-blue uppercase tracking-wide mb-3">Ubicación en el edificio</h3>
                <div className="space-y-1">
                  <p className="text-xs text-slate-blue font-semibold">Torre A</p>
                  <p className="text-xs text-slate-blue mb-3">Planta Tipo (Pisos 3 al 6)</p>
                  {/* Floor plan mini */}
                  <div className="bg-surface-blue rounded-lg p-3 mb-2">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-8 rounded ${i === 1 ? "bg-primary-green" : "bg-white border border-primary-blue"}`} />
                      ))}
                    </div>
                  </div>
                  {/* Floor stack */}
                  <div className="flex flex-col gap-1 mt-4">
                    <p className="text-xs font-semibold text-slate-blue mb-2">Asimiles</p>
                    {Array.from({ length: totalPisos }, (_, i) => totalPisos - i).map((piso) => (
                      <div
                        key={piso}
                        className={`h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                          piso === selected.piso
                            ? "bg-primary-green text-white"
                            : "bg-surface-blue text-slate-blue"
                        }`}
                      >
                        {piso === selected.piso && "← 305"}
                        {!selected.piso || piso !== selected.piso ? piso : ""}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Características */}
              <div>
                <h3 className="text-xs font-bold text-slate-blue uppercase tracking-wide mb-3">Características</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf size={18} className="text-primary-green" />
                      <span className="text-xs text-secondary-navy">Superficie útil</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-navy">{selected.m2} m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf size={18} className="text-primary-green" />
                      <span className="text-xs text-secondary-navy">Terraza</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-navy">4,20 m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf size={18} className="text-primary-green" />
                      <span className="text-xs text-secondary-navy">Superficie total</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-navy">49,51 m²</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="dormitorios" size={18} className="text-primary-green" />
                      <span className="text-xs text-secondary-navy">Orientación</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-navy">Norponiente</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Icon name="dormitorios" size={18} className="text-primary-green" />
                      <span className="text-xs text-secondary-navy">Piso</span>
                    </div>
                    <span className="text-sm font-bold text-secondary-navy">{selected.piso}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-secondary-navy">Estado</span>
                    <StatusBadge status={statusMap[selected.estado]}>
                      {statusLabel[selected.estado]}
                    </StatusBadge>
                  </div>
                </div>
              </div>
            </div>

            {/* Equipamiento y terminaciones */}
            <div>
              <h3 className="text-xs font-bold text-slate-blue uppercase tracking-wide mb-3">Equipamiento y terminaciones</h3>
              <ul className="space-y-2">
                {EQUIPAMIENTO.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check size={16} className="text-primary-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-secondary-navy">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Botones */}
        <div className="flex items-center gap-3 pt-6 border-t border-surface-blue">
          <Button variant="outline" size="md" disabled title="Ficha disponible próximamente" className="opacity-50 cursor-not-allowed">
            Descargar ficha
          </Button>
          <Button variant="secondary" size="md" onClick={() => setShowForm(true)}>
            Solicitar cotización
          </Button>
          <p className="text-xs text-slate-blue ml-auto">Asesoría personalizada con nuestros ejecutivos</p>
        </div>
      </div>
    </div>
  );
};
