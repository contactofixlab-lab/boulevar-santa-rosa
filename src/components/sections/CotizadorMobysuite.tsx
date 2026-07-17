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
    mobysuite.setAttribute('show-real-estate-logo', 'false');
    mobysuite.setAttribute('show-project-logo', 'false');
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
    <section id="cotizador" className="py-4 bg-surface-light">
      <div className="max-w-3xl mx-auto px-6">
        {/* Contenedor del cotizador Mobysuite - Web Component */}
        <div className="bg-white rounded-2xl shadow-lg p-2 md:p-3">
          <div
            ref={containerRef}
            id="mobysuite-cotizador-boulevard"
            style={{
              '--mobysuite-logo-display': 'none',
            } as React.CSSProperties}
          />
          <style>{`
            #mobysuite-cotizador-boulevard * {
              box-sizing: border-box;
            }

            /* Ocultar cualquier elemento que contenga "logo" en el atributo */
            #mobysuite-cotizador-boulevard [class*="logo"],
            #mobysuite-cotizador-boulevard [class*="Logo"],
            #mobysuite-cotizador-boulevard [id*="logo"],
            #mobysuite-cotizador-boulevard [id*="Logo"],
            #mobysuite-cotizador-boulevard img[src*="logo"],
            #mobysuite-cotizador-boulevard img[src*="Logo"],
            #mobysuite-cotizador-boulevard img[alt*="logo"],
            #mobysuite-cotizador-boulevard img[alt*="Logo"],
            #mobysuite-cotizador-boulevard svg[class*="logo"],
            #mobysuite-cotizador-boulevard svg[id*="logo"],
            #mobysuite-cotizador-boulevard header,
            #mobysuite-cotizador-boulevard .header,
            #mobysuite-cotizador-boulevard [role="banner"] {
              display: none !important;
              visibility: hidden !important;
              height: 0 !important;
              width: 0 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
};
