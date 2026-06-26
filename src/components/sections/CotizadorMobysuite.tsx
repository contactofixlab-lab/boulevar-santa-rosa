"use client";

import { useEffect } from "react";

export const CotizadorMobysuite = () => {
  useEffect(() => {
    // Inyectar el script de Mobysuite
    const script = document.createElement("script");
    script.src = "https://cotizador.mobysuite.cl/cotizador.js";
    script.setAttribute("data-real-estate", "Boulevard Santa Rosa");
    script.setAttribute("data-project-id", ""); // Placeholder - se completará después
    script.setAttribute("data-container", "mobysuite-cotizador-boulevard");
    script.setAttribute("data-template", "default");
    script.setAttribute("data-country-code", "CL");
    script.setAttribute("data-show-real-estate-logo", "true");
    script.setAttribute("data-real-estate-logo-url", "/Boulevard_horizontal_color.png");
    script.setAttribute("data-show-project-logo", "true");
    script.setAttribute("data-primary-color", "#0671AE");
    script.setAttribute("data-secondary-color", "#84CE25");
    script.setAttribute("data-success-view-type", "simple");
    script.setAttribute("data-hide-selected-assets", "false");
    script.setAttribute("data-use-secondary-image", "false");

    const container = document.getElementById("mobysuite-cotizador-boulevard");
    if (container) {
      container.appendChild(script);
    }

    return () => {
      if (container && script.parentNode === container) {
        container.removeChild(script);
      }
    };
  }, []);

  return (
    <section id="cotizador" className="py-12 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-primary-green font-semibold uppercase text-sm tracking-wide mb-2">
            ENCUENTRA TU ESPACIO IDEAL
          </p>
          <h2 className="text-4xl font-bold text-secondary-navy mb-3">
            Cotiza tu departamento
          </h2>
          <p className="text-slate-blue max-w-2xl mx-auto">
            Explora las tipologías disponibles y solicita tu cotización directamente.
            Nuestros ejecutivos te contactarán en menos de 2 horas.
          </p>
        </div>

        {/* Contenedor del cotizador Mobysuite */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div id="mobysuite-cotizador-boulevard" />
        </div>
      </div>
    </section>
  );
};
