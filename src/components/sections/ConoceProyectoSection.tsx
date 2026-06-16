"use client";

import { useState } from "react";
import Image from "next/image";

type PhotoType = "departamento" | "areas-comunes" | "fachada";

interface Photo {
  id: string;
  label: string;
  type: PhotoType;
  src: string;
}

const photosByType: Record<PhotoType, Photo[]> = {
  departamento: [
    { id: "d1", label: "Living Comedor Cocina", type: "departamento", src: "/renders/Departamento/Living Comerdor Cocina.jpg" },
    { id: "d2", label: "Living Comedor", type: "departamento", src: "/renders/Departamento/Living Comedor.jpg" },
    { id: "d3", label: "Cocina", type: "departamento", src: "/renders/Departamento/Cocina.jpg" },
    { id: "d4", label: "Cocina 2", type: "departamento", src: "/renders/Departamento/Cocina 2.jpg" },
    { id: "d5", label: "Dormitorio Principal", type: "departamento", src: "/renders/Departamento/Dormitorio.jpg" },
    { id: "d6", label: "Dormitorio 2", type: "departamento", src: "/renders/Departamento/Dormitorio 2.jpg" },
    { id: "d7", label: "Dormitorio 3", type: "departamento", src: "/renders/Departamento/Dormitorio 3.jpg" },
    { id: "d8", label: "Baño", type: "departamento", src: "/renders/Departamento/Baño.jpg" },
  ],
  "areas-comunes": [
    { id: "a1", label: "Quincho", type: "areas-comunes", src: "/renders/Easpacios Comunes/Quincho.jpg" },
    { id: "a2", label: "Sala Multiuso", type: "areas-comunes", src: "/renders/Easpacios Comunes/Sala Multiuso.jpg" },
    { id: "a3", label: "Sala Multiuso - Foto 2", type: "areas-comunes", src: "/renders/Easpacios Comunes/Sala Multiuso foto 2.jpg" },
  ],
  fachada: [
    { id: "f1", label: "Frontal", type: "fachada", src: "/renders/Fachada/Frontal.jpg" },
    { id: "f2", label: "Lateral", type: "fachada", src: "/renders/Fachada/Lateral.jpg" },
    { id: "f3", label: "Entrada", type: "fachada", src: "/renders/Fachada/Entrada.jpg" },
    { id: "f4", label: "Retail", type: "fachada", src: "/renders/Fachada/SR_RETAIL_010.jpg" },
  ],
};

const filterLabels: Record<PhotoType, string> = {
  departamento: "Departamentos",
  "areas-comunes": "Áreas Comunes",
  fachada: "Fachada",
};

const PhotoCard = ({
  label,
  src,
  style = {},
}: {
  label: string;
  src: string;
  style?: React.CSSProperties;
}) => (
  <div
    className="relative overflow-hidden rounded-2xl shadow-sm group transition-transform hover:shadow-md"
    style={{ position: "relative", ...style }}
  >
    <Image
      src={src}
      alt={label}
      fill
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="object-cover group-hover:scale-105 transition-transform duration-300"
      priority={false}
    />
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent px-4 py-3">
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
                src={p.src}
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
                  src={p.src}
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
