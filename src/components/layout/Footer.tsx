import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { href: "/proyecto",       label: "El Proyecto" },
  { href: "/ubicacion",      label: "Ubicación" },
  { href: "/tipologias",     label: "Departamentos" },
  { href: "/proceso-compra", label: "Proceso de Compra" },
  { href: "/contacto",       label: "Contacto" },
];

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Logo + tagline */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/Boulevard_horizontal_color.png"
                alt="Boulevard Santa Rosa"
                width={160}
                height={54}
                className="h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-[#4A6275] text-xs leading-relaxed mb-4">
              Nuevo proyecto inmobiliario en San Miguel, Santiago.
            </p>
            <div className="flex gap-2">
              <a
                href="#"
                className="w-7 h-7 bg-[#E3F3FB] hover:bg-[#0671AE] hover:text-white text-[#0671AE] rounded flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-[#E3F3FB] hover:bg-[#0671AE] hover:text-white text-[#0671AE] rounded flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="#"
                className="w-7 h-7 bg-[#E3F3FB] hover:bg-[#0671AE] hover:text-white text-[#0671AE] rounded flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-[#033D6B]">
              Navegación
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#4A6275] hover:text-[#0671AE] text-xs transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Sala de Ventas */}
          <div>
            <h4 className="font-semibold text-xs uppercase tracking-wider mb-4 text-[#033D6B]">
              Sala de Ventas
            </h4>
            <div className="space-y-2 text-xs text-[#4A6275]">
              <p>San Miguel, Santiago, Chile</p>
              <a href="tel:+56995350637" className="block hover:text-[#0671AE] transition-colors font-medium text-[#033D6B]">
                +56 9 9535 0637
              </a>
              <a href="mailto:ventas_carrera@almago.cl" className="block hover:text-[#0671AE] transition-colors break-all">
                ventas_carrera@almago.cl
              </a>
              <p>Lun–Dom · 10:00 a 19:00 hrs.</p>
            </div>
          </div>

        </div>

        <div className="border-t border-gray-100 pt-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#4A6275] text-xs">
            &copy; 2026 Boulevard Santa Rosa. Todos los derechos reservados.
          </p>
        </div>

      </div>
    </footer>
  );
};
