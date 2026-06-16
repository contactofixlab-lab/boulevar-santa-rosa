import { Flame, Monitor, Star, Bike, Leaf, Car } from "lucide-react";

const areas = [
  { icon: Flame,   label: "Quinchos",         desc: "Espacios para asados y reuniones",  bg: "#FFF3E0", color: "#E07820" },
  { icon: Monitor, label: "Co-work",           desc: "Sala de trabajo colaborativo",       bg: "#E3F3FB", color: "#0671AE" },
  { icon: Star,    label: "Sala Multiuso",     desc: "Eventos y actividades sociales",     bg: "#EDE7F6", color: "#7B5EA7" },
  { icon: Bike,    label: "Bicicletero",       desc: "Estacionamiento seguro de bicicletas", bg: "#EBF7CC", color: "#65A81A" },
  { icon: Leaf,    label: "Áreas Verdes",      desc: "Jardines y espacios de descanso",   bg: "#EBF7CC", color: "#65A81A" },
  { icon: Car,     label: "Estac. de Visita",  desc: "Para tus invitados",                bg: "#E3F3FB", color: "#0671AE" },
];

export const AreasComunes = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B]">
            Áreas <span className="text-[#0671AE]">Comunes</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-3 mb-4" />
          <p className="text-[#4A6275] max-w-lg mx-auto text-base">
            Espacios diseñados para tu bienestar y el de tu familia.
          </p>
        </div>

        {/* 6 cards en fila */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {areas.map(({ icon: Icon, label, desc, bg, color }) => (
            <div
              key={label}
              className="group flex flex-col rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all hover:-translate-y-1 overflow-visible"
            >
              {/* Zona de color — futura imagen real */}
              <div
                className="relative w-full h-36 rounded-t-2xl overflow-hidden flex-shrink-0"
                style={{ backgroundColor: bg }}
              >
                {/* Ícono circular blanco — hundido mitad en color, mitad en blanco */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10
                              w-12 h-12 rounded-full bg-white shadow-md
                              flex items-center justify-center"
                >
                  <Icon size={22} style={{ color }} aria-hidden="true" />
                </div>
              </div>

              {/* Zona blanca con texto */}
              <div className="bg-white px-3 pt-9 pb-4 text-center rounded-b-2xl flex-1">
                <p className="text-xs font-bold text-[#033D6B] leading-snug">{label}</p>
                <p className="text-[10px] text-[#4A6275] mt-1 leading-tight">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
