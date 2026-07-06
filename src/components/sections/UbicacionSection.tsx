"use client";

import { Icon } from "@/components/ui/Icon";
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
          </SlideInSection>

          {/* Right: map con imagen real y puntos de interés */}
          <SlideInSection direction="right">
            <a
              href="https://maps.google.com/?q=Boulevard+Santa+Rosa,+San+Miguel,+Santiago,+Chile"
            target="_blank"
            rel="noopener noreferrer"
            className="relative w-full rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer block"
            style={{ aspectRatio: "16/9" }}
          >
            {/* Imagen del mapa */}
            <img
              src="/Frame 4.png"
              alt="Mapa de ubicación Boulevard Santa Rosa - Click para abrir en Google Maps"
              className="w-full h-full object-cover"
            />

            {/* Puntos de interés - Adaptados del CSS de Figma */}
            {/* Hospital (1077px, 132px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "64.3%", top: "14%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="centros-medicos" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Supermercado (1275px, 248px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "76.2%", top: "26.3%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="supermercados" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Educación (1340px, 259px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "80.1%", top: "27.5%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="colegios" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio (1153px, 262px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "68.9%", top: "27.8%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="mercado" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Banco (471px, 257px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "28.1%", top: "27.3%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="bancos" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio 2 (437px, 396px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "26.1%", top: "42%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="mercado" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio 3 (387px, 554px) */}
            <div className="absolute w-5 h-5 flex items-center justify-center" style={{ left: "23.1%", top: "58.8%" }}>
              <div className="w-5 h-5 rounded-full border-1 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-sm">
                <Icon name="mercado" size={10} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Punto central - Boulevard con ícono de ubicación y dirección */}
            <div className="absolute flex items-center gap-2 bg-white rounded-lg px-2 py-1.5 shadow-lg border border-[#0671AE]" style={{ left: "65%", top: "55%", transform: "translate(-50%, -50%)" }}>
              <svg className="w-5 h-5 text-[#0671AE] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C7.6 0 4 3.6 4 8c0 7 8 16 8 16s8-9 8-16c0-4.4-3.6-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
              </svg>
              <div className="flex flex-col gap-0">
                <p className="text-[10px] font-bold text-[#0671AE] leading-tight">Boulevard</p>
                <p className="text-[8px] text-[#033D6B] font-semibold leading-tight">León Prado 515</p>
              </div>
            </div>

            {/* Tarjeta flotante con POIs, montada en la parte inferior del mapa */}
            <div className="absolute bottom-3 left-3 right-3 bg-white rounded-2xl shadow-lg py-3 px-2 grid grid-cols-4 gap-1">
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
