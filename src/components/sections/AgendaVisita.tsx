"use client";

import { useState } from "react";
import { Phone, Mail, ArrowRight } from "lucide-react";

const phones = [
  { text: "+56 9 9535 0637", href: "tel:+56995350637" },
  { text: "+56 2 9535 0637", href: "tel:+56229535637" },
];

export const AgendaVisita = () => {
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    telefono: "",
    interes: "",
    mensaje: "",
    acepta: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  return (
    <section id="agenda" className="relative bg-[#033D6B] overflow-hidden">

      {/* ── Curva de entrada desde "Encuentra tu espacio ideal" (blanco, espejada) ── */}
      <svg
        className="absolute top-0 left-0 w-full h-20 md:h-28 pointer-events-none z-20"
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,32 C8,60 30,95 76,103
             L1370,103
             C1390,103 1412,145 1440,200
             L1440,0 L0,0 Z"
          fill="white"
        />
      </svg>

      {/* ── Foto de fondo COMPLETA de toda la sección (pareja + paisaje) ── */}
      <div className="absolute inset-0">
        <img
          src="/renders/Areas-Comunes/Quincho.jpg"
          alt="Pareja disfrutando la vista desde Boulevard Santa Rosa"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "62% 42%" }}
        />
      </div>

      {/* Degradado azul para legibilidad: oscuro a la izquierda (texto/form), despejado a la derecha (pareja+paisaje) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(100deg, #033D6B 0%, #053F6E 28%, rgba(5,63,110,0.92) 42%, rgba(5,63,110,0.55) 58%, rgba(5,63,110,0.15) 72%, rgba(5,63,110,0) 88%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-30 max-w-7xl mx-auto px-6 py-40 md:py-44">
        <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.4fr] gap-8 lg:gap-10 items-center max-w-3xl">

          {/* ── IZQUIERDA: título + descripción + contacto ── */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3">
              Agenda tu{" "}
              <span className="text-[#84CE25]">visita</span>
            </h2>
            <p className="text-white/75 text-sm leading-relaxed mb-6 max-w-xs">
              Conoce tu próximo hogar. Déjanos tus datos y te contactaremos
              para agendar una visita.
            </p>

            <div className="flex flex-col gap-2.5 mb-4">
              {phones.map(({ text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/20 border border-white/15
                             text-white text-sm font-medium rounded-full px-4 py-2.5 transition-colors w-fit"
                >
                  <span className="w-7 h-7 rounded-full bg-[#84CE25] flex items-center justify-center flex-shrink-0">
                    <Phone size={13} className="text-[#033D6B]" aria-hidden="true" />
                  </span>
                  {text}
                </a>
              ))}
            </div>

            <a
              href="mailto:ventas_carrera@almago.cl"
              className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm transition-colors"
            >
              <Mail size={15} aria-hidden="true" />
              ventas_carrera@almago.cl
            </a>
          </div>

          {/* ── CENTRO: formulario blanco ── */}
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-xs font-medium text-[#4A6275] mb-1">Nombre completo</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#033D6B]
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0671AE]/40 focus:border-[#0671AE] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A6275] mb-1">Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#033D6B]
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0671AE]/40 focus:border-[#0671AE] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A6275] mb-1">Teléfono</label>
                <input
                  type="tel"
                  name="telefono"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+56 9..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#033D6B]
                             placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0671AE]/40 focus:border-[#0671AE] transition"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[#4A6275] mb-1">¿En qué estás interesado?</label>
                <select
                  name="interes"
                  value={form.interes}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#033D6B]
                             focus:outline-none focus:ring-2 focus:ring-[#0671AE]/40 focus:border-[#0671AE] transition appearance-none bg-white"
                >
                  <option value="">Selecciona una opción</option>
                  <option value="comprar">Comprar para vivir</option>
                  <option value="invertir">Invertir</option>
                  <option value="informacion">Información general</option>
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-[#4A6275] mb-1">Mensaje</label>
              <textarea
                name="mensaje"
                value={form.mensaje}
                onChange={handleChange}
                rows={3}
                placeholder="Cuéntanos qué buscas..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-[#033D6B] resize-none
                           placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0671AE]/40 focus:border-[#0671AE] transition"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <label className="flex items-center gap-2 text-xs text-[#4A6275] cursor-pointer">
                <input
                  type="checkbox"
                  name="acepta"
                  checked={form.acepta}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-[#0671AE] focus:ring-[#0671AE]/40"
                />
                Acepto la{" "}
                <a href="#" className="text-[#0671AE] hover:underline">política de privacidad</a>
              </label>

              <button className="inline-flex items-center gap-2 bg-[#0671AE] hover:bg-[#0559A0] text-white
                                 font-semibold px-6 py-2.5 text-sm rounded-full transition-colors">
                Enviar
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
