"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatRut, isValidEmail, isValidRut } from "@/cotizador/lib/validators";
import { Campo, CampoTelefono, CampoTexto } from "@/cotizador/components/ui/campos";
import { Selector } from "@/cotizador/components/ui/Selector";
import { PAIS_POR_DEFECTO, buscarPais } from "@/cotizador/lib/paises";

export interface DatosCliente {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  rut: string;
  email: string;
  codigoPais: string;
  telefono: string;
  destinoCompra: string;
  rangoRenta: string;
  rangoEdad: string;
}

export const DATOS_VACIOS: DatosCliente = {
  nombre: "",
  apellidoPaterno: "",
  apellidoMaterno: "",
  rut: "",
  email: "",
  codigoPais: PAIS_POR_DEFECTO,
  telefono: "",
  destinoCompra: "",
  rangoRenta: "",
  rangoEdad: "",
};

/* Campos que Mobysuite marca como incluidos/obligatorios para el producto
   "COTIZADOR WEB 2.0" en este proyecto (list-projects → camposRequeridosProductos):
   Destino compra, Rango renta (obligatorio) y Rango edad (obligatorio). */
const opciones = (valores: string[]) => valores.map((v) => ({ valor: v, texto: v }));

const DESTINOS = opciones(["Primera vivienda", "Segunda vivienda", "Inversión"]);
const RANGOS_RENTA = opciones([
  "Menos de $1.000.000",
  "$1.000.000 – $1.500.000",
  "$1.500.000 – $2.500.000",
  "$2.500.000 – $4.000.000",
  "Más de $4.000.000",
]);
const RANGOS_EDAD = opciones([
  "18 – 25 años",
  "26 – 35 años",
  "36 – 45 años",
  "46 – 55 años",
  "56 años o más",
]);

type Errores = Partial<Record<keyof DatosCliente, string>>;

function validar(d: DatosCliente): Errores {
  const e: Errores = {};
  if (d.nombre.trim().length < 2) e.nombre = "Ingresa tu nombre";
  if (d.apellidoPaterno.trim().length < 2) e.apellidoPaterno = "Ingresa tu apellido paterno";
  // Apellido materno y destino de compra son opcionales: Mobysuite solo marca
  // Rango de renta y Rango de edad como obligatorios para este producto.
  if (!isValidRut(d.rut)) e.rut = "RUT inválido";
  if (!isValidEmail(d.email)) e.email = "Correo inválido";

  // El largo esperado depende del país elegido, no siempre son 9 dígitos.
  const pais = buscarPais(d.codigoPais);
  const digitos = d.telefono.replace(/\D/g, "").length;
  const [min, max] = pais.digitos;
  if (digitos < min || digitos > max) {
    e.telefono = min === max ? `Debe tener ${min} dígitos` : `Debe tener entre ${min} y ${max} dígitos`;
  }
  if (!d.rangoRenta) e.rangoRenta = "Selecciona una opción";
  if (!d.rangoEdad) e.rangoEdad = "Selecciona una opción";
  return e;
}

interface FaseDatosProps {
  datos: DatosCliente;
  onCambio: (datos: DatosCliente) => void;
  onAtras: () => void;
  onContinuar: () => void;
}

export function FaseDatos({ datos, onCambio, onAtras, onContinuar }: FaseDatosProps) {
  const [errores, setErrores] = useState<Errores>({});

  const set = (campo: keyof DatosCliente) => (valor: string) => {
    onCambio({ ...datos, [campo]: valor });
    if (errores[campo]) setErrores((prev) => ({ ...prev, [campo]: undefined }));
  };

  const enviar = (e: React.FormEvent) => {
    e.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) onContinuar();
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
      <form onSubmit={enviar} noValidate>
        {/* Acciones arriba a la derecha, igual que en el resto de las fases. */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h3 className="text-2xl font-bold text-secondary-navy">Tus datos</h3>
            <p className="mt-1 text-sm text-slate-blue">
              Con esta información preparamos tu cotización y un ejecutivo puede contactarte.
            </p>
            <p className="mt-1 text-[11px] text-slate-blue">
              <span className="text-red-500">*</span> Campos obligatorios; el resto son opcionales.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={onAtras}
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-surface-blue px-4 py-2.5 text-sm font-semibold text-secondary-navy transition-colors hover:border-primary-blue hover:text-primary-blue"
            >
              <ArrowLeft size={17} />
              Atrás
            </button>
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-navy"
            >
              Ver mi cotización
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        <div className="mt-6">
        {/* Bloque 1: identificación */}
        <fieldset className="rounded-xl border border-surface-blue p-5">
          <legend className="px-2 text-[11px] font-bold uppercase tracking-wide text-primary-blue">
            Identificación
          </legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Campo label="Nombre" error={errores.nombre} requerido>
              <CampoTexto
                value={datos.nombre}
                onChange={(e) => set("nombre")(e.target.value)}
                error={!!errores.nombre}
                placeholder="Juan"
              />
            </Campo>
            <Campo label="Apellido paterno" error={errores.apellidoPaterno} requerido>
              <CampoTexto
                value={datos.apellidoPaterno}
                onChange={(e) => set("apellidoPaterno")(e.target.value)}
                error={!!errores.apellidoPaterno}
                placeholder="Pérez"
              />
            </Campo>
            <Campo label="Apellido materno" requerido={false}>
              <CampoTexto
                value={datos.apellidoMaterno}
                onChange={(e) => set("apellidoMaterno")(e.target.value)}
                placeholder="González"
              />
            </Campo>
            <Campo label="RUT" error={errores.rut} requerido>
              <CampoTexto
                value={datos.rut}
                onChange={(e) => set("rut")(e.target.value)}
                onBlur={(e) => set("rut")(formatRut(e.target.value))}
                error={!!errores.rut}
                placeholder="12.345.678-9"
              />
            </Campo>
          </div>
        </fieldset>

        {/* Bloque 2: contacto */}
        <fieldset className="mt-5 rounded-xl border border-surface-blue p-5">
          <legend className="px-2 text-[11px] font-bold uppercase tracking-wide text-primary-blue">
            Contacto
          </legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Campo label="Correo electrónico" error={errores.email} requerido>
              <CampoTexto
                type="email"
                value={datos.email}
                onChange={(e) => set("email")(e.target.value)}
                error={!!errores.email}
                placeholder="tu@correo.cl"
              />
            </Campo>
            <Campo
              label="Teléfono"
              error={errores.telefono}
              ayuda="Elige el país si tu número no es chileno"
              requerido
            >
              <CampoTelefono
                codigoPais={datos.codigoPais}
                onCodigoPais={set("codigoPais")}
                value={datos.telefono}
                onChange={(e) => set("telefono")(e.target.value)}
                error={!!errores.telefono}
                placeholder="912345678"
              />
            </Campo>
          </div>
        </fieldset>

        {/* Bloque 3: perfil (lo que pide Mobysuite) */}
        <fieldset className="mt-5 rounded-xl border border-surface-blue p-5">
          <legend className="px-2 text-[11px] font-bold uppercase tracking-wide text-primary-blue">
            Sobre tu búsqueda
          </legend>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            <Campo label="Destino de la compra" requerido={false}>
              <Selector
                valor={datos.destinoCompra}
                onCambio={set("destinoCompra")}
                opciones={DESTINOS}
              />
            </Campo>
            <Campo label="Rango de renta" error={errores.rangoRenta} requerido>
              <Selector
                valor={datos.rangoRenta}
                onCambio={set("rangoRenta")}
                error={!!errores.rangoRenta}
                opciones={RANGOS_RENTA}
              />
            </Campo>
            <Campo label="Rango de edad" error={errores.rangoEdad} requerido>
              <Selector
                valor={datos.rangoEdad}
                onCambio={set("rangoEdad")}
                error={!!errores.rangoEdad}
                opciones={RANGOS_EDAD}
              />
            </Campo>
          </div>
        </fieldset>

        </div>
      </form>
    </section>
  );
}
