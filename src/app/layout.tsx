import type { Metadata } from "next";
import Script from "next/script";
import { Nunito_Sans } from "next/font/google";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import { CotizadorDialogGlobal } from "@/components/sections/CotizadorDialogGlobal";
import { getTipologiasFromMobysuite } from "@/lib/mobysuite/api";
import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Boulevard Santa Rosa - Departamentos en San Miguel",
  description: "Departamentos, bodegas, locales y estacionamientos en Boulevard Santa Rosa, San Miguel. Desde UF 2.850.",
  keywords: "departamentos San Miguel, boulevard santa rosa, vivienda Santiago, inmobiliario Chile",
  openGraph: {
    title: "Boulevard Santa Rosa",
    description: "Nuevo proyecto inmobiliario en San Miguel",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: tipologias } = await getTipologiasFromMobysuite();

  return (
    <html
      lang="es"
      className={`${nunitoSans.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
        <WhatsAppFAB />
        <CotizadorDialogGlobal tipologias={tipologias} />

        {/* Mobysuite Cotizador Script - Con colores corporativos */}
        <Script
          src="https://cdn.mobysuite.com/quote/js/app.js"
          strategy="lazyOnload"
          data-real-estate="inesdesuarez"
          data-project-id="4"
          data-container="mobysuite-cotizador-boulevard"
          data-template="default"
          data-country-code="CL"
          data-show-real-estate-logo="true"
          data-show-project-logo="true"
          data-primary-color="#0671AE"
          data-secondary-color="#84CE25"
          data-success-view-type="simple"
          data-hide-selected-assets="false"
          data-use-secondary-image="false"
        />
      </body>
    </html>
  );
}
