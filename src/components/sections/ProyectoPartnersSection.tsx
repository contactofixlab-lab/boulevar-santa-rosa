import Image from "next/image";

const partners = [
  {
    name: "Consorcio",
    src: "/logo_consorcio_2024.webp",
    width: 991,
    height: 189,
  },
  {
    name: "Franulic Arquitectos",
    src: "/logo_franulic_arquitectos.jpg",
    width: 177,
    height: 51,
  },
  {
    name: "PDS",
    src: "/logo_pds.jpeg",
    width: 800,
    height: 600,
  },
  {
    name: "Iencinas",
    src: "/logo_iencinas.png",
    width: 800,
    height: 800,
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
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-8">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              <Image
                src={partner.src}
                alt={partner.name}
                width={partner.width}
                height={partner.height}
                className="h-12 md:h-14 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
