import type {
  MobysuiteAsset,
  MobysuiteProjectConfig,
  MobysuiteProjectSummary,
} from "./types";

/**
 * Cliente de la API PÚBLICA del cotizador Mobysuite (sin credenciales).
 * No confundir con la API administrativa (`*-api.mobysuite.com`, OAuth2,
 * back-office) — esa no sirve para esto. Ver docs/API-MOBYSUITE.md.
 *
 * Diseño: cada función recibe un `MobysuiteProjectConfig` explícito en vez
 * de leer de variables de entorno, para que el mismo cliente sirva a
 * cualquier proyecto Iencinas con solo pasar otro { realEstate, projectId }.
 */

const COTIZADOR_BASE_URL = "https://cotizacion.mobysuite.com/api";

/**
 * Cloudflare devuelve 403 (error 1010, "browser signature banned") a
 * clientes sin User-Agent de navegador — un fetch() de servidor sale sin
 * uno y queda bloqueado. Hay que mandarlo explícito en toda llamada.
 */
export const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const REQUEST_TIMEOUT_MS = 8000;

export class MobysuiteApiError extends Error {
  status?: number;
  /** Cuerpo de la respuesta de error de Mobysuite, solo para diagnóstico en el servidor. */
  detail?: unknown;

  constructor(message: string, status?: number, detail?: unknown) {
    super(message);
    this.name = "MobysuiteApiError";
    this.status = status;
    this.detail = detail;
  }
}

function resolveApiVersionPrefix(version: MobysuiteProjectConfig["version"]): string {
  // version=2 (default del widget oficial) -> v3. Cualquier otro valor -> v2.
  // v2 con version=2 responde HTTP 500, así que el mapeo no es simétrico.
  return version === undefined || version === "2" ? "v3" : "v2";
}

async function mobysuiteGet<T>(
  path: string,
  config: MobysuiteProjectConfig,
  extraParams: Record<string, string | number | undefined> = {},
  { includeProjectId = true }: { includeProjectId?: boolean } = {}
): Promise<T> {
  const versionPrefix = resolveApiVersionPrefix(config.version);
  const url = new URL(`${COTIZADOR_BASE_URL}/${versionPrefix}/${path}`);
  url.searchParams.set("real_estate", config.realEstate);
  if (includeProjectId) {
    url.searchParams.set("project_id", String(config.projectId));
  }
  for (const [key, value] of Object.entries(extraParams)) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }

  let response: Response;
  try {
    response = await fetch(url.toString(), {
      headers: { "User-Agent": BROWSER_USER_AGENT },
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      next: { revalidate: 300 },
    });
  } catch (cause) {
    throw new MobysuiteApiError(
      `No se pudo contactar la API de Mobysuite (${path}): ${
        cause instanceof Error ? cause.message : String(cause)
      }`
    );
  }

  if (!response.ok) {
    throw new MobysuiteApiError(`Mobysuite respondió ${response.status} en ${path}`, response.status);
  }

  return (await response.json()) as T;
}

/**
 * Catálogo de bienes disponibles para cotizar (el endpoint principal).
 * Ej: getAvailableAssets({ realEstate: "inesdesuarez", projectId: 4 })
 */
export async function getAvailableAssets(
  config: MobysuiteProjectConfig,
  opts: { typology?: string } = {}
): Promise<MobysuiteAsset[]> {
  return mobysuiteGet<MobysuiteAsset[]>("quotes/list-available-assets", config, {
    typology: opts.typology,
  });
}

/**
 * Lista los proyectos de una inmobiliaria. Sirve para descubrir el
 * `projectId` de un proyecto nuevo sin tener que pedirlo aparte —
 * solo se necesita el `realEstate`.
 */
export async function listProjects(
  config: Pick<MobysuiteProjectConfig, "realEstate" | "version">
): Promise<MobysuiteProjectSummary[]> {
  return mobysuiteGet<MobysuiteProjectSummary[]>(
    "quotes/list-projects",
    { ...config, projectId: "" },
    {},
    { includeProjectId: false }
  );
}

/**
 * Valor UF del día (número plano, ej: 40856.64). No requiere `projectId`.
 */
export async function getUfValue(
  config: Pick<MobysuiteProjectConfig, "realEstate" | "version">
): Promise<number> {
  return mobysuiteGet<number>(
    "opportunities/get_uf",
    { ...config, projectId: "" },
    {},
    { includeProjectId: false }
  );
}
