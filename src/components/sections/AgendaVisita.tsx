"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  ArrowRight,
  User,
  Home,
  MessageSquare,
  ChevronDown,
  CalendarCheck,
} from "lucide-react";

const phones = [
  { text: "+56 9 9535 0637", href: "tel:+56995350637" },
  { text: "+56 2 9535 0637", href: "tel:+56229535637" },
];

type FieldProps = {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
};

const FormField = ({ icon: Icon, label, name, type = "text", value, onChange, placeholder }: FieldProps) => (
  <div>
    <label className="block text-[11px] font-semibold text-[#4A6275] uppercase tracking-wide mb-1.5">
      {label}
    </label>
    <div className="relative">
      <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0671AE]/50" aria-hidden="true" />
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-[#F4F9FB] border border-transparent rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#033D6B]
                   placeholder:text-[#4A6275]/50 focus:outline-none focus:bg-white focus:border-[#0671AE]
                   focus:ring-4 focus:ring-[#0671AE]/10 transition-all"
      />
    </div>
  </div>
);

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
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Barra de acento con los colores de marca */}
            <div className="h-1.5 bg-gradient-to-r from-[#0671AE] via-[#5BB8EC] to-[#84CE25]" />

            <div className="p-6 md:p-8">
              {/* Header del formulario */}
              <div className="flex items-center gap-3 mb-6">
                <span className="w-10 h-10 rounded-xl bg-[#E3F3FB] flex items-center justify-center flex-shrink-0">
                  <CalendarCheck size={18} className="text-[#0671AE]" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[#033D6B] font-semibold text-sm leading-tight">Completa tus datos</p>
                  <p className="text-[#4A6275] text-xs">Te contactamos en menos de 24 horas</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-3.5">
                <FormField
                  icon={User}
                  label="Nombre completo"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                />
                <FormField
                  icon={Mail}
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                />
                <FormField
                  icon={Phone}
                  label="Teléfono"
                  name="telefono"
                  type="tel"
                  value={form.telefono}
                  onChange={handleChange}
                  placeholder="+56 9..."
                />
                <div>
                  <label className="block text-[11px] font-semibold text-[#4A6275] uppercase tracking-wide mb-1.5">
                    ¿En qué estás interesado?
                  </label>
                  <div className="relative">
                    <Home size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0671AE]/50 pointer-events-none" aria-hidden="true" />
                    <select
                      name="interes"
                      value={form.interes}
                      onChange={handleChange}
                      className="w-full bg-[#F4F9FB] border border-transparent rounded-xl pl-10 pr-9 py-3 text-sm text-[#033D6B]
                                 focus:outline-none focus:bg-white focus:border-[#0671AE] focus:ring-4 focus:ring-[#0671AE]/10
                                 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="comprar">Comprar para vivir</option>
                      <option value="invertir">Invertir</option>
                      <option value="informacion">Información general</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#4A6275]/60 pointer-events-none" aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-[11px] font-semibold text-[#4A6275] uppercase tracking-wide mb-1.5">
                  Mensaje
                </label>
                <div className="relative">
                  <MessageSquare size={16} className="absolute left-3.5 top-3.5 text-[#0671AE]/50" aria-hidden="true" />
                  <textarea
                    name="mensaje"
                    value={form.mensaje}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Cuéntanos qué buscas..."
                    className="w-full bg-[#F4F9FB] border border-transparent rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#033D6B] resize-none
                               placeholder:text-[#4A6275]/50 focus:outline-none focus:bg-white focus:border-[#0671AE]
                               focus:ring-4 focus:ring-[#0671AE]/10 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <label className="flex items-center gap-2.5 text-xs text-[#4A6275] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="acepta"
                    checked={form.acepta}
                    onChange={handleChange}
                    className="w-4 h-4 rounded-md border-gray-300 accent-[#0671AE] focus:ring-[#0671AE]/30 cursor-pointer"
                  />
                  Acepto la{" "}
                  <a href="#" className="text-[#0671AE] font-medium hover:underline">política de privacidad</a>
                </label>

                <button className="group inline-flex items-center gap-2 bg-[#0671AE] hover:bg-[#055A8C] text-white
                                   font-semibold px-7 py-3 text-sm rounded-full shadow-lg shadow-[#0671AE]/25
                                   hover:shadow-xl hover:shadow-[#0671AE]/30 hover:-translate-y-0.5 transition-all">
                  Enviar solicitud
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
