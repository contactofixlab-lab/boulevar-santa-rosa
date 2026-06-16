import Image from "next/image";
import { Phone, Clock, Shield, UserCheck, Home } from "lucide-react";

const trustItems = [
  { icon: Shield,    label: "Asesoría experta y transparente" },
  { icon: UserCheck, label: "Acompañamiento personalizado" },
  { icon: Home,      label: "Tu nuevo hogar, nuestra prioridad" },
];

export const AsesorSection = () => {
  return (
    <section className="relative bg-[#F4F9FB] overflow-hidden py-20">

      {/* Decorative wave lines top-right */}
      <div className="absolute top-0 right-0 w-80 h-72 pointer-events-none opacity-10" aria-hidden="true">
        <svg viewBox="0 0 320 290" fill="none" className="w-full h-full">
          {[40, 70, 100, 130, 160, 190].map((y) => (
            <path key={y}
              d={`M0,${y} C60,${y-20} 120,${y+30} 200,${y+10} C280,${y-10} 320,${y+40} 400,${y+20}`}
              stroke="#0671AE" strokeWidth="1.5" fill="none"
            />
          ))}
        </svg>
      </div>

      {/* Decorative wave lines bottom-left */}
      <div className="absolute bottom-0 left-0 w-64 h-60 pointer-events-none opacity-10" aria-hidden="true">
        <svg viewBox="0 0 260 240" fill="none" className="w-full h-full">
          {[30, 60, 90, 120].map((y) => (
            <path key={y}
              d={`M-10,${y} C30,${y-20} 70,${y+30} 120,${y+10} C170,${y-10} 220,${y+30} 280,${y+10}`}
              stroke="#84CE25" strokeWidth="1.5" fill="none"
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Logo */}
        <div className="mb-12">
          <Image
            src="/Boulevard_color.png"
            alt="Boulevard Santa Rosa"
            width={140}
            height={42}
            className="h-9 w-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Left: foto asesor + trust badge */}
          <div className="flex flex-col items-center md:items-start gap-6">
            <div className="relative">
              {/* Foto circular del asesor */}
              <div className="w-56 h-56 rounded-full overflow-hidden border-4 border-white shadow-xl bg-[#E3F3FB] flex items-center justify-center">
                <svg viewBox="0 0 200 200" className="w-full h-full" aria-label="Enrique Polidori">
                  <defs>
                    <linearGradient id="avatarBg2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#b8d9ee"/>
                      <stop offset="100%" stopColor="#e3f3fb"/>
                    </linearGradient>
                  </defs>
                  <rect width="200" height="200" fill="url(#avatarBg2)"/>
                  <circle cx="100" cy="72" r="34" fill="#7aabcc"/>
                  <ellipse cx="100" cy="175" rx="62" ry="48" fill="#7aabcc"/>
                  <circle cx="100" cy="68" r="28" fill="#8ec0dc"/>
                  <path d="M38,160 Q60,130 100,125 Q140,130 162,160 L162,200 L38,200 Z" fill="#0671AE" opacity="0.9"/>
                  <path d="M88,125 L100,145 L112,125 L100,130 Z" fill="white" opacity="0.8"/>
                </svg>
              </div>

              {/* Badge circular */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-[#0671AE] rounded-full flex items-center justify-center shadow-lg p-2 text-center">
                <p className="text-white text-[8px] leading-tight font-semibold">
                  Te acompañamos en todo el proceso de compra
                </p>
              </div>
            </div>

            {/* Trust items */}
            <div className="grid grid-cols-1 gap-3 mt-6">
              {trustItems.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#EBF7CC] rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon size={15} className="text-[#65A81A]" aria-hidden="true" />
                  </div>
                  <span className="text-[#4A6275] text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: texto + contacto + CTAs */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B] leading-tight mb-3">
              Conversemos con{" "}
              <span className="text-[#0671AE]">tu asesor</span>
            </h2>
            <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mb-4" />
            <p className="text-[#4A6275] text-base mb-6 leading-relaxed">
              Agenda una reunión y recibe orientación personalizada para tu compra o inversión.
            </p>

            {/* Tarjeta asesor */}
            <div className="bg-white rounded-2xl p-5 shadow-sm mb-8 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E3F3FB] flex items-center justify-center flex-shrink-0">
                <UserCheck size={20} className="text-[#0671AE]" aria-hidden="true" />
              </div>
              <div>
                <p className="font-bold text-[#033D6B]">Enrique Polidori</p>
                <p className="text-[#4A6275] text-sm">ventas_carrera@almago.cl</p>
              </div>
            </div>

            {/* Datos de contacto */}
            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E3F3FB] rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-[#0671AE]" aria-hidden="true" />
                </div>
                <a href="tel:+56995350637" className="text-[#033D6B] font-semibold hover:text-[#0671AE] transition-colors">
                  +56 9 9535 0637
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E3F3FB] rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock size={15} className="text-[#0671AE]" aria-hidden="true" />
                </div>
                <span className="text-[#4A6275] text-sm">Lunes a domingo · 10:00 a 19:00 hrs.</span>
              </div>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <a
                href="#agenda"
                className="inline-flex items-center gap-2 bg-[#033D6B] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#022d52] transition-colors text-sm"
              >
                Agendar reunión
              </a>
              <a
                href="https://wa.me/56995350637"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#84CE25] text-white font-semibold px-6 py-3 rounded-full hover:bg-[#65A81A] transition-colors text-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.998 0C5.373 0 .007 5.367.007 11.993c0 2.117.553 4.101 1.518 5.832L0 24l6.335-1.495c1.645.895 3.516 1.41 5.663 1.41 6.625 0 11.991-5.367 11.991-11.993S18.623 0 11.998 0zm0 21.836c-1.95 0-3.761-.522-5.324-1.424l-.38-.226-3.961.936.986-3.854-.249-.4A9.823 9.823 0 012.17 11.993c0-5.43 4.4-9.839 9.83-9.839 5.428 0 9.828 4.409 9.828 9.839 0 5.431-4.4 9.843-9.83 9.843z"/>
                </svg>
                Conversar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
