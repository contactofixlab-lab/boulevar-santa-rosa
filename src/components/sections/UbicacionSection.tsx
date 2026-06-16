import { MapPin, ShoppingCart, GraduationCap, Heart, Store, Train, Zap } from "lucide-react";

const bullets = [
  { icon: Train,        text: "Línea 4 del metro — Estación San Miguel" },
  { icon: MapPin,       text: "Av. Santa Rosa y Av. Departamental" },
  { icon: ShoppingCart, text: "Supermercados y comercio a metros" },
  { icon: GraduationCap,text: "Colegios y universidades cercanas" },
  { icon: Heart,        text: "Hospital El Pino y Clínica Santa Rosa" },
  { icon: Zap,          text: "Rápida conexión a autopistas urbanas" },
];

const pois = [
  { emoji: "🛒", label: "Supermercados" },
  { emoji: "🎓", label: "Educación" },
  { emoji: "🏥", label: "Salud" },
  { emoji: "🏪", label: "Comercio" },
];

export const UbicacionSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left: título encima de los bullets */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] mb-3">
              Ubicación &{" "}
              <span className="text-[#0671AE]">Conectividad</span>
            </h2>
            {/* Línea verde decorativa */}
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-6" />

            <p className="text-[#4A6275] mb-7 leading-relaxed text-base">
              En el corazón de San Miguel, a pasos de todo lo que necesitas para vivir conectado a la ciudad.
            </p>
            <div className="space-y-4">
              {bullets.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <div className="mt-0.5 w-8 h-8 bg-[#E3F3FB] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#0671AE]" aria-hidden="true" />
                  </div>
                  <p className="text-[#4A6275] text-sm leading-relaxed pt-1">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: map with rounded corners and grid overlay */}
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
            {/* Label */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0671AE]/80 to-transparent p-4">
              <p className="text-white text-xs font-semibold">Boulevard Santa Rosa</p>
              <p className="text-white/70 text-xs">San Miguel, Santiago, Chile</p>
            </div>
          </div>
        </div>

        {/* POI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {pois.map(({ emoji, label }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-3 bg-[#F4F9FB] hover:bg-[#E3F3FB] rounded-2xl p-6 transition-colors"
            >
              <span className="text-3xl" aria-hidden="true">{emoji}</span>
              <span className="font-semibold text-[#033D6B] text-sm text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
