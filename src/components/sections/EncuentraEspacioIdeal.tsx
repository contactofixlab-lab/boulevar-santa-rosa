import "@/cotizador/cotizador.css";
import type { MobysuiteAsset } from "@/cotizador/lib/mobysuite";
import { getCatalogo } from "@/cotizador/lib/mobysuite/admin";
import { Cotizador } from "@/cotizador/components/sections/Cotizador";
import { NOMBRE_PROYECTO, PROYECTO } from "@/cotizador/config";

// Cotizador 2.0 (src/cotizador): catálogo en vivo desde Mobysuite, con el estado real de cada bien.
export const EncuentraEspacioIdeal = async () => {
  let assets: MobysuiteAsset[] | null = null;
  try {
    assets = await getCatalogo(PROYECTO);
  } catch {
    // Si Mobysuite no responde se muestra un aviso en esta sección, sin tumbar el resto de la página.
  }

  return (
    <section className="bg-surface-light py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#033D6B]">
            Encuentra tu{" "}
            <span className="text-[#0671AE]">espacio ideal</span>
          </h2>
          <div className="w-14 h-[3px] bg-[#84CE25] rounded-full mx-auto mt-3" />
        </div>

        {assets ? (
          <div className="text-secondary-navy">
            <Cotizador assets={assets} nombreProyecto={NOMBRE_PROYECTO} />
          </div>
        ) : (
          <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
            <p className="text-lg font-bold text-secondary-navy">
              No pudimos cargar los departamentos disponibles
            </p>
            <p className="mt-2 text-sm text-slate-blue">
              Estamos teniendo un inconveniente momentáneo. Déjanos tus datos y un ejecutivo te
              ayudará a cotizar.
            </p>
            <a
              href="#agenda"
              className="mt-5 inline-flex items-center justify-center rounded-lg bg-primary-blue px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary-navy"
            >
              Agenda tu visita
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
