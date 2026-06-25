"use client";

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { cotizadorDialogHandle } from "@/lib/cotizadorDialog";

const metrics = [
  {
    iconName: "home",
    value: "95",
    title: "Departamentos",
    description: "Espacios residenciales disponibles",
    bgGradient: "rgba(6, 113, 174, 0.12)",
    iconColor: "#0671AE"
  },
  {
    iconName: "box",
    value: "71",
    title: "Bodegas",
    description: "Espacios de almacenamiento",
    bgGradient: "rgba(132, 206, 37, 0.12)",
    iconColor: "#84CE25"
  },
  {
    iconName: "car",
    value: "61",
    title: "Estacionamientos",
    description: "Espacios de estacionamiento",
    bgGradient: "rgba(6, 113, 174, 0.12)",
    iconColor: "#0671AE"
  },
  {
    iconName: "store",
    value: "19",
    title: "Locales comerciales",
    description: "Espacios para retail y negocios",
    bgGradient: "rgba(132, 206, 37, 0.12)",
    iconColor: "#84CE25"
  },
  {
    iconName: "layers",
    value: "10",
    title: "Pisos",
    description: "Niveles disponibles en el edificio",
    bgGradient: "rgba(6, 113, 174, 0.12)",
    iconColor: "#0671AE"
  },
];

export const InvierteSection = () => {
  return (
    <section id="inversion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-stretch">

          {/* LEFT (1/4): título + descripción + CTA */}
          <div className="lg:col-span-1 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight mb-2">
              Invierte en
            </h2>
            <h2 className="text-3xl md:text-4xl font-bold text-[#0671AE] leading-tight mb-4">
              San Miguel
            </h2>
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-8" />
            <p className="text-[#4A6275] text-sm leading-relaxed mb-10">
              San Miguel es una de las comunas con mayor crecimiento en Santiago.
              La demanda de arriendo supera la oferta y la plusvalía crece año a año.
            </p>
            <Button
              variant="primary"
              size="md"
              onClick={() => cotizadorDialogHandle.openWithPayload(undefined)}
            >
              Cotizar ahora →
            </Button>
          </div>

          {/* RIGHT (3/4): 4 tarjetas intercaladas azul/verde, más alargadas, responsive */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 h-full">
            {metrics.map(({ iconName, value, title, description, bgGradient, iconColor }) => (
              <div
                key={title}
                className="rounded-2xl px-5 py-12 sm:py-14 shadow-sm hover:shadow-md transition-shadow flex flex-col items-center justify-center gap-5 sm:gap-6 h-full text-center"
                style={{ backgroundColor: bgGradient, color: iconColor }}
              >
                <Icon name={iconName} size={48} style={{ color: iconColor }} aria-hidden="true" />
                <div className="space-y-2">
                  <p className="text-3xl sm:text-4xl font-bold text-[#033D6B]">{value}</p>
                  <p className="text-xs sm:text-sm font-semibold text-[#033D6B]">{title}</p>
                  <p className="text-xs text-[#4A6275] leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
