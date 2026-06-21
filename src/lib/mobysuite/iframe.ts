/**
 * Modo A — Iframe/HTML embed. Mientras no llegue la URL real de Mobysuite,
 * apunta a /cotizador/embed (página propia, sin Header/Footer) para poder
 * demostrar visualmente cómo se comporta un cotizador embebido en iframe.
 */
export const MOBYSUITE_IFRAME_URL =
  process.env.NEXT_PUBLIC_MOBYSUITE_IFRAME_URL || "/cotizador/embed";

export const isMobysuiteIframeConfigured = Boolean(
  process.env.NEXT_PUBLIC_MOBYSUITE_IFRAME_URL
);
