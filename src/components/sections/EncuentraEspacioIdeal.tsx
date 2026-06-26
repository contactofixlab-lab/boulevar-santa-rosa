"use client";

import { useEffect } from "react";

export const EncuentraEspacioIdeal = () => {
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B]">
            Encuentra tu{" "}
            <span className="text-[#0671AE]">espacio ideal</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-3" />
        </div>

        {/* Cotizador Mobysuite */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div id="mobysuite-cotizador-boulevard" />
        </div>
      </div>
    </section>
  );
};
