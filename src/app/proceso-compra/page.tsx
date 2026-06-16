"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { pasos } from "@/lib/data/proceso";
import { faqs } from "@/lib/data/faqs";
import { ChevronDown } from "lucide-react";

export default function ProcesoCompraPage() {
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  return (
    <>
      <Header />
      <main className="pt-32">
        {/* Pasos */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <SectionHeading
              subtitle="Conoce"
              titleBlue="El Proceso"
              title="de Compra"
              centered
            />
            <div className="mt-12 space-y-6">
              {pasos.map((paso) => (
                <div key={paso.numero} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary-green text-white rounded-full flex items-center justify-center font-bold text-lg">
                      {paso.numero}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary-blue">{paso.titulo}</h3>
                    <p className="text-slate-blue mt-2">{paso.descripcion}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-surface-light py-20">
          <div className="max-w-3xl mx-auto px-6">
            <SectionHeading
              subtitle="Consultas"
              title="Preguntas Frecuentes"
              centered
            />
            <div className="mt-12 space-y-4">
              {faqs.map((faq) => (
                <div key={faq.id} className="bg-white rounded-lg border border-surface-blue overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                    className="w-full px-6 py-4 flex justify-between items-center hover:bg-surface-light transition"
                  >
                    <span className="font-semibold text-primary-blue text-left">{faq.pregunta}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-primary-green transition-transform ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-6 py-4 bg-surface-light border-t border-surface-blue text-slate-blue">
                      {faq.respuesta}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
