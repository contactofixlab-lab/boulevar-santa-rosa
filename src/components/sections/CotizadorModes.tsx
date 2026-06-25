"use client";

import { useEffect, useRef, useState } from "react";
import { CotizadorDetalle } from "@/components/sections/CotizadorDetalle";
import type { Tipologia } from "@/lib/data/tipologias";
import { MOBYSUITE_IFRAME_URL } from "@/lib/mobysuite/iframe";
import { MOBYSUITE_WIDGET_SCRIPT, isMobysuiteWidgetConfigured } from "@/lib/mobysuite/widget";

type Mode = "iframe" | "widget" | "api";

const MODES: { id: Mode; label: string; hint: string }[] = [
  { id: "iframe", label: "Modo Iframe", hint: "Embed simple, menos control visual" },
  { id: "widget", label: "Modo Widget", hint: "Script inyectado en el DOM" },
  { id: "api", label: "Modo API", hint: "Integración nativa, control total" },
];

interface CotizadorModesProps {
  tipologias: Tipologia[];
  dataSource: "mobysuite" | "mock";
}

export const CotizadorModes = ({ tipologias, dataSource }: CotizadorModesProps) => {
  const [mode, setMode] = useState<Mode>("api");

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-2">
        {MODES.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              mode === m.id
                ? "bg-primary-blue text-white"
                : "bg-surface-blue text-primary-blue hover:bg-surface-blue/70"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-blue mb-10">
        {MODES.find((m) => m.id === mode)?.hint}
      </p>

      {mode === "iframe" && <IframeMode />}
      {mode === "widget" && <WidgetMode tipologias={tipologias} />}
      {mode === "api" && <ApiMode tipologias={tipologias} dataSource={dataSource} />}
    </div>
  );
};

const ChromeBar = ({ label }: { label: string }) => (
  <div className="flex items-center gap-1.5 bg-slate-100 border-b border-surface-blue rounded-t-2xl px-4 py-2.5">
    <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
    <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
    <span className="ml-3 text-xs text-slate-500 truncate">{label}</span>
  </div>
);

const IframeMode = () => (
  <div className="max-w-5xl mx-auto rounded-2xl border border-surface-blue shadow-lg overflow-hidden">
    <ChromeBar label={MOBYSUITE_IFRAME_URL} />
    <iframe
      src={MOBYSUITE_IFRAME_URL}
      title="Cotizador Boulevard Santa Rosa (vista iframe)"
      className="w-full h-[600px] border-0 bg-white"
    />
  </div>
);

const WidgetMode = ({ tipologias }: { tipologias: Tipologia[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(false);
    const el = containerRef.current;
    if (!el) return;

    if (isMobysuiteWidgetConfigured) {
      const script = document.createElement("script");
      script.src = MOBYSUITE_WIDGET_SCRIPT;
      script.async = true;
      script.onload = () => setLoaded(true);
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }

    // Sin script real todavía: simula el mismo mecanismo (montaje async en el DOM)
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-semibold text-primary-blue uppercase tracking-wide">
          #mobysuite-widget
        </span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            loaded ? "bg-surface-green text-secondary-navy" : "bg-slate-200 text-slate-500"
          }`}
        >
          {loaded ? "Widget cargado ✓" : "Cargando widget…"}
        </span>
      </div>
      <div ref={containerRef} id="mobysuite-widget" className="bg-white rounded-2xl shadow-lg p-8">
        {loaded && <CotizadorDetalle tipologias={tipologias} />}
      </div>
    </div>
  );
};

const ApiMode = ({
  tipologias,
  dataSource,
}: {
  tipologias: Tipologia[];
  dataSource: "mobysuite" | "mock";
}) => (
  <div className="max-w-5xl mx-auto">
    <div className="flex justify-center mb-6">
      <span
        className={`text-xs font-semibold px-3 py-1 rounded-full ${
          dataSource === "mobysuite"
            ? "bg-surface-green text-secondary-navy"
            : "bg-surface-blue text-primary-blue"
        }`}
      >
        {dataSource === "mobysuite" ? "Datos en vivo de Mobysuite" : "Datos mock (Mobysuite no respondió)"}
      </span>
    </div>
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <CotizadorDetalle tipologias={tipologias} />
    </div>
  </div>
);
