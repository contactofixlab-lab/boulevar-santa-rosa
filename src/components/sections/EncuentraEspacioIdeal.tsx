"use client";

import { useEffect, useRef } from "react";

export const EncuentraEspacioIdeal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mobysuite = document.createElement("mobysuite-quote");
    mobysuite.setAttribute("version", "2");
    mobysuite.setAttribute("real-estate", "inesdesuarez");
    mobysuite.setAttribute("project-id", "4");
    mobysuite.setAttribute("container", "mobysuite-cotizador-boulevard");
    mobysuite.setAttribute("template", "default");
    mobysuite.setAttribute("country-code", "CL");
    mobysuite.setAttribute("show-real-estate-logo", "true");
    mobysuite.setAttribute("show-project-logo", "true");
    mobysuite.setAttribute("success-view-type", "simple");
    mobysuite.setAttribute("hide-selected-assets", "false");
    mobysuite.setAttribute("hide-project-data", "true");
    mobysuite.setAttribute("use-secondary-image", "false");

    containerRef.current.appendChild(mobysuite);

    // Inyectar colores DESPUÉS de montaje
    setTimeout(() => {
      try {
        // Intento 1: Propiedades JavaScript (camelCase)
        (mobysuite as any).primaryColor = "#0671AE";
        (mobysuite as any).secondaryColor = "#84CE25";

        // Intento 2: Si es un método setConfig
        if (typeof (mobysuite as any).setConfig === "function") {
          (mobysuite as any).setConfig({
            primaryColor: "#0671AE",
            secondaryColor: "#84CE25",
          });
        }

        // Intento 3: Dataset attributes
        mobysuite.setAttribute("data-primary-color", "#0671AE");
        mobysuite.setAttribute("data-secondary-color", "#84CE25");
      } catch (e) {
        console.warn("Mobysuite API no disponible en tiempo de espera");
      }
    }, 500);

    return () => {
      if (containerRef.current && mobysuite.parentNode === containerRef.current) {
        containerRef.current.removeChild(mobysuite);
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

        {/* Cotizador Mobysuite - Web Component */}
        <div className="flex justify-center w-full" style={{ minHeight: "600px" }}>
          <div
            ref={containerRef}
            style={{ width: "100%", maxWidth: "1200px" }}
          />
        </div>
      </div>
    </section>
  );
};
