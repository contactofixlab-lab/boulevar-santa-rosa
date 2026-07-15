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
  icons: {
    icon: [
      { url: "/favicon.ico?v=1", sizes: "any" },
      { url: "/favicon.png?v=1", sizes: "512x512", type: "image/png" },
    ],
  },
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

        {/* Mobysuite Cotizador - Contenedor */}
        <div id="mobysuite-cotizador-boulevard"></div>

        {/* Mobysuite Cotizador Script - Con atributos data-* correctos */}
        <Script
          id="mobysuite-script"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const script = document.createElement('script');
                script.src = 'https://cdn.mobysuite.com/quote/js/app.js';
                script.setAttribute('data-real-estate', 'inesdesuarez');
                script.setAttribute('data-project-id', '4');
                script.setAttribute('data-container', 'mobysuite-cotizador-boulevard');
                script.setAttribute('data-template', 'default');
                script.setAttribute('data-country-code', 'CL');
                script.setAttribute('data-show-real-estate-logo', 'true');
                script.setAttribute('data-show-project-logo', 'true');
                script.setAttribute('data-primary-color', '#0671AE');
                script.setAttribute('data-secondary-color', '#84CE25');
                script.setAttribute('data-success-view-type', 'simple');
                script.setAttribute('data-hide-selected-assets', 'false');
                script.setAttribute('data-use-secondary-image', 'false');
                document.body.appendChild(script);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}
