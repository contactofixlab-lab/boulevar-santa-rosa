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
        <Script src="https://cdn.mobysuite.com/quote/js/app.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
