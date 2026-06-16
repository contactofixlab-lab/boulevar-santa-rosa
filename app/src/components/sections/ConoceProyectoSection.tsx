"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

type PhotoType = "departamento" | "terraza" | "areas-comunes" | "amenidades";

interface Photo {
  id: string;
  label: string;
  type: PhotoType;
  colorA: string;
  colorB: string;
}

const photosByType: Record<PhotoType, Photo[]> = {
  departamento: [
    { id: "d1", label: "Sala de estar", type: "departamento", colorA: "#b8d4e8", colorB: "#7aa8c8" },
    { id: "d2", label: "Cocina", type: "departamento", colorA: "#a8c8a0", colorB: "#6ea870" },
    { id: "d3", label: "Dormitorio principal", type: "departamento", colorA: "#c8b8d8", colorB: "#9890b8" },
    { id: "d4", label: "Baño suite", type: "departamento", colorA: "#b8cce0", colorB: "#88aac8" },
    { id: "d5", label: "Dormitorio secundario", type: "departamento", colorA: "#d4c8b0", colorB: "#a89878" },
  ],
  terraza: [
    { id: "t1", label: "Terraza principal", type: "terraza", colorA: "#90c8a8", colorB: "#60a880" },
    { id: "t2", label: "Terraza con vista", type: "terraza", colorA: "#a8d4b0", colorB: "#78b880" },
    { id: "t3", label: "Terraza gourmet", type: "terraza", colorA: "#b8dcc0", colorB: "#88b890" },
  ],
  "areas-comunes": [
    { id: "a1", label: "Piscina", type: "areas-comunes", colorA: "#a8c8e8", colorB: "#6a9cc8" },
    { id: "a2", label: "Gimnasio", type: "areas-comunes", colorA: "#d8b8c8", colorB: "#b08090" },
    { id: "a3", label: "Sala de juegos", type: "areas-comunes", colorA: "#c8d4a0", colorB: "#98a870" },
    { id: "a4", label: "Lobby", type: "areas-comunes", colorA: "#d0c0d8", colorB: "#a890b0" },
  ],
  amenidades: [
    { id: "am1", label: "Estacionamientos", type: "amenidades", colorA: "#c8b8a8", colorB: "#988878" },
    { id: "am2", label: "Bodegas", type: "amenidades", colorA: "#b8c8d8", colorB: "#8898b8" },
    { id: "am3", label: "Zonas verdes", type: "amenidades", colorA: "#a8d8b0", colorB: "#78b880" },
  ],
};

const filterLabels: Record<PhotoType, string> = {
  departamento: "Departamentos",
  terraza: "Terrazas",
  "areas-comunes": "Áreas Comunes",
  amenidades: "Amenidades",
};

const PhotoCard = ({
  label,
  colorA,
  colorB,
  style = {},
}: {
  label: string;
  colorA: string;
  colorB: string;
  style?: React.CSSProperties;
}) => (
  <div
    className="relative overflow-hidden rounded-2xl shadow-sm group transition-transform hover:shadow-md"
    style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})`, ...style }}
  >
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <ImageIcon size={40} className="text-white" />
    </div>
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3">
      <p className="text-white text-xs font-semibold tracking-wide">{label}</p>
    </div>
  </div>
);

export const ConoceProyectoSection = () => {
  const [selectedType, setSelectedType] = useState<PhotoType>("departamento");
  const photos = photosByType[selectedType];

  return (
    <section className="py-16 bg-[#F4F9FB]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título CENTRADO */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight inline-block">
            Conoce el{" "}
            <span className="text-[#0671AE]">Proyecto</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-4" />
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {(Object.keys(photosByType) as PhotoType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedType === type
                  ? "bg-[#84CE25] text-white shadow-md"
                  : "bg-white text-[#033D6B] border-2 border-[#0671AE] hover:border-[#84CE25] hover:bg-[#E3F3FB]"
              }`}
            >
              {filterLabels[type]}
            </button>
          ))}
        </div>

        {/* Mosaico con animación suave */}
        <div className="space-y-4 animate-fade-in">
          {/* Fila 1: 3 fotos grandes */}
          <div className="grid grid-cols-3 gap-4">
            {photos.slice(0, 3).map((p) => (
              <PhotoCard
                key={p.id}
                label={p.label}
                colorA={p.colorA}
                colorB={p.colorB}
                style={{ height: "280px" }}
              />
            ))}
          </div>

          {/* Fila 2: resto de fotos pequeñas */}
          {photos.length > 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {photos.slice(3).map((p) => (
                <PhotoCard
                  key={p.id}
                  label={p.label}
                  colorA={p.colorA}
                  colorB={p.colorB}
                  style={{ height: "220px" }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
