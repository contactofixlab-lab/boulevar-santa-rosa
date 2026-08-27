"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import {
  Phone,
  Mail,
  ArrowRight,
  User,
  Home,
  MessageSquare,
  ChevronDown,
  CalendarCheck,
  IdCard,
  CheckCircle2,
} from "lucide-react";
import { Icon } from "@/components/ui/Icon";
import { isValidRut, formatRut } from "@/lib/validateRut";

const phones = [
  { text: "56927541955", href: "tel:+56927541955" },
];

// Datos del widget de captura de leads de Mobysuite (mobysuite-form-scrapper).
// Mismo real-estate/project-id que el cotizador ya integrado en este sitio.
const MOBYSUITE_TOKEN = "94+g4ozFll0axwAwnw+WKfhMM48=";
const MOBYSUITE_PROJECT_ID = "4";

type FieldProps = {
  icon: React.ElementType;
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
};

const FormField = ({ icon: Icon, label, name, type = "text", value, onChange, placeholder, error }: FieldProps) => (
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
        className={`w-full bg-[#F4F9FB] border rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#033D6B]
                   placeholder:text-[#4A6275]/50 focus:outline-none focus:bg-white focus:border-[#0671AE]
                   focus:ring-4 focus:ring-[#0671AE]/10 transition-all ${error ? "border-red-400" : "border-transparent"}`}
      />
    </div>
    {error && <p className="mt-1 text-[11px] text-red-500">{error}</p>}
  </div>
);

export const AgendaVisita = () => {
  const [form, setForm] = useState({
    nombre: "",
    rut: "",
    email: "",
    telefono: "",
    interes: "",
    mensaje: "",
    acepta: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const widgetHostRef = useRef<HTMLDivElement>(null);
  const hiddenNameRef = useRef<HTMLInputElement>(null);
  const hiddenLastnameRef = useRef<HTMLInputElement>(null);
  const hiddenObservationRef = useRef<HTMLTextAreaElement>(null);
  const hiddenSubmitRef = useRef<HTMLButtonElement>(null);

  // Monta el web component mobysuite-form-scrapper una vez que el DOM del
  // formulario (y los inputs con id que referencia) ya existe.
  useEffect(() => {
    if (!widgetHostRef.current) return;

    const widget = document.createElement("mobysuite-form-scrapper");
    widget.setAttribute("token", MOBYSUITE_TOKEN);
    widget.setAttribute("name", "mb-name");
    widget.setAttribute("lastname", "mb-lastname");
    widget.setAttribute("rut", "mb-rut");
    widget.setAttribute("email", "mb-email");
    widget.setAttribute("phone", "mb-phone");
    widget.setAttribute("observation", "mb-observation");
    widget.setAttribute("project_id", "mb-project-id");
    widget.setAttribute("submit", "mb-hidden-submit");

    widgetHostRef.current.appendChild(widget);

    return () => {
      if (widgetHostRef.current && widget.parentNode === widgetHostRef.current) {
        widgetHostRef.current.removeChild(widget);
      }
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleRutBlur = () => {
    if (form.rut) setForm((prev) => ({ ...prev, rut: formatRut(prev.rut) }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.nombre.trim()) nextErrors.nombre = "Ingresa tu nombre completo";
    if (!isValidRut(form.rut)) nextErrors.rut = "RUT inválido";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) nextErrors.email = "Correo inválido";
    if (!form.telefono.trim()) nextErrors.telefono = "Ingresa tu teléfono";
    if (!form.acepta) nextErrors.acepta = "Debes aceptar la política de privacidad";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    // Divide "Nombre completo" en nombre/apellido para los campos que
    // el widget de Mobysuite espera por separado.
    const [firstName, ...rest] = form.nombre.trim().split(/\s+/);
    if (hiddenNameRef.current) hiddenNameRef.current.value = firstName ?? "";
    if (hiddenLastnameRef.current) hiddenLastnameRef.current.value = rest.join(" ");

    const observacion = form.interes
      ? `${form.mensaje} ${form.mensaje ? "· " : ""}Interés: ${form.interes}`.trim()
      : form.mensaje;
    if (hiddenObservationRef.current) hiddenObservationRef.current.value = observacion;

    setSending(true);
    // El botón real que escucha el widget mobysuite-form-scrapper
    hiddenSubmitRef.current?.click();

    // Sin callback documentado por Mobysuite para confirmar el envío;
    // mostramos éxito optimista y limpiamos el formulario.
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
      setForm({ nombre: "", rut: "", email: "", telefono: "", interes: "", mensaje: "", acepta: false });
    }, 600);
  };

  return (
    <section id="agenda" className="relative bg-[#033D6B] overflow-hidden">

      {/* Script del widget de captura de leads (se carga una sola vez) */}
      <Script src="https://cdn.mobysuite.com/form-scrapper/js/app.js" strategy="lazyOnload" />

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

      <div className="relative z-30 max-w-7xl mx-auto px-6 py-14 md:py-16 lg:py-20">
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
                    <Icon name="telefono" size={13} className="text-[#033D6B]" aria-hidden="true" />
                  </span>
                  {text}
                </a>
              ))}
            </div>

            <a
              href="mailto:arodriguez@iencinas.cl"
              className="inline-flex items-center gap-2 text-white/75 hover:text-white text-sm transition-colors"
            >
              <Mail size={15} aria-hidden="true" />
              arodriguez@iencinas.cl
            </a>
          </div>

          {/* ── CENTRO: formulario blanco ── */}
          <div className="bg-white rounded-3xl shadow-2xl shadow-black/20 overflow-hidden">
            {/* Barra de acento con los colores de marca */}
            <div className="h-1.5 bg-gradient-to-r from-[#0671AE] via-[#5BB8EC] to-[#84CE25]" />

            <div className="p-4 md:p-5 lg:p-8">
              {sent ? (
                <div className="flex flex-col items-center text-center py-10 gap-3">
                  <span className="w-14 h-14 rounded-full bg-[#EBF7CC] flex items-center justify-center">
                    <CheckCircle2 size={28} className="text-[#65A81A]" aria-hidden="true" />
                  </span>
                  <p className="text-[#033D6B] font-semibold text-base">¡Solicitud enviada!</p>
                  <p className="text-[#4A6275] text-sm max-w-xs">
                    Gracias por tu interés. Te contactaremos en menos de 24 horas.
                  </p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-2 text-[#0671AE] text-sm font-medium hover:underline"
                  >
                    Enviar otra solicitud
                  </button>
                </div>
              ) : (
                <>
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
                      error={errors.nombre}
                    />
                    <div>
                      <label className="block text-[11px] font-semibold text-[#4A6275] uppercase tracking-wide mb-1.5">
                        RUT
                      </label>
                      <div className="relative">
                        <IdCard size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#0671AE]/50" aria-hidden="true" />
                        <input
                          type="text"
                          name="rut"
                          value={form.rut}
                          onChange={handleChange}
                          onBlur={handleRutBlur}
                          placeholder="12.345.678-9"
                          className={`w-full bg-[#F4F9FB] border rounded-xl pl-10 pr-3.5 py-3 text-sm text-[#033D6B]
                                     placeholder:text-[#4A6275]/50 focus:outline-none focus:bg-white focus:border-[#0671AE]
                                     focus:ring-4 focus:ring-[#0671AE]/10 transition-all ${errors.rut ? "border-red-400" : "border-transparent"}`}
                        />
                      </div>
                      {errors.rut && <p className="mt-1 text-[11px] text-red-500">{errors.rut}</p>}
                    </div>
                    <FormField
                      icon={Mail}
                      label="Correo electrónico"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                      error={errors.email}
                    />
                    <FormField
                      icon={Phone}
                      label="Teléfono"
                      name="telefono"
                      type="tel"
                      value={form.telefono}
                      onChange={handleChange}
                      placeholder="+56 9..."
                      error={errors.telefono}
                    />
                  </div>

                  <div className="mb-3.5">
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

                  <div className="flex flex-wrap items-start justify-between gap-4 pt-1">
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

                    <button
                      type="button"
                      disabled={sending}
                      onClick={handleSubmit}
                      className="group inline-flex items-center gap-2 bg-[#0671AE] hover:bg-[#055A8C] text-white
                                 font-semibold px-7 py-3 text-sm rounded-full shadow-lg shadow-[#0671AE]/25
                                 hover:shadow-xl hover:shadow-[#0671AE]/30 hover:-translate-y-0.5 transition-all
                                 disabled:opacity-60 disabled:pointer-events-none"
                    >
                      {sending ? "Enviando..." : "Enviar solicitud"}
                      <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                    </button>
                  </div>
                  {errors.acepta && <p className="mt-2 text-[11px] text-red-500 text-right">{errors.acepta}</p>}
                </>
              )}

              {/* Campos ocultos leídos por el widget mobysuite-form-scrapper por su id */}
              <div ref={widgetHostRef} className="hidden" aria-hidden="true">
                <input ref={hiddenNameRef} type="text" id="mb-name" readOnly />
                <input ref={hiddenLastnameRef} type="text" id="mb-lastname" readOnly />
                <input type="text" id="mb-rut" value={form.rut} readOnly />
                <input type="text" id="mb-email" value={form.email} readOnly />
                <input type="text" id="mb-phone" value={form.telefono} readOnly />
                <textarea ref={hiddenObservationRef} id="mb-observation" readOnly />
                <input type="text" id="mb-project-id" value={MOBYSUITE_PROJECT_ID} readOnly />
                <button ref={hiddenSubmitRef} type="button" id="mb-hidden-submit" tabIndex={-1} />
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};
