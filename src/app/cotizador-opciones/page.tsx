"use client";

import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function CotizadorOpcionesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-surface-light to-white pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-secondary-navy mb-4">
            3 Opciones de Cotizador
          </h1>
          <p className="text-slate-blue text-lg max-w-2xl mx-auto">
            Explora las diferentes formas de presentar el cotizador en la web
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Opción 1 - Modal */}
          <div className="bg-white border-2 border-primary-blue rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-surface-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-blue">1</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-navy mb-2">Modal Flotante</h2>
              <p className="text-slate-blue text-sm mb-4">
                Cotizador que aparece encima del landing en un modal bloqueante
              </p>
              <div className="bg-surface-blue rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-xs font-semibold text-slate-blue">✓ Carga rápida</p>
                <p className="text-xs font-semibold text-slate-blue">✓ No distrae del landing</p>
                <p className="text-xs font-semibold text-slate-blue">✓ Accesible desde cualquier botón</p>
                <p className="text-xs font-semibold text-slate-blue">✗ Puede cerrar fácilmente</p>
              </div>
            </div>
            <Button
              variant="primary"
              size="md"
              className="w-full"
              onClick={() => {
                // Abre el modal global
                const event = new CustomEvent('openCotizadorModal');
                window.dispatchEvent(event);
              }}
            >
              Ver Opción 1 (Modal)
            </Button>
          </div>

          {/* Opción 2 - Página Dedicada */}
          <div className="bg-white border-2 border-primary-green rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-surface-green rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-primary-green">2</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-navy mb-2">Página Dedicada</h2>
              <p className="text-slate-blue text-sm mb-4">
                Ruta completa dedicada al cotizador sin distracciones
              </p>
              <div className="bg-surface-green rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-xs font-semibold text-slate-blue">✓ Enfoque total</p>
                <p className="text-xs font-semibold text-slate-blue">✓ Mejor para SEO</p>
                <p className="text-xs font-semibold text-slate-blue">✓ Experiencia limpia</p>
                <p className="text-xs font-semibold text-slate-blue">✗ Navega fuera del landing</p>
              </div>
            </div>
            <Link href="/cotizador" className="w-full block">
              <Button variant="primary" size="md" className="w-full">
                Ver Opción 2 (Página)
              </Button>
            </Link>
          </div>

          {/* Opción 3 - Inline en Landing */}
          <div className="bg-white border-2 border-accent-green rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-surface-blue rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-accent-green">3</span>
              </div>
              <h2 className="text-2xl font-bold text-secondary-navy mb-2">Sección en Landing</h2>
              <p className="text-slate-blue text-sm mb-4">
                Cotizador integrado como sección del landing con scroll
              </p>
              <div className="bg-surface-blue rounded-lg p-4 mb-6 text-left space-y-2">
                <p className="text-xs font-semibold text-slate-blue">✓ Siempre visible</p>
                <p className="text-xs font-semibold text-slate-blue">✓ Contexto completo</p>
                <p className="text-xs font-semibold text-slate-blue">✓ Flujo natural</p>
                <p className="text-xs font-semibold text-slate-blue">✗ Más contenido a cargar</p>
              </div>
            </div>
            <Link href="/#cotizador-inline" className="w-full block">
              <Button variant="primary" size="md" className="w-full">
                Ver Opción 3 (Inline)
              </Button>
            </Link>
          </div>
        </div>

        {/* Comparativa */}
        <div className="bg-surface-light rounded-2xl p-8 border-2 border-primary-blue">
          <h3 className="text-2xl font-bold text-secondary-navy mb-6">Comparativa</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-primary-blue">
                  <th className="text-left py-3 px-4 font-bold text-secondary-navy">Característica</th>
                  <th className="text-center py-3 px-4 font-bold text-secondary-navy">Modal</th>
                  <th className="text-center py-3 px-4 font-bold text-secondary-navy">Página</th>
                  <th className="text-center py-3 px-4 font-bold text-secondary-navy">Inline</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-blue">
                  <td className="py-3 px-4 text-slate-blue">Carga inicial</td>
                  <td className="text-center py-3 px-4">⚡ Rápida</td>
                  <td className="text-center py-3 px-4">⚡ Rápida</td>
                  <td className="text-center py-3 px-4">📊 Media</td>
                </tr>
                <tr className="border-b border-surface-blue">
                  <td className="py-3 px-4 text-slate-blue">Conversión potencial</td>
                  <td className="text-center py-3 px-4">📈 Alta</td>
                  <td className="text-center py-3 px-4">📈 Alta</td>
                  <td className="text-center py-3 px-4">📊 Media-Alta</td>
                </tr>
                <tr className="border-b border-surface-blue">
                  <td className="py-3 px-4 text-slate-blue">Distracción al landing</td>
                  <td className="text-center py-3 px-4">✓ Bloquea</td>
                  <td className="text-center py-3 px-4">✓ Navega fuera</td>
                  <td className="text-center py-3 px-4">✗ Sin distracción</td>
                </tr>
                <tr className="border-b border-surface-blue">
                  <td className="py-3 px-4 text-slate-blue">SEO optimizado</td>
                  <td className="text-center py-3 px-4">⭐ Medio</td>
                  <td className="text-center py-3 px-4">⭐⭐ Alto</td>
                  <td className="text-center py-3 px-4">⭐⭐ Alto</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-slate-blue">Experiencia móvil</td>
                  <td className="text-center py-3 px-4">✓ Buena</td>
                  <td className="text-center py-3 px-4">✓ Buena</td>
                  <td className="text-center py-3 px-4">✓ Óptima</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
