"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#ubicacion", label: "Ubicación" },
  { href: "/#conoce", label: "Proyecto" },
  { href: "/#inversion", label: "Invierte" },
  { href: "/#cotizador", label: "Cotizar" },
  { href: "/#agenda", label: "Agendar" },
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
        isScrolled ? "bg-white shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo - desaparece cuando no está scrolleado */}
        <Link href="/" className={`flex items-center transition-all duration-300 ${isScrolled ? "visible opacity-100" : "invisible opacity-0"}`}>
          <Image
            src="/logos/BOULEVARD COLOR.png"
            alt="Boulevard Santa Rosa"
            width={160}
            height={54}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <div className={`hidden lg:flex items-center gap-6 transition-all duration-300 ${isScrolled ? "visible opacity-100" : "invisible opacity-0"}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-[#033D6B] hover:text-[#0671AE] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          className={`lg:hidden p-2 text-[#033D6B] transition-all duration-300 ${isScrolled ? "visible opacity-100" : "invisible opacity-0"}`}
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
        </div>
      )}
    </header>
  );
};
