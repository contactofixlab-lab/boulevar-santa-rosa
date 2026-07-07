"use client";

import { useEffect, useRef } from "react";

export const CotizadorMobysuite = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Crear el web component con atributos
    const mobysuite = document.createElement('mobysuite-quote');
    mobysuite.setAttribute('real-estate', 'Boulevard Santa Rosa');
    mobysuite.setAttribute('project-id', '');
    mobysuite.setAttribute('container', 'mobysuite-cotizador-boulevard');
    mobysuite.setAttribute('template', 'default');
    mobysuite.setAttribute('country-code', 'CL');
    mobysuite.setAttribute('show-real-estate-logo', 'true');
    mobysuite.setAttribute('real-estate-logo-url', '/Boulevard_horizontal_color.png');
    mobysuite.setAttribute('show-project-logo', 'true');
    mobysuite.setAttribute('primary-color', '#0671AE');
    mobysuite.setAttribute('secondary-color', '#84CE25');
    mobysuite.setAttribute('success-view-type', 'simple');
    mobysuite.setAttribute('hide-selected-assets', 'false');
    mobysuite.setAttribute('use-secondary-image', 'false');

    // Limpiar contenedor anterior
    containerRef.current.innerHTML = '';

    // Agregar el elemento
    containerRef.current.appendChild(mobysuite);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <section id="cotizador" className="py-12 bg-surface-light">
      <div className="max-w-7xl mx-auto px-6">
        {/* Contenedor del cotizador Mobysuite - Web Component */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div ref={containerRef} id="mobysuite-cotizador-boulevard" />
        </div>
      </div>
    </section>
  );
};
