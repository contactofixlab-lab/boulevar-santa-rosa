"use client";

import { useEffect } from "react";

export const EncuentraEspacioIdeal = () => {
  useEffect(() => {
    // Inyectar script de Mobysuite cuando el componente monta
    const script = document.createElement("script");
    script.src = "https://cdn.mobysuite.com/quote/js/app.js";
    script.setAttribute("data-real-estate", "inesdesuarez");
    script.setAttribute("data-project-id", "4");
    script.setAttribute("data-container", "mobysuite-cotizador-boulevard");
    script.setAttribute("data-template", "default");
    script.setAttribute("data-country-code", "CL");
    script.setAttribute("data-show-real-estate-logo", "true");
    script.setAttribute("data-show-project-logo", "true");
    script.setAttribute("data-primary-color", "#0671AE");
    script.setAttribute("data-secondary-color", "#84CE25");
    script.setAttribute("data-success-view-type", "simple");
    script.setAttribute("data-hide-selected-assets", "false");
    script.setAttribute("data-use-secondary-image", "false");
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        document.body.removeChild(script);
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

        {/* Cotizador Mobysuite - Se inyecta en el useEffect de este componente */}
        <div className="flex justify-center w-full" style={{ minHeight: "600px" }}>
          <div
            id="mobysuite-cotizador-boulevard"
            style={{ width: "100%", maxWidth: "1200px" }}
          />
        </div>
      </div>
    </section>
  );
};
