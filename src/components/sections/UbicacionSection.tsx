import { Icon } from "@/components/ui/Icon";

const bullets = [
  { iconName: "metro",        text: "Línea 4 del metro — Estación San Miguel" },
  { iconName: "bancos",       text: "Av. Santa Rosa y Av. Departamental" },
  { iconName: "supermercados", text: "Supermercados y comercio a metros" },
  { iconName: "colegios",     text: "Colegios y universidades cercanas" },
  { iconName: "centros-medicos", text: "Hospital El Pino y Clínica Santa Rosa" },
  { iconName: "autopista",    text: "Rápida conexión a autopistas urbanas" },
];

const pois = [
  { iconName: "supermercados",   label: "Supermercados" },
  { iconName: "colegios",        label: "Educación" },
  { iconName: "centros-medicos", label: "Salud" },
  { iconName: "mercado",         label: "Comercio" },
];

export const UbicacionSection = () => {
  return (
    <section id="ubicacion" className="relative py-12 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: título + bullets, sin párrafo descriptivo */}
          <div>
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
          </div>

          {/* Right: map con imagen real y puntos de interés */}
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
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "64.3%", top: "14%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="centros-medicos" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Supermercado (1275px, 248px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "76.2%", top: "26.3%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="supermercados" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Educación (1340px, 259px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "80.1%", top: "27.5%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="colegios" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio (1153px, 262px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "68.9%", top: "27.8%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="mercado" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Banco (471px, 257px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "28.1%", top: "27.3%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="bancos" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio 2 (437px, 396px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "26.1%", top: "42%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="mercado" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Comercio 3 (387px, 554px) */}
            <div className="absolute w-10 h-10 flex items-center justify-center" style={{ left: "23.1%", top: "58.8%" }}>
              <div className="w-10 h-10 rounded-full border-2 border-[#033D6B] flex items-center justify-center bg-white/80 shadow-md">
                <Icon name="mercado" size={20} className="text-[#033D6B]" />
              </div>
            </div>

            {/* Punto central - Boulevard (744px, 488px) */}
            <div className="absolute w-14 h-14 flex items-center justify-center" style={{ left: "44.4%", top: "51.8%" }}>
              <div className="w-14 h-14 rounded-full border-3 border-[#0671AE] flex items-center justify-center bg-white shadow-lg">
                <div className="w-6 h-6 rounded-full bg-[#0671AE]" />
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
        </div>

        {/* Dirección debajo del mapa */}
        <div className="mt-6 text-center md:text-left">
          <p className="text-sm text-[#4A6275]">{/* Dirección: */ }</p>
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
