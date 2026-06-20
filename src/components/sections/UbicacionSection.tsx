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
    <section className="relative py-20 bg-white overflow-hidden">
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

            <div className="space-y-4">
              {bullets.map(({ iconName, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon name={iconName} size={18} className="text-[#0671AE] flex-shrink-0 mt-0.5" />
                  <p className="text-[#4A6275] text-sm leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: map con tooltip y tarjeta POI flotante */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg bg-[#d8edf8]" style={{ aspectRatio: "4/3" }}>
            {/* Map grid lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" aria-hidden="true">
              <defs>
                <pattern id="mapGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#b8d5e8" strokeWidth="0.7"/>
                </pattern>
              </defs>
              <rect width="400" height="400" fill="#d8edf8"/>
              <rect width="400" height="400" fill="url(#mapGrid)"/>
              {/* Streets */}
              <rect x="0" y="185" width="400" height="14" fill="#b5cee0" rx="2"/>
              <rect x="185" y="0" width="14" height="400" fill="#b5cee0" rx="2"/>
              <rect x="0" y="280" width="400" height="8" fill="#c5dae8" rx="1"/>
              <rect x="280" y="0" width="8" height="400" fill="#c5dae8" rx="1"/>
              <rect x="0" y="100" width="400" height="6" fill="#c8dcea" rx="1"/>
              <rect x="100" y="0" width="6" height="400" fill="#c8dcea" rx="1"/>
              {/* Blocks */}
              <rect x="110" y="110" width="65" height="65" fill="#c2d9e9" rx="3" opacity="0.7"/>
              <rect x="195" y="110" width="75" height="65" fill="#c2d9e9" rx="3" opacity="0.6"/>
              <rect x="110" y="205" width="65" height="65" fill="#c2d9e9" rx="3" opacity="0.6"/>
              <rect x="295" y="205" width="60" height="65" fill="#c2d9e9" rx="3" opacity="0.5"/>
              {/* Pin */}
              <circle cx="200" cy="192" r="14" fill="#0671AE" opacity="0.9"/>
              <circle cx="200" cy="192" r="7" fill="white"/>
              <circle cx="200" cy="192" r="3" fill="#0671AE"/>
              {/* Pulse ring */}
              <circle cx="200" cy="192" r="22" fill="none" stroke="#0671AE" strokeWidth="1.5" opacity="0.4"/>
              <circle cx="200" cy="192" r="32" fill="none" stroke="#0671AE" strokeWidth="1" opacity="0.2"/>
            </svg>
            {/* Tooltip junto al pin */}
            <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-full bg-white rounded-lg shadow-md px-3 py-1.5 whitespace-nowrap">
              <p className="text-[#033D6B] text-xs font-semibold">Boulevard Santa Rosa</p>
              <p className="text-[#4A6275] text-[10px]">San Miguel, Santiago, Chile</p>
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
          </div>
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
