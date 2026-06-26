"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

/**
 * Hero con foto de fondo completa (edificio, locales, bus, personas) y el borde
 * inferior recortado con esquinas redondeadas asimétricas — igual al tratamiento
 * de neourbe.cl (medido píxel a píxel sobre su referencia): plateau plano en el
 * centro, esquina izquierda con radio marcado, esquina derecha con un radio mayor
 * y más suave. El texto va centrado verticalmente sobre la foto, no pegado abajo.
 */
export const HeroSection = () => {
  return (
    <section className="relative min-h-[94vh] flex items-center overflow-hidden">

      {/* ── Imagen del render COMPLETA de fondo ── */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/renders/Fachada/Frontal.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center 55%",
        }}
        aria-hidden="true"
      />

      {/* ── Degradado para legibilidad del texto ── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, rgba(3,32,58,0.80) 0%, rgba(3,32,58,0.50) 36%, rgba(3,32,58,0.18) 60%, rgba(3,32,58,0) 78%)",
        }}
        aria-hidden="true"
      />

      {/* ── Borde inferior: misma curva asimétrica usada en el resto de las secciones ── */}
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

      {/* ── Contenido (texto + botones) centrado verticalmente sobre la imagen ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pb-10">
        <div className="max-w-[520px]">

          <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-bold
                         leading-[1.15] mb-5 drop-shadow-sm">
            <span className="text-white">Vive conectado<br />
            al nuevo</span>{" "}
            <span className="text-[#84CE25]">San Miguel</span>
          </h1>

          <p className="text-white/90 text-base md:text-lg leading-relaxed mb-8 max-w-[430px]
                        drop-shadow-sm">
            Un proyecto pensado para tu bienestar, con excelente conectividad,
            calidad de vida e inversión inteligente.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link href="/#cotizador" className="block">
              <Button
                variant="primary"
                size="md"
                className="shadow-xl cursor-pointer"
                type="button"
              >
                Cotizar ahora →
              </Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              className="!border-white !text-white hover:!bg-white/15 backdrop-blur-sm"
            >
              Descargar brochure ↓
            </Button>
          </div>
        </div>
      </div>

    </section>
  );
};
