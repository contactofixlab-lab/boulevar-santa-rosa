import { CotizadorDetalle } from "@/components/sections/CotizadorDetalle";
import { getTipologiasFromMobysuite } from "@/lib/mobysuite/api";

export const metadata = { title: "Cotizador (embed) - Boulevard Santa Rosa" };

/**
 * Página minimalista sin Header/Footer, pensada para ser cargada dentro
 * de un <iframe> (Modo A). Hace de stand-in del cotizador externo de
 * Mobysuite hasta tener la URL real.
 */
export default async function CotizadorEmbedPage() {
  const { data } = await getTipologiasFromMobysuite();

  return (
    <div className="min-h-screen bg-surface-light px-6 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-primary-blue mb-1">Cotiza tu espacio</h1>
        <p className="text-sm text-slate-blue mb-6">Boulevard Santa Rosa · vista embebida</p>
        <CotizadorDetalle tipologias={data} />
      </div>
    </div>
  );
}
