import Link from "next/link";
import Image from "next/image";
import { getUFToday, getDollarToday } from "@/lib/uf";

const navLinks = [
  { href: "/proyecto",       label: "El Proyecto" },
  { href: "/ubicacion",      label: "Ubicación" },
  { href: "/tipologias",     label: "Departamentos" },
  { href: "/proceso-compra", label: "Proceso de Compra" },
  { href: "/contacto",       label: "Contacto" },
];

export const Footer = async () => {
  const uf = await getUFToday();
  const dollar = await getDollarToday();
  return (
    <footer className="relative bg-white border-t border-gray-100 overflow-hidden">
      {/* Ícono de marca gigante y translúcido, sangrando por los bordes (mismo
          efecto que la referencia NeoUrbe, adaptado a fondo claro) */}
      <Image
        src="/logos/boulevard-icono.png"
        alt=""
        aria-hidden="true"
        width={620}
        height={751}
        className="pointer-events-none select-none absolute -right-24 -bottom-32 w-[420px] h-auto opacity-[0.06] rotate-[8deg]"
      />
      <Image
        src="/logos/boulevard-icono.png"
        alt=""
        aria-hidden="true"
        width={620}
        height={751}
        className="pointer-events-none select-none absolute -left-20 -top-24 w-[260px] h-auto opacity-[0.05] -rotate-[10deg] hidden md:block"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <Image
                src="/logos/BOULEVARD COLOR.png"
                alt="Boulevard Santa Rosa"
                width={228}
                height={120}
                className="h-40 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Navegación - Hidden */}
          <div className="hidden"></div>

          {/* Sala de Ventas */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-[#033D6B]">
              Sala de Ventas
            </h4>
            <div className="space-y-2 text-xs text-[#4A6275]">
              <p>León Prado 515 esquina Av. Santa Rosa, San Miguel, Santiago</p>
              <a href="tel:+56995350637" className="block hover:text-[#0671AE] transition-colors font-medium text-[#033D6B]">
                +56 9 9535 0637
              </a>
              <a href="mailto:arodriguez@iencinas.cl" className="block hover:text-[#0671AE] transition-colors break-all">
                arodriguez@iencinas.cl
              </a>
              <p>Lun–Dom · 10:00 a 19:00 hrs.</p>
            </div>
          </div>

          {/* UF Hoy y Dólar Hoy */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-2 text-[#033D6B]">
              UF Hoy
            </h4>
            <div className="bg-gradient-to-br from-[#0671AE]/10 to-[#0671AE]/5 rounded-lg px-4 py-3 border border-[#0671AE]/20 inline-block mb-4">
              <p className="text-2xl font-bold text-[#0671AE]">
                ${Math.round(uf.value)}
              </p>
            </div>

            <h4 className="font-semibold text-xs uppercase tracking-wider mb-2 text-[#033D6B]">
              Dólar Hoy
            </h4>
            <div className="bg-gradient-to-br from-[#84CE25]/10 to-[#84CE25]/5 rounded-lg px-4 py-3 border border-[#84CE25]/20 inline-block">
              <p className="text-2xl font-bold text-[#84CE25]">
                ${Math.round(dollar.value)}
              </p>
            </div>
          </div>

        </div>

<div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#4A6275] text-xs">
            &copy; 2026 Boulevard Santa Rosa. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};
