import type { MobysuiteAsset, MobysuiteProjectConfig } from "./types";
import { BROWSER_USER_AGENT, MobysuiteApiError, getAvailableAssets } from "./client";

/**
 * API ADMINISTRATIVA de Mobysuite (OAuth2). Solo se usa desde el servidor:
 * las credenciales viven en variables de entorno SIN prefijo NEXT_PUBLIC_, así
 * que nunca llegan al navegador. Ver docs/API-MOBYSUITE.md.
 *
 * Frente a la API pública del cotizador, trae TODOS los bienes con su estado
 * real (disponible, reservado, promesado…) y permite crear cotizaciones.
 */

function credenciales() {
  const host = process.env.MOBYSUITE_HOST?.replace(/\/$/, "");
  const clientId = process.env.MOBYSUITE_CLIENT_ID;
  const clientSecret = process.env.MOBYSUITE_CLIENT_SECRET;
  if (!host || !clientId || !clientSecret) {
    throw new MobysuiteApiError("Faltan las credenciales de Mobysuite (MOBYSUITE_*)");
  }
  return { host, clientId, clientSecret };
}

/**
 * `cacheSegundos` solo en lecturas de página: el token dura 120 min, y un
 * `fetch` con `no-store` volvería dinámica (sin caché) toda la página de inicio.
 */
async function pedirToken(cacheSegundos?: number): Promise<string> {
  const { host, clientId, clientSecret } = credenciales();
  const res = await fetch(`${host}/oauth/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "User-Agent": BROWSER_USER_AGENT,
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: clientId,
      client_secret: clientSecret,
    }),
    signal: AbortSignal.timeout(10000),
    ...(cacheSegundos ? { next: { revalidate: cacheSegundos } } : { cache: "no-store" as const }),
  });
  if (!res.ok) throw new MobysuiteApiError(`Mobysuite rechazó la autenticación (${res.status})`, res.status);

  const token = (await res.json())?.accessToken;
  if (typeof token !== "string" || !token) throw new MobysuiteApiError("Mobysuite no entregó un token");
  return token;
}

/** Todos los bienes del proyecto con su estado real (incluye vendidos y reservados). */
export async function getAllAssetsAdmin(config: MobysuiteProjectConfig): Promise<MobysuiteAsset[]> {
  const { host } = credenciales();
  const token = await pedirToken(300);
  const res = await fetch(
    `${host}/v1/api/integrations/assets/all-assets?projectId=${encodeURIComponent(String(config.projectId))}`,
    {
      headers: { Authorization: `Bearer ${token}`, "User-Agent": BROWSER_USER_AGENT },
      signal: AbortSignal.timeout(15000),
      next: { revalidate: 300 },
    },
  );
  if (!res.ok) throw new MobysuiteApiError(`Mobysuite respondió ${res.status} al listar los bienes`, res.status);

  const assets = await res.json();
  if (!Array.isArray(assets)) throw new MobysuiteApiError("Mobysuite devolvió un catálogo con formato inesperado");
  return assets as MobysuiteAsset[];
}

/**
 * Catálogo para el cotizador: el completo con estado real si la API
 * administrativa responde; si no, el público (solo disponibles) para que la
 * página siga funcionando.
 */
export async function getCatalogo(config: MobysuiteProjectConfig): Promise<MobysuiteAsset[]> {
  try {
    return await getAllAssetsAdmin(config);
  } catch (cause) {
    console.error("[cotizador] API administrativa no disponible, uso la pública:", cause);
    return getAvailableAssets(config);
  }
}

export interface DatosCotizacion {
  rut: string;
  nombre: string;
  apellido: string;
  email: string;
  /** Con código de país, ej: +56912345678 */
  telefono: string;
  proyectoId: number;
  /** El departamento va primero y es el bien principal; el resto son bodegas/estacionamientos. */
  assetIds: number[];
}

/** Crea el cliente (o lo actualiza) y su cotización en el CRM de Mobysuite. */
export async function crearCotizacion(d: DatosCotizacion): Promise<unknown> {
  const { host } = credenciales();
  const token = await pedirToken();
  const res = await fetch(`${host}/v1/api/integrations/quotes`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "User-Agent": BROWSER_USER_AGENT,
    },
    body: JSON.stringify({
      dni: false,
      rut: d.rut,
      fName: d.nombre,
      lName: d.apellido,
      email: d.email,
      phone: d.telefono,
      source: "WEB INMOBILIARIA",
      contact: "COTIZADOR WEB",
      project: d.proyectoId,
      assets: d.assetIds.map((id, i) => ({ id, masterAsset: i === 0 })),
    }),
    signal: AbortSignal.timeout(25000),
    cache: "no-store",
  });

  const texto = await res.text();
  let cuerpo: unknown = texto;
  try {
    cuerpo = JSON.parse(texto);
  } catch {
    // Respuesta que no es JSON: se devuelve como texto.
  }
  if (!res.ok) {
    throw new MobysuiteApiError(`Mobysuite respondió ${res.status} al crear la cotización`, res.status, cuerpo);
  }
  return cuerpo;
}
