import Image from "next/image";

const partners = [
  {
    name: "Consorcio",
    label: "el banco",
    src: "/logo_consorcio_2024.webp",
    width: 991,
    height: 189,
  },
  {
    name: "Franulic Arquitectos",
    label: "arquitectos",
    src: "/logo_franulic_arquitectos.jpg",
    width: 177,
    height: 51,
  },
  {
    name: "PDS",
    label: "del grupo",
    src: "/logo_pds.png",
    width: 1280,
    height: 720,
  },
];

export const ProyectoPartnersSection = () => {
  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <h3 className="text-sm uppercase tracking-widest font-semibold text-[#4A6275] mb-2">
            Un proyecto de
          </h3>
          <div className="w-12 h-1 bg-gradient-to-r from-[#0671AE] to-[#84CE25] rounded-full mx-auto" />
        </div>

        {/* Logos de Partners */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 items-center justify-items-center">
          {partners.map((partner) => (
            <div key={partner.name} className="flex flex-col items-center gap-3 w-full">
              {/* Label encima del logo */}
              <p className="text-xs uppercase tracking-wider font-semibold text-[#4A6275]">
                {partner.label}
              </p>
              {/* Logo */}
              <div className="flex items-center justify-center h-20 w-full">
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className="h-16 md:h-20 w-auto object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
