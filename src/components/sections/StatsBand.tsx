import { Icon } from "@/components/ui/Icon";

const stats = [
  { iconName: "proyecto-pisos",  value: "6",  label: "Pisos totales",     iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "departamentos",   value: "94", label: "Departamentos",     iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
  { iconName: "estacionamiento", value: "62", label: "Estacionamientos",  iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "bodegas",         value: "48", label: "Bodegas",           iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
];

export const StatsBand = () => {
  return (
    <section className="relative bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map(({ iconName, value, label, iconColor, bgGradient }) => (
            <div
              key={label}
              className="rounded-2xl shadow-sm p-8 flex flex-col items-center gap-5 hover:shadow-md transition-shadow"
              style={{ backgroundColor: bgGradient }}
            >
              <Icon name={iconName} size={40} style={{ color: iconColor }} aria-hidden="true" />
              <span className="text-4xl font-bold text-[#033D6B]">{value}</span>
              <span className="text-sm text-[#4A6275] font-medium text-center">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
