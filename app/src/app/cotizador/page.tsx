import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionHeading } from "@/components/shared/SectionHeading";

export const metadata = { title: "Cotizador - Boulevard Santa Rosa" };

export default function CotizadorPage() {
  return (
    <><Header /><main className="pt-32"><section className="py-20"><div className="max-w-7xl mx-auto px-6"><SectionHeading subtitle="Obtén tu" title="Cotización" centered /></div></section></main><Footer /></>
  );
}
