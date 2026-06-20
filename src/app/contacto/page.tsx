"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("¡Gracias por tu mensaje! Nos contactaremos pronto.");
      setLoading(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <>
      <Header />
      <main className="pt-32">
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Ponte en Contacto"
              titleBlue="Conversemos"
              title="Contigo"
              centered
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
              {/* Contacto info */}
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-primary-blue">Información de Contacto</h3>

                <div className="flex gap-4">
                  <Icon name="telefono" size={24} className="text-primary-green flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-blue">Teléfono</p>
                    <a href="tel:+56973301234" className="text-slate-blue hover:text-primary-blue">
                      +56 9 7330 1234
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Icon name="correo" size={24} className="text-primary-green flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-blue">Email</p>
                    <a href="mailto:ventas@boulevardsantarosa.cl" className="text-slate-blue hover:text-primary-blue">
                      ventas@boulevardsantarosa.cl
                    </a>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Icon name="direccion" size={24} className="text-primary-green flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="font-semibold text-primary-blue">Ubicación</p>
                    <p className="text-slate-blue">San Miguel, Santiago</p>
                    <p className="text-sm text-slate-blue mt-1">Oficina: Lunes a viernes 9:30-19:30</p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  className="w-full px-4 py-3 border border-surface-blue rounded-lg focus:outline-none focus:border-primary-blue"
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  required
                  className="w-full px-4 py-3 border border-surface-blue rounded-lg focus:outline-none focus:border-primary-blue"
                />
                <input
                  type="tel"
                  placeholder="Tu teléfono"
                  className="w-full px-4 py-3 border border-surface-blue rounded-lg focus:outline-none focus:border-primary-blue"
                />
                <textarea
                  placeholder="Tu mensaje"
                  rows={4}
                  required
                  className="w-full px-4 py-3 border border-surface-blue rounded-lg focus:outline-none focus:border-primary-blue"
                ></textarea>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? "Enviando..." : "Enviar Mensaje"}
                </Button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
