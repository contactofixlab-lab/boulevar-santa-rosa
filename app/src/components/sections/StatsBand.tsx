import { Building2, Home, Car, Package } from "lucide-react";

const stats = [
  { icon: Building2, value: "6",  label: "Pisos totales",    color: "#0671AE", bg: "#E3F3FB" },
  { icon: Home,      value: "94", label: "Departamentos",    color: "#0671AE", bg: "#E3F3FB" },
  { icon: Car,       value: "62", label: "Estacionamientos", color: "#65A81A", bg: "#EBF7CC" },
  { icon: Package,   value: "48", label: "Bodegas",          color: "#65A81A", bg: "#EBF7CC" },
];

export const StatsBand = () => {
  return (
    <section className="relative bg-[#E3F3FB] py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {stats.map(({ icon: Icon, value, label, bg, color }) => (
            <div
              key={label}
              className="bg-white rounded-2xl shadow-sm py-6 px-5 flex flex-col items-center gap-4 hover:shadow-md transition-shadow"
            >
              {/* Ícono + Número en fila */}
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: bg }}
                >
                  <Icon size={32} style={{ color }} aria-hidden="true" />
                </div>
                <span className="text-5xl font-bold text-[#033D6B]">{value}</span>
              </div>
              {/* Etiqueta debajo */}
              <span className="text-sm text-[#4A6275] font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
