"use client";

import { useState } from "react";
import { Phone, Mail, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

const contactInfo = [
  { icon: Phone,  text: "+56 9 9535 0637",          href: "tel:+56995350637" },
  { icon: Mail,   text: "ventas_carrera@almago.cl",  href: "mailto:ventas_carrera@almago.cl" },
  { icon: Clock,  text: "Lun–Dom · 10:00–19:00 hrs.", href: undefined },
  { icon: MapPin, text: "San Miguel, Santiago",       href: undefined },
];

export const AgendaVisita = () => {
  const [form, setForm] = useState({ nombre: "", email: "", telefono: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <section id="agenda" className="relative bg-[#033D6B] overflow-hidden">

      {/* Wave superior desde sección anterior */}
      <div className="absolute top-0 left-0 right-0 leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="block w-full h-16 md:h-20" fill="white">
          <path d="M0,20 C240,80 480,0 720,40 C960,80 1200,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* Radial glow decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 80% 50%, #0671AE25 0%, transparent 60%)" }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">

        {/* ── IZQUIERDA: imagen / render del proyecto ── */}
        <div className="relative overflow-hidden min-h-[256px] lg:min-h-full">
          {/* Imagen placeholder — render del edificio */}
          <svg
            viewBox="0 0 720 640"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid slice"
            aria-label="Vista del proyecto Boulevard Santa Rosa"
          >
            <defs>
              <linearGradient id="agSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0e3560" />
                <stop offset="60%" stopColor="#1a5080" />
                <stop offset="100%" stopColor="#0671AE" />
              </linearGradient>
              <linearGradient id="agBldg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1a4a7a" />
                <stop offset="100%" stopColor="#0e3060" />
              </linearGradient>
            </defs>

            {/* Fondo cielo nocturno */}
            <rect width="720" height="640" fill="url(#agSky)" />

            {/* Estrellas */}
            {[
              [60,40],[150,80],[250,30],[380,60],[500,25],[620,70],
              [90,120],[300,100],[450,90],[580,115],[700,50],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="1.2" fill="white" opacity="0.6" />
            ))}

            {/* Luna */}
            <circle cx="620" cy="65" r="22" fill="#f0e8c8" opacity="0.9" />
            <circle cx="630" cy="58" r="16" fill="url(#agSky)" opacity="0.7" />

            {/* Árbol izquierdo */}
            <ellipse cx="55" cy="540" rx="55" ry="38" fill="#0d3a18" opacity="0.85" />
            <ellipse cx="25" cy="548" rx="32" ry="24" fill="#0a2f14" opacity="0.75" />

            {/* Árbol derecho */}
            <ellipse cx="668" cy="535" rx="52" ry="36" fill="#0d3a18" opacity="0.82" />

            {/* Edificio principal */}
            <rect x="120" y="90" width="340" height="520" rx="3" fill="url(#agBldg)" />

            {/* Ventanas iluminadas edificio principal — patrón determinista */}
            {Array.from({ length: 16 }, (_, row) =>
              [138, 176, 214, 252, 292, 332, 372, 410].map((x, col) => {
                const y = 108 + row * 30;
                // Patrón determinista: ventana iluminada si (row*3 + col*7) % 5 !== 0
                const lit = (row * 3 + col * 7) % 5 !== 0;
                return (
                  <rect
                    key={`w${row}-${x}`}
                    x={x} y={y} width="22" height="17" rx="2"
                    fill={lit ? "#f8d978" : "#0a2a50"}
                    opacity={lit ? 0.92 : 0.6}
                  />
                );
              })
            )}

            {/* Edificio fondo derecho */}
            <rect x="470" y="160" width="200" height="460" rx="2" fill="#142840" opacity="0.9" />
            {Array.from({ length: 14 }, (_, row) =>
              [486, 516, 546, 576, 606, 636, 652].map((x, col) => {
                const y = 178 + row * 30;
                const lit = (row * 5 + col * 3) % 4 !== 1;
                return (
                  <rect key={`wb${row}-${x}`} x={x} y={y} width="18" height="14" rx="1"
                    fill={lit ? "#f0c860" : "#0a2240"} opacity={lit ? 0.85 : 0.5} />
                );
              })
            )}

            {/* Fachada iluminada principal */}
            <rect x="120" y="80" width="340" height="15" rx="2" fill="#0671AE" opacity="0.6" />

            {/* Reflejo en suelo */}
            <rect x="0" y="610" width="720" height="30" fill="#062040" opacity="0.8" />
            <rect x="0" y="600" width="720" height="10" fill="#0671AE" opacity="0.2" />
          </svg>

          {/* Overlay gradiente derecho para transición al formulario */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(to right, transparent 60%, #033D6B 100%)" }}
          />
          {/* Overlay gradiente superior (wave) */}
          <div
            className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
            style={{ background: "linear-gradient(to bottom, #033D6B 0%, transparent 100%)" }}
          />

          {/* Badge proyecto */}
          <div className="absolute bottom-6 left-6 bg-[#033D6B]/80 backdrop-blur-sm border border-white/15 rounded-xl px-4 py-3">
            <p className="text-white text-xs font-bold tracking-wide">BOULEVARD SANTA ROSA</p>
            <p className="text-[#84CE25] text-xs font-semibold">San Miguel · Entrega 2027</p>
          </div>
        </div>

        {/* ── DERECHA: título + datos de contacto + formulario ── */}
        <div className="flex flex-col justify-center px-6 md:px-10 pt-16 pb-10 lg:pt-16">
          <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
            Agenda tu{" "}
            <span className="text-[#84CE25]">visita</span>
          </h2>
          <div className="w-12 h-[2px] bg-[#84CE25] rounded-full mb-4" />
          <p className="text-white/70 text-xs leading-relaxed mb-6">
            Visita nuestro departamento piloto y conoce de primera mano la calidad y diseño de Boulevard Santa Rosa.
          </p>

          {/* Datos de contacto */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {contactInfo.map(({ icon: Icon, text, href }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon size={11} className="text-[#84CE25]" aria-hidden="true" />
                </div>
                {href ? (
                  <a href={href} className="text-white/75 text-xs hover:text-white transition-colors">{text}</a>
                ) : (
                  <span className="text-white/75 text-xs">{text}</span>
                )}
              </div>
            ))}
          </div>

          {/* Formulario */}
          <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-xl p-4">
            <div className="space-y-2 mb-4">
              {[
                { name: "nombre",   label: "Nombre", type: "text",  placeholder: "Tu nombre" },
                { name: "email",    label: "Email",  type: "email", placeholder: "tu@email.com" },
                { name: "telefono", label: "Teléfono", type: "tel",   placeholder: "+56 9..." },
              ].map(({ name, label, type, placeholder }) => (
                <div key={name}>
                  <label className="block text-xs font-medium text-white/70 mb-0.5">{label}</label>
                  <input
                    type={type}
                    name={name}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#84CE25]/60 transition"
                    placeholder={placeholder}
                    value={form[name as keyof typeof form]}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button variant="primary" size="md" className="flex-1 bg-[#0671AE] hover:bg-[#0559A0] text-white text-xs py-2">
                Agendar reunión
              </Button>
              <a
                href="https://wa.me/56995350637"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1 bg-[#84CE25] hover:bg-[#7BB820] text-[#033D6B] font-semibold px-3 py-2 rounded-lg transition-colors text-xs"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M11.998 0C5.373 0 .007 5.367.007 11.993c0 2.117.553 4.101 1.518 5.832L0 24l6.335-1.495c1.645.895 3.516 1.41 5.663 1.41 6.625 0 11.991-5.367 11.991-11.993S18.623 0 11.998 0zm0 21.836c-1.95 0-3.761-.522-5.324-1.424l-.38-.226-3.961.936.986-3.854-.249-.4A9.823 9.823 0 012.17 11.993c0-5.43 4.4-9.839 9.83-9.839 5.428 0 9.828 4.409 9.828 9.839 0 5.431-4.4 9.843-9.83 9.843z"/>
                </svg>
                WhatsApp
              </a>
            </div>

            <p className="text-white/40 text-xs text-center mt-2">
              Al enviar aceptas nuestra política de privacidad.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
