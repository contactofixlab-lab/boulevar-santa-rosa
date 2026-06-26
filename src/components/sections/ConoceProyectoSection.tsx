"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Camera } from "lucide-react";
import { SlideInSection } from "@/components/ui/SlideInSection";
import { motion } from "framer-motion";

type PhotoType = "departamento" | "areas-comunes" | "fachada";

interface Photo {
  id: string;
  label: string;
  type: PhotoType;
  src: string;
  aspectRatio: number;
}

const photosByType: Record<PhotoType, Photo[]> = {
  departamento: [
    { id: "d1", label: "Living Comedor Cocina", type: "departamento", src: "/renders/Departamento/Living-Comerdor-Cocina.jpg", aspectRatio: 1.778 },
    { id: "d2", label: "Living Comedor", type: "departamento", src: "/renders/Departamento/Living-Comedor.jpg", aspectRatio: 1.778 },
    { id: "d3", label: "Cocina", type: "departamento", src: "/renders/Departamento/Cocina.jpg", aspectRatio: 1.778 },
    { id: "d4", label: "Cocina 2", type: "departamento", src: "/renders/Departamento/Cocina-2.jpg", aspectRatio: 1.778 },
    { id: "d5", label: "Dormitorio Principal", type: "departamento", src: "/renders/Departamento/Dormitorio.jpg", aspectRatio: 1.778 },
    { id: "d6", label: "Dormitorio 2", type: "departamento", src: "/renders/Departamento/Dormitorio-2.jpg", aspectRatio: 1.778 },
    { id: "d7", label: "Dormitorio 3", type: "departamento", src: "/renders/Departamento/Dormitorio-3.jpg", aspectRatio: 1.778 },
    { id: "d8", label: "Baño", type: "departamento", src: "/renders/Departamento/Baño.jpg", aspectRatio: 1.0 },
  ],
  "areas-comunes": [
    { id: "a1", label: "Quincho", type: "areas-comunes", src: "/renders/Areas-Comunes/Quincho.jpg", aspectRatio: 1.778 },
    { id: "a2", label: "Sala Multiuso", type: "areas-comunes", src: "/renders/Areas-Comunes/Sala-Multiuso.jpg", aspectRatio: 1.778 },
    { id: "a3", label: "Sala Multiuso - Foto 2", type: "areas-comunes", src: "/renders/Areas-Comunes/Sala-Multiuso-foto-2.jpg", aspectRatio: 1.778 },
  ],
  fachada: [
    { id: "f1", label: "Frontal", type: "fachada", src: "/renders/Fachada/Frontal.jpg", aspectRatio: 1.778 },
    { id: "f2", label: "Lateral", type: "fachada", src: "/renders/Fachada/Lateral.jpg", aspectRatio: 1.286 },
    { id: "f3", label: "Entrada", type: "fachada", src: "/renders/Fachada/Entrada.jpg", aspectRatio: 1.778 },
    { id: "f4", label: "Retail", type: "fachada", src: "/renders/Fachada/SR_RETAIL_010.jpg", aspectRatio: 1.778 },
  ],
};

const filterLabels: Record<PhotoType, string> = {
  departamento: "Departamentos",
  "areas-comunes": "Áreas Comunes",
  fachada: "Fachada",
};

export const ConoceProyectoSection = () => {
  const [selectedType, setSelectedType] = useState<PhotoType>("departamento");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const photos = photosByType[selectedType];
  const mainPhoto = photos[activeIndex];
  const thumbCount = Math.min(3, photos.length - 1);
  const thumbIndices = Array.from(
    { length: thumbCount },
    (_, i) => (activeIndex + 1 + i) % photos.length
  );

  const handleFilterChange = (type: PhotoType) => {
    setSelectedType(type);
    setActiveIndex(0);
  };

  const goPrev = () => setActiveIndex((i) => (i - 1 + photos.length) % photos.length);
  const goNext = () => setActiveIndex((i) => (i + 1) % photos.length);

  return (
    <section id="conoce" className="relative py-16 bg-[#F4F9FB] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Título CENTRADO */}
        <SlideInSection direction="left" className="flex justify-center">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight inline-block">
              Conoce el{" "}
              <span className="text-[#0671AE]">Proyecto</span>
            </h2>
            <div className="w-16 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-4" />
          </div>
        </SlideInSection>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {(Object.keys(photosByType) as PhotoType[]).map((type) => (
            <button
              key={type}
              onClick={() => handleFilterChange(type)}
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

        {/* Galería: foto grande + miniaturas clicables */}
        <div className="flex justify-center">
          <div className="w-full">
            {/* Foto principal */}
            <button
              onClick={() => setIsLightboxOpen(true)}
              className="relative rounded-2xl overflow-hidden shadow-sm bg-gray-900 mx-auto hover:shadow-lg transition-shadow group cursor-pointer block"
              style={{
                aspectRatio: mainPhoto.aspectRatio,
                maxHeight: "500px",
                maxWidth: `${500 * mainPhoto.aspectRatio}px`,
              }}
              aria-label="Ver foto en grande"
            >
              <img
                key={mainPhoto.id}
                src={mainPhoto.src}
                alt={mainPhoto.label}
                className="w-full h-full object-contain object-center animate-fade-in"
                loading="lazy"
                decoding="async"
              />

              {/* Icono cámara decorativo */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center">
                <Camera size={16} className="text-[#033D6B]" />
              </div>

              {/* Overlay al hover con icono de expandir */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#033D6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                  </svg>
                </div>
              </div>

              {/* Indicador de fotos */}
              <div className="absolute bottom-4 left-4 flex gap-1.5">
                {photos.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(i);
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                        setActiveIndex(i);
                      }
                    }}
                    aria-label={`Ver foto ${p.label}`}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      i === activeIndex ? "bg-[#84CE25] w-5" : "bg-white/70 hover:bg-white w-2"
                    }`}
                  />
                ))}
              </div>
            </button>

            {/* Flechas + miniaturas (20% más grandes, mitad dentro/mitad afuera) */}
            <div className="flex items-stretch gap-3 -mt-7 h-[72px] md:h-[96px] justify-center px-4">
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={goPrev}
                  aria-label="Foto anterior"
                  className="w-8 h-8 rounded-full bg-white shadow-sm border border-[#E3F3FB] flex items-center justify-center text-[#033D6B] hover:bg-[#E3F3FB] transition-colors"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={goNext}
                  aria-label="Foto siguiente"
                  className="w-8 h-8 rounded-full bg-white shadow-sm border border-[#E3F3FB] flex items-center justify-center text-[#033D6B] hover:bg-[#E3F3FB] transition-colors"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <div
                className="flex gap-3"
                style={{
                  maxWidth: "360px",
                }}
              >
                {thumbIndices.map((i) => {
                  const p = photos[i];
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className="relative rounded-lg overflow-hidden group border-2 transition-all flex-1"
                      style={{
                        borderColor: i === activeIndex ? "#84CE25" : "rgba(255,255,255,0.3)",
                      }}
                    >
                      <img
                        src={p.src}
                        alt={p.label}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        decoding="async"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Lightbox */}
        {isLightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Contenedor principal */}
            <div className="flex flex-col max-w-6xl w-full h-full max-h-[90vh] gap-3" onClick={(e) => e.stopPropagation()}>
              {/* Foto grande */}
              <div
                className="flex-1 rounded-xl overflow-hidden bg-gray-900 flex items-center justify-center"
                style={{ maxHeight: "calc(90vh - 150px)" }}
              >
                <img
                  key={mainPhoto.id}
                  src={mainPhoto.src}
                  alt={mainPhoto.label}
                  className="max-w-full max-h-full object-contain"
                  loading="eager"
                  decoding="async"
                />
              </div>

              {/* Controles: flechas + miniaturas */}
              <div className="flex items-center justify-between gap-3 px-2 py-3">
                {/* Botón cerrar + flechas */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                    aria-label="Cerrar"
                  >
                    ✕
                  </button>
                  <button
                    onClick={goPrev}
                    aria-label="Foto anterior"
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Foto siguiente"
                    className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Miniaturas horizontales */}
                <div className="flex-1 flex gap-2 overflow-x-auto justify-center px-2">
                  {photos.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => setActiveIndex(i)}
                      className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        i === activeIndex ? "border-[#84CE25]" : "border-white/20 hover:border-white/40"
                      }`}
                      style={{ width: "60px", height: "60px" }}
                      aria-label={`Ver ${p.label}`}
                    >
                      <img
                        src={p.src}
                        alt={p.label}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>

                {/* Contador de fotos */}
                <div className="text-white/70 text-sm whitespace-nowrap ml-2">
                  {activeIndex + 1} / {photos.length}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ── Curva de transición hacia "Invierte en San Miguel" (blanco) ── */}
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
          fill="white"
        />
      </svg>
    </section>
  );
};
