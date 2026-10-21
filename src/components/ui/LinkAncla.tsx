"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/**
 * Enlace a una sección de la portada (`/#cotizador`, `/#agenda`…).
 *
 * El <Link> de Next no vuelve a desplazar la página si la URL ya termina en el mismo `#ancla`: el primer clic
 * funciona y los siguientes (otro botón al mismo destino, o el mismo tras subir con la rueda) no hacen nada.
 * Estando en la portada, este enlace desplaza siempre a la sección; desde otra página navega como un <Link>.
 */
export function LinkAncla({ href, onClick, ...props }: Props) {
  const pathname = usePathname();

  const manejarClic = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || pathname !== "/") return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    const id = href.startsWith("/#") ? href.slice(2) : href.startsWith("#") ? href.slice(1) : null;
    const destino = id ? document.getElementById(id) : null;
    if (!destino) return;

    e.preventDefault();
    const sinAnimacion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    destino.scrollIntoView({ behavior: sinAnimacion ? "auto" : "smooth", block: "start" });
  };

  return <Link href={href} onClick={manejarClic} {...props} />;
}
