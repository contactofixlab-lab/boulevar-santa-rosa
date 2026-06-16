import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { WhatsAppFAB } from "@/components/layout/WhatsAppFAB";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${poppins.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <body className="min-h-full flex flex-col bg-white text-slate-900">
        {children}
        <WhatsAppFAB />
      </body>
    </html>
  );
}
