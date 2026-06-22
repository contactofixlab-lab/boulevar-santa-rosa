"use client";

import { useState } from "react";
import { Check, Ruler, X, Plus } from "lucide-react";
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

interface CartItem {
  id: string;
  tipo: string;
  nombre: string;
  precioUF: number;
}

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

  const [cart, setCart] = useState<CartItem[]>([
    {
      id: selectedDeptoId!,
      tipo: "departamento",
      nombre: departamentos.find((t) => t.id === selectedDeptoId)?.nombre || "",
      precioUF: departamentos.find((t) => t.id === selectedDeptoId)?.precioUF || 0,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({ nombre: "", email: "", telefono: "" });
  const [submitted, setSubmitted] = useState(false);

  const selected = departamentos.find((t) => t.id === selectedDeptoId);
  if (!selected) return null;

  const totalPisos = Math.max(TOTAL_PISOS, ...departamentos.map((t) => t.piso || 0));

  const handleSelectDepto = (id: string) => {
    setSelectedDeptoId(id);
    setCart([{ id, tipo: "departamento", nombre: departamentos.find((t) => t.id === id)?.nombre || "", precioUF: departamentos.find((t) => t.id === id)?.precioUF || 0 }]);
  };

  const handleAddToCart = (bien: Tipologia) => {
    if (!cart.some((item) => item.id === bien.id)) {
      setCart([...cart, { id: bien.id, tipo: bien.tipo, nombre: bien.nombre, precioUF: bien.precioUF }]);
    }
  };

  const handleRemoveFromCart = (id: string) => {
    if (id !== selectedDeptoId) {
      setCart(cart.filter((item) => item.id !== id));
    }
  };

  if (showForm) {
    return (
      <div className="bg-white border-2 border-surface-blue rounded-2xl p-6 md:p-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-secondary-navy mb-2">Completa tu cotización</h2>
        <p className="text-sm text-slate-blue mb-6">
          Nos pondremos en contacto en menos de 2 horas para finalizar tu cotización.
        </p>

        {/* Resumen del carrito */}
        <div className="bg-surface-blue rounded-xl p-4 mb-6">
          <h3 className="text-sm font-bold text-primary-blue mb-3">Bienes a cotizar:</h3>
          <div className="space-y-2">
            {cart.map((item) => (
              <p key={item.id} className="text-sm text-secondary-navy">
                {item.nombre} • <span className="font-bold text-primary-green">UF {item.precioUF.toLocaleString()}</span>
              </p>
            ))}
          </div>
        </div>

        {/* Formulario */}
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
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setShowForm(false)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {submitted && (
        <Alert
          variant="success"
          title="¡Cotización enviada!"
          description="Te contactamos en menos de 2 horas."
          className="mb-6"
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-6">
        {/* ── Izquierda: lista de departamentos ── */}
        <div className="bg-white border-2 border-surface-blue rounded-2xl p-4">
          <h3 className="text-sm font-bold text-primary-blue mb-3">Departamentos</h3>
          <div className="space-y-2">
            {departamentos.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelectDepto(t.id)}
                className={`w-full text-left rounded-lg border-2 px-3 py-2 transition-colors text-xs ${
                  t.id === selectedDeptoId
                    ? "border-primary-blue bg-surface-blue"
                    : "border-surface-blue bg-white hover:border-primary-blue/50"
                }`}
              >
                <p className="font-bold text-primary-blue">{t.nombre}</p>
                <p className="text-slate-blue">UF {t.precioUF.toLocaleString()}</p>
              </button>
            ))}
          </div>
        </div>

        {/* ── Centro: detalle del departamento ── */}
        <div className="bg-white border-2 border-surface-blue rounded-2xl p-6">
          <h2 className="text-xl font-bold text-secondary-navy mb-4">Detalle del departamento</h2>

          {/* Plano + Ubicación */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="relative bg-surface-blue rounded-xl p-4 flex items-center justify-center aspect-square">
                <PlanoReferencial className="w-full h-full" />
                <span className="absolute top-2 right-2 bg-primary-blue text-white text-xs font-bold px-2 py-1 rounded-full">
                  Plano
                </span>
              </div>
              <p className="text-xs text-slate-blue mt-1">Imagen referencial</p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-blue uppercase mb-2">Ubicación en edificio</p>
              <div className="flex flex-col gap-1">
                {Array.from({ length: totalPisos }, (_, i) => totalPisos - i).map((piso) => (
                  <div
                    key={piso}
                    className={`h-6 rounded flex items-center justify-center text-xs font-bold transition-all ${
                      piso === selected.piso
                        ? "bg-primary-green text-white"
                        : "bg-surface-blue text-slate-blue"
                    }`}
                  >
                    {piso === selected.piso ? `Piso ${piso} ✓` : piso}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Características */}
          <div className="mb-6">
            <p className="text-xs font-bold text-slate-blue uppercase mb-3">Características</p>
            <div className="grid grid-cols-2 gap-2">
              {selected.m2 && (
                <div className="flex items-center gap-2 text-sm">
                  <Ruler size={14} className="text-primary-blue" />
                  <span className="text-secondary-navy">{selected.m2} m²</span>
                </div>
              )}
              {selected.dormitorios && (
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="dormitorios" size={14} className="text-primary-blue" />
                  <span className="text-secondary-navy">{selected.dormitorios}D</span>
                </div>
              )}
              {selected.banos && (
                <div className="flex items-center gap-2 text-sm">
                  <Icon name="banos" size={14} className="text-primary-blue" />
                  <span className="text-secondary-navy">{selected.banos}B</span>
                </div>
              )}
              <div>
                <StatusBadge status={statusMap[selected.estado]}>
                  {statusLabel[selected.estado]}
                </StatusBadge>
              </div>
            </div>
          </div>

          {/* Equipamiento */}
          <div>
            <p className="text-xs font-bold text-slate-blue uppercase mb-2">Equipamiento</p>
            <ul className="space-y-1">
              {EQUIPAMIENTO.map((item) => (
                <li key={item} className="flex items-start gap-2 text-xs">
                  <Check size={12} className="text-primary-green flex-shrink-0 mt-0.5" />
                  <span className="text-slate-blue">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Derecha: carrito y otros bienes ── */}
        <div className="space-y-4">
          {/* Carrito */}
          <div className="bg-white border-2 border-surface-blue rounded-2xl p-4">
            <h3 className="text-sm font-bold text-primary-blue mb-3">Mi cotización</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between bg-surface-blue p-2 rounded-lg">
                  <div>
                    <p className="text-xs font-bold text-secondary-navy">{item.nombre}</p>
                    <p className="text-xs text-primary-green font-bold">UF {item.precioUF.toLocaleString()}</p>
                  </div>
                  {item.id !== selectedDeptoId && (
                    <button onClick={() => handleRemoveFromCart(item.id)} className="text-slate-blue hover:text-primary-blue">
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <Button variant="secondary" size="sm" className="w-full" onClick={() => setShowForm(true)}>
              Solicitar cotización
            </Button>
          </div>

          {/* Otros bienes */}
          {otrosBienes.length > 0 && (
            <div className="bg-white border-2 border-surface-blue rounded-2xl p-4">
              <h3 className="text-sm font-bold text-primary-blue mb-3">Agregar bienes</h3>
              <div className="space-y-2">
                {otrosBienes.map((bien) => {
                  const inCart = cart.some((item) => item.id === bien.id);
                  return (
                    <button
                      key={bien.id}
                      onClick={() => handleAddToCart(bien)}
                      disabled={inCart}
                      className={`w-full text-left rounded-lg border-2 p-2 text-xs transition-colors flex items-center justify-between ${
                        inCart
                          ? "border-surface-blue bg-surface-green opacity-50 cursor-not-allowed"
                          : "border-surface-blue bg-white hover:border-primary-blue"
                      }`}
                    >
                      <div>
                        <p className="font-bold text-primary-blue">{bien.nombre}</p>
                        <p className="text-slate-blue">UF {bien.precioUF.toLocaleString()}</p>
                      </div>
                      <Plus size={14} className={inCart ? "text-slate-blue" : "text-primary-green"} />
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
