"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cotizadorDialogHandle } from "@/lib/cotizadorDialog";

const navLinks = [
  { href: "/proyecto", label: "Proyecto" },
  { href: "/ubicacion", label: "Ubicación" },
  { href: "/tipologias", label: "Departamentos" },
  { href: "/proyecto#areas-comunes", label: "Áreas Comunes" },
  { href: "/#inversion", label: "Inversión" },
  { href: "/contacto", label: "Contacto" },
  { href: "/cotizador-opciones", label: "Opciones Cotizador" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-sm" : "bg-white"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/Boulevard_horizontal_color.png"
            alt="Boulevard Santa Rosa"
            width={180}
            height={60}
            className="h-16 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#033D6B] hover:text-[#0671AE] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="primary"
            size="sm"
            onClick={() => cotizadorDialogHandle.openWithPayload(undefined)}
          >
            Cotizar →
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 text-[#033D6B]"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menú"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#033D6B] hover:text-[#0671AE] transition-colors py-1"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Button
            variant="primary"
            size="sm"
            className="w-full"
            onClick={() => {
              setMobileOpen(false);
              cotizadorDialogHandle.openWithPayload(undefined);
            }}
          >
            Cotizar →
          </Button>
        </div>
      )}
    </header>
  );
};
