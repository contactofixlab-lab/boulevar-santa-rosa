"use client";

import { useMemo, useRef, useState } from "react";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { agruparTipologias, contarPorPiso, esDisponible, type Tipologia } from "@/cotizador/lib/tipologias";
import { PasosCotizador } from "./PasosCotizador";
import { FaseDepartamento } from "./FaseDepartamento";
import { FaseExtras } from "./FaseExtras";
import { FaseDatos, DATOS_VACIOS, type DatosCliente } from "./FaseDatos";
import { FaseResumen, type EstadoCotizacion } from "./FaseResumen";
import { CotizadorMobile } from "@/cotizador/components/mobile/CotizadorMobile";

interface CotizadorProps {
  /** Catálogo del proyecto — `getAvailableAssets({ realEstate, projectId })`. */
  assets: MobysuiteAsset[];
  /** Nombre del proyecto, solo para el encabezado de la cotización. */
  nombreProyecto?: string;
  /**
   * URL del logo del proyecto/edificio (no el de la empresa: ese ya está en
   * los colores y tipografía). Opcional — sin logo por defecto, para que el
   * módulo siga siendo brand-neutral en cualquier proyecto que no lo pase.
   * Si la página anfitriona ya muestra el logo en su propio header, no hace
   * falta pasarlo acá también.
   */
  logoUrl?: string;
  /** Texto alternativo del logo; por defecto usa `nombreProyecto`. */
  logoAlt?: string;
}

/**
 * Cotizador en 4 fases, pensado como módulo estándar para insertar en la
 * página de cualquier proyecto: no trae logo ni identidad del edificio, ni
 * título o bajada propios — cada página aporta su propio encabezado antes de
 * insertar este componente, para no duplicar ni desentonar con el resto de
 * la página. Solo trae los colores y tipografía de la empresa. Todo el
 * contenido (tipologías, unidades, características, planos y altura del
 * edificio) sale de la API de Mobysuite, así que cambia solo con el
 * `projectId` que alimente `assets`. El logo del proyecto es opcional vía
 * `logoUrl`, para el caso en que la página anfitriona quiera mostrarlo
 * arriba del propio cotizador en vez de (o además de) en su header.
 */
export function Cotizador({ assets, nombreProyecto, logoUrl, logoAlt }: CotizadorProps) {
  const tipologias = useMemo(() => agruparTipologias(assets), [assets]);
  const pisos = useMemo(() => contarPorPiso(assets), [assets]);

  // `units` ahora trae también las vendidas (para mostrarlas tachadas en el
  // selector), así que la unidad por defecto debe ser explícitamente una
  // disponible y no simplemente la primera de la lista.
  const primeraDisponible = (t?: Tipologia) => t?.units.find(esDisponible) ?? t?.units[0];

  const [fase, setFase] = useState(1);
  const [tipologiaKey, setTipologiaKey] = useState(tipologias[0]?.key);
  const [unidadId, setUnidadId] = useState(primeraDisponible(tipologias[0])?.id);
  const [extras, setExtras] = useState<number[]>([]);
  const [datos, setDatos] = useState<DatosCliente>(DATOS_VACIOS);
  const raiz = useRef<HTMLDivElement>(null);
  const [cotizacion, setCotizacion] = useState<EstadoCotizacion>({ estado: "idle" });

  const tipologia = tipologias.find((t) => t.key === tipologiaKey) ?? tipologias[0];
  const unidad = tipologia?.units.find((u) => u.id === unidadId) ?? primeraDisponible(tipologia);

  if (!tipologia || !unidad) {
    return (
      <p className="rounded-xl border-2 border-surface-blue bg-white px-5 py-4 text-sm text-slate-blue">
        No hay departamentos disponibles para cotizar en este proyecto.
      </p>
    );
  }

  const seleccionarTipologia = (t: Tipologia) => {
    setTipologiaKey(t.key);
    setUnidadId(primeraDisponible(t)?.id);
  };

  const alternarExtra = (id: number) =>
    setExtras((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const irA = (siguiente: number) => {
    setFase(siguiente);
    // Si vuelve atrás puede cambiar la selección: la cotización ya registrada deja de corresponder.
    if (siguiente < 4) setCotizacion({ estado: "idle" });
    // Dentro de una página larga: vuelve al inicio del cotizador, no al de la web.
    raiz.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const reiniciar = () => {
    setExtras([]);
    setDatos(DATOS_VACIOS);
    setTipologiaKey(tipologias[0].key);
    setUnidadId(primeraDisponible(tipologias[0])?.id);
    irA(1);
  };

  const extrasSeleccionados = assets.filter((a) => extras.includes(a.id));

  // Registra la cotización en Mobysuite (servidor). Una sola vez por selección,
  // aunque se pulse más de un botón o se gire el dispositivo.
  const cotizar = async () => {
    if (cotizacion.estado === "enviando" || cotizacion.estado === "listo") return;
    setCotizacion({ estado: "enviando" });
    try {
      const res = await fetch("/api/cotizador/cotizar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ departamentoId: unidad.id, extrasIds: extras, datos }),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok || !json?.ok) {
        setCotizacion({
          estado: "error",
          mensaje: json?.mensaje ?? "No pudimos registrar tu cotización. Inténtalo de nuevo.",
        });
        return;
      }
      setCotizacion({ estado: "listo", codigo: json.codigo ?? null });
    } catch {
      setCotizacion({ estado: "error", mensaje: "No hay conexión. Revisa tu internet e inténtalo de nuevo." });
    }
  };

  // Al pasar de "Tus datos" a la cotización, esta se registra sola en Mobysuite.
  const verCotizacion = () => {
    irA(4);
    void cotizar();
  };

  const props = {
    assets,
    tipologias,
    pisos,
    tipologia,
    unidad,
    extras,
    extrasSeleccionados,
    datos,
    fase,
    nombreProyecto,
    onTipologia: seleccionarTipologia,
    onUnidad: setUnidadId,
    onToggleExtra: alternarExtra,
    onDatos: setDatos,
    onIrA: (siguiente: number) => (siguiente === 4 ? verCotizacion() : irA(siguiente)),
    onOmitirExtras: () => {
      setExtras([]);
      irA(3);
    },
    onNuevaCotizacion: reiniciar,
    cotizacion,
    onCotizar: cotizar,
  };

  return (
    <div ref={raiz} className="scroll-mt-24">
      {/* Logo del proyecto: solo se dibuja si la página anfitriona lo pasa. */}
      {logoUrl && (
        <div className="no-print flex justify-center">
          {/* <img> nativo, no next/image: este módulo se inserta en proyectos
              Next.js distintos y no todos van a tener el dominio del logo
              configurado en su `next.config`. */}
          <img
            src={logoUrl}
            alt={logoAlt ?? nombreProyecto ?? "Logo del proyecto"}
            className="h-12 w-auto object-contain sm:h-14"
          />
        </div>
      )}

      {/* Teléfono y tablet vertical: estructura propia, no el escritorio encogido.
          El estado vive acá, así que girar el dispositivo no pierde la selección. */}
      <div className="mt-6 lg:hidden">
        <CotizadorMobile {...props} />
      </div>

      {/* Escritorio */}
      <div className="hidden lg:block">
        <div className="no-print mt-6">
          <PasosCotizador fase={fase} />
        </div>

        <div className="mt-8">
          {fase === 1 && (
          <FaseDepartamento
            tipologias={tipologias}
            pisos={pisos}
            tipologia={tipologia}
            unidad={unidad}
            onTipologia={seleccionarTipologia}
            onUnidad={setUnidadId}
            onContinuar={() => irA(2)}
          />
        )}

        {fase === 2 && (
          <FaseExtras
            assets={assets}
            departamento={unidad}
            extras={extras}
            onToggleExtra={alternarExtra}
            onAtras={() => irA(1)}
            onContinuar={() => irA(3)}
            onOmitir={() => {
              setExtras([]);
              irA(3);
            }}
          />
        )}

        {fase === 3 && (
          <FaseDatos
            datos={datos}
            onCambio={setDatos}
            onAtras={() => irA(2)}
            onContinuar={verCotizacion}
          />
        )}

          {fase === 4 && (
            <FaseResumen
              departamento={unidad}
              extras={extrasSeleccionados}
              datos={datos}
              nombreProyecto={nombreProyecto}
              onAtras={() => irA(3)}
              onNuevaCotizacion={reiniciar}
              cotizacion={cotizacion}
              onCotizar={cotizar}
            />
          )}
        </div>
      </div>
    </div>
  );
}
