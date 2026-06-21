/**
 * Modo B — Widget JS inyectado. Sin script real de Mobysuite todavía,
 * MOBYSUITE_WIDGET_SCRIPT queda vacío y CotizadorModes simula el montaje
 * (mismo mecanismo que usaría un script de terceros: crea el DOM dentro
 * del contenedor de forma asíncrona) para mostrar cómo se vería.
 */
export const MOBYSUITE_WIDGET_SCRIPT = process.env.NEXT_PUBLIC_MOBYSUITE_WIDGET_SRC || "";

export const MOBYSUITE_WIDGET_CONTAINER_ID = "mobysuite-widget";

export const isMobysuiteWidgetConfigured = Boolean(MOBYSUITE_WIDGET_SCRIPT);
