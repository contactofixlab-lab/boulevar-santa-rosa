import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { ImageIcon } from "lucide-react";

const photos = [
  { label: "Sala de estar",  colorA: "#b8d4e8", colorB: "#7aa8c8", size: "large" },
  { label: "Cocina",         colorA: "#a8c8a0", colorB: "#6ea870" },
  { label: "Dormitorio",     colorA: "#c8b8d8", colorB: "#9890b8" },
  { label: "Baño",           colorA: "#b8cce0", colorB: "#88aac8" },
  { label: "Terraza",        colorA: "#90c8a8", colorB: "#60a880" },
];

const PhotoCard = ({
  label, colorA, colorB, className = "", style = {}
}: {
  label: string; colorA: string; colorB: string; className?: string; style?: React.CSSProperties
}) => (
  <div
    className={`relative overflow-hidden rounded-2xl shadow-sm group ${className}`}
    style={{ background: `linear-gradient(135deg, ${colorA}, ${colorB})`, ...style }}
  >
    {/* Simula una foto con un gradiente y overlay */}
    <div className="absolute inset-0 flex items-center justify-center opacity-20">
      <ImageIcon size={40} className="text-white" />
    </div>
    {/* Overlay oscuro inferior con etiqueta */}
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/55 to-transparent px-4 py-3">
      <p className="text-white text-xs font-semibold tracking-wide">{label}</p>
    </div>
  </div>
);

export const ConoceProyectoSection = () => {
  return (
    <section className="py-16 bg-[#F4F9FB]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Título CENTRADO */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight inline-block">
            Conoce el{" "}
            <span className="text-[#0671AE]">Proyecto</span>
          </h2>
          <div className="w-16 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-4" />
        </div>

        {/* Mosaico — flexible para 5+ fotos */}
        <div className="space-y-4">
          {/* Fila 1: 3 fotos grandes */}
          <div className="grid grid-cols-3 gap-4">
            {photos.slice(0, 3).map((p) => (
              <PhotoCard
                key={p.label}
                label={p.label}
                colorA={p.colorA}
                colorB={p.colorB}
                style={{ height: "280px" }}
              />
            ))}
          </div>

          {/* Fila 2: 5 fotos pequeñas (resto de fotos) */}
          {photos.length > 3 && (
            <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              {photos.slice(3).map((p) => (
                <PhotoCard
                  key={p.label}
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
