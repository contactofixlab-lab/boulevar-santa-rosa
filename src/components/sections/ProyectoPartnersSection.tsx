"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const partners = [
  {
    name: "Consorcio",
    label: "el banco",
    src: "/logos/logo_consorcio_2024.webp",
    width: 991,
    height: 189,
  },
  {
    name: "Franulic Arquitectos",
    label: "arquitectos",
    src: "/logos/logo_franulic_arquitectos.jpg",
    width: 177,
    height: 51,
  },
  {
    name: "PDS",
    label: "del grupo",
    src: "/logos/logo_pds.png",
    width: 1280,
    height: 720,
  },
];

export const ProyectoPartnersSection = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "center", loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-[#4A6275] mb-2">
            Un proyecto de
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0671AE] to-[#84CE25] rounded-full mx-auto" />
        </div>

        {/* MOBILE: Carrusel */}
        <div className="md:hidden">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {partners.map((partner) => (
                <div key={partner.name} className="flex-[0_0_100%] min-w-0 flex flex-col items-center gap-4 px-4">
                  <p className="text-xs uppercase tracking-wider font-semibold text-[#4A6275]">
                    {partner.label}
                  </p>
                  <div className="flex items-center justify-center w-48 h-40">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Botones navegación carrusel */}
          <div className="flex justify-center gap-3 mt-6">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className="w-10 h-10 rounded-full bg-[#E3F3FB] text-[#0671AE] flex items-center justify-center hover:bg-[#0671AE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className="w-10 h-10 rounded-full bg-[#E3F3FB] text-[#0671AE] flex items-center justify-center hover:bg-[#0671AE] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* DESKTOP: Grid */}
        <div className="hidden md:grid grid-cols-3 gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center gap-3 w-full">
              <p className="text-xs uppercase tracking-wider font-semibold text-[#4A6275]">
                {partner.label}
              </p>
              <div className="flex items-center justify-center w-56 h-40">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
