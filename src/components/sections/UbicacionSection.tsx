"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { SlideInSection } from "@/components/ui/SlideInSection";

const bullets = [
  { iconName: "metro",        text: "Metro Línea 2 operativa por Gran Avenida" },
  { iconName: "metro",        text: "Línea 9 proyectada por Av. Santa Rosa" },
  { iconName: "autopista",    text: "Conexión a Av. Departamental y Ruta 5" },
  { iconName: "supermercados", text: "Servicios, salud, educación y comercio en el entorno" },
];

const pois = [
  { iconName: "supermercados",   label: "Supermercados" },
  { iconName: "colegios",        label: "Educación" },
  { iconName: "centros-medicos", label: "Salud" },
  { iconName: "mercado",         label: "Comercio" },
];

export const UbicacionSection = () => {
  return (
    <section id="ubicacion" className="relative py-12 pb-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr] gap-12 items-start">
          {/* Left: título + bullets, sin párrafo descriptivo */}
          <SlideInSection direction="left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] mb-3 leading-tight">
              Ubicación
              <br />
              <span className="text-[#0671AE]">Conectividad</span>
            </h2>
            {/* Línea verde decorativa */}
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-6" />

            <div className="space-y-4 pb-6">
              {bullets.map(({ iconName, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon name={iconName} size={18} className="text-[#0671AE] flex-shrink-0 mt-0.5" />
                  <p className="text-[#4A6275] text-sm leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>

            {/* Botón Cotizar ahora */}
            <Link href="/#cotizador" className="block" aria-label="Ir a cotizador">
              <Button
                variant="primary"
                size="md"
                type="button"
                aria-label="Cotizar departamento en Boulevard Santa Rosa"
              >
                Cotizar ahora →
              </Button>
            </Link>
          </SlideInSection>

          {/* Right: map con imagen real y puntos de interés */}
          <SlideInSection direction="right">
            <a
              href="https://maps.google.com/?q=León+Prado+esquina+Av.+Santa+Rosa,+San+Miguel,+Santiago,+Chile"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer block"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Imagen del mapa - León Prado 515 esquina Av. Santa Rosa */}
            <img
              src="/images/mapa-ubicacion-boulevard.png"
              alt="Mapa de ubicación Boulevard Santa Rosa ubicado en León Prado 515 esquina Avenida Santa Rosa, San Miguel - Haz clic para abrir en Google Maps"
              title="Ubicación de Boulevard Santa Rosa"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />

            {/* Puntos de interés sobre la nueva imagen */}
            {/* Supermercado (derecha) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ right: "15%", top: "25%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="supermercados" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Salud (derecha abajo) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ right: "12%", top: "65%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="centros-medicos" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Banco (izquierda arriba) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "8%", top: "20%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="bancos" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio (izquierda) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "10%", top: "55%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="mercado" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Tarjeta flotante con POIs, montada en la parte inferior del mapa - Oculta en mobile */}
            <div className="hidden md:grid absolute bottom-3 left-3 right-3 bg-white rounded-2xl shadow-lg py-3 px-2 grid-cols-4 gap-1">
              {pois.map(({ iconName, label }, i) => (
                <div key={label} className="flex flex-col items-center gap-1.5 text-center">
                  <Icon
                    name={iconName}
                    size={20}
                    className={i % 2 === 0 ? "text-[#84CE25]" : "text-[#0671AE]"}
                    aria-hidden="true"
                  />
                  <span className="text-[#033D6B] text-[10px] font-medium leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </a>
          </SlideInSection>
        </div>

      </div>

      {/* ── Curva de transición hacia "Conoce el Proyecto" (#F4F9FB) ── */}
      <svg
        className="absolute bottom-0 left-0 w-full h-20 md:h-28 pointer-events-none"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,168 C8,140 30,105 76,97
             L1370,97
             C1390,97 1412,55 1440,0
             L1440,200 L0,200 Z"
          fill="#F4F9FB"
        />
      </svg>
    </section>
  );
};
