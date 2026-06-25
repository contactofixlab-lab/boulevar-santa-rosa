import { Icon } from "@/components/ui/Icon";

const stats = [
  { iconName: "proyecto-pisos",  value: "6",  label: "Pisos totales",     iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "departamentos",   value: "94", label: "Departamentos",     iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
  { iconName: "estacionamiento", value: "62", label: "Estacionamientos",  iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
  { iconName: "bodegas",         value: "48", label: "Bodegas",           iconColor: "#84CE25", bgGradient: "rgba(132, 206, 37, 0.08)" },
  { iconName: "store",           value: "19", label: "Locales comerciales", iconColor: "#0671AE", bgGradient: "rgba(6, 113, 174, 0.08)" },
];

export const StatsBand = () => {
  return (
    // Sin fondo propio: las cards quedan montadas mitad sobre la foto del hero, mitad sobre el blanco
    <section className="relative z-20 pb-6 md:pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-1 md:gap-1 -mt-[78px] md:-mt-[103px]">
          {stats.map(({ iconName, value, label, iconColor, bgGradient }) => (
            <div
              key={label}
              className="max-w-[160px] md:max-w-none mx-auto rounded-xl shadow-md px-3 py-4 md:px-4 md:py-5 flex flex-row items-center justify-center gap-2.5 hover:shadow-lg transition-shadow"
              style={{ background: `linear-gradient(${bgGradient}, ${bgGradient}), #ffffff` }}
            >
              <Icon name={iconName} size={32} style={{ color: iconColor }} className="flex-shrink-0" aria-hidden="true" />
              <div className="flex flex-col items-start gap-0.5 min-w-0">
                <span className="text-2xl md:text-3xl font-bold text-[#033D6B] leading-none">{value}</span>
                <span className="text-xs md:text-sm text-[#4A6275] font-medium leading-tight">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
