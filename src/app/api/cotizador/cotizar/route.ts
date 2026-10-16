import { NextResponse } from "next/server";
import { MobysuiteApiError } from "@/cotizador/lib/mobysuite";
import { crearCotizacion, getCatalogo } from "@/cotizador/lib/mobysuite/admin";
import { esDisponible } from "@/cotizador/lib/tipologias";
import { isValidEmail, isValidRut } from "@/cotizador/lib/validators";
import { PAISES } from "@/cotizador/lib/paises";
import { PROYECTO } from "@/cotizador/config";

const TIPOS_EXTRA = new Set(["BODEGA", "ESTACIONAMIENTO", "ESTACIONAMIENTO_MOTO"]);
const MAX_EXTRAS = 10;

// Freno básico contra abuso: cada cotización crea registros reales en el CRM.
// Vive en la memoria de cada instancia, así que es una barrera ligera, no absoluta.
const VENTANA_MS = 10 * 60_000;
const MAX_POR_VENTANA = 6;
const intentos = new Map<string, number[]>();

function excedeLimite(ip: string): boolean {
  const ahora = Date.now();
  const recientes = (intentos.get(ip) ?? []).filter((t) => ahora - t < VENTANA_MS);
  recientes.push(ahora);
  intentos.set(ip, recientes);
  return recientes.length > MAX_POR_VENTANA;
}

const error = (status: number, mensaje: string) =>
  NextResponse.json({ ok: false, mensaje }, { status });

const texto = (v: unknown, max = 80) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Busca un campo por nombre, a cualquier profundidad de la respuesta de Mobysuite. */
function buscarCampo(obj: unknown, nombres: string[]): string | null {
  if (!obj || typeof obj !== "object") return null;
  for (const [clave, valor] of Object.entries(obj as Record<string, unknown>)) {
    if (nombres.includes(clave) && (typeof valor === "string" || typeof valor === "number")) return String(valor);
  }
  for (const valor of Object.values(obj as Record<string, unknown>)) {
    const hallado = buscarCampo(valor, nombres);
    if (hallado) return hallado;
  }
  return null;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "desconocida";
  if (excedeLimite(ip)) return error(429, "Hiciste varias solicitudes seguidas. Intenta de nuevo en unos minutos.");

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return error(400, "Solicitud inválida.");
  }

  const departamentoId = Number(body.departamentoId);
  const extrasIds = Array.isArray(body.extrasIds) ? [...new Set(body.extrasIds.map(Number))] : [];
  const datos = (body.datos ?? {}) as Record<string, unknown>;

  if (!Number.isInteger(departamentoId) || extrasIds.length > MAX_EXTRAS || extrasIds.some((id) => !Number.isInteger(id))) {
    return error(400, "Solicitud inválida.");
  }

  const nombre = texto(datos.nombre, 60);
  const apellidoPaterno = texto(datos.apellidoPaterno, 60);
  const apellidoMaterno = texto(datos.apellidoMaterno, 60);
  const rut = texto(datos.rut, 14);
  const email = texto(datos.email, 120);
  const pais = PAISES.find((p) => p.codigo === datos.codigoPais);
  const digitos = texto(datos.telefono, 20).replace(/\D/g, "");

  if (
    nombre.length < 2 ||
    apellidoPaterno.length < 2 ||
    !isValidRut(rut) ||
    !isValidEmail(email) ||
    !pais ||
    digitos.length < pais.digitos[0] ||
    digitos.length > pais.digitos[1]
  ) {
    return error(400, "Revisa tus datos de contacto: hay campos incompletos o inválidos.");
  }

  // Los bienes se validan contra el catálogo real: el navegador solo manda ids.
  let catalogo;
  try {
    catalogo = await getCatalogo(PROYECTO);
  } catch (cause) {
    console.error("[cotizador] no se pudo leer el catálogo:", cause);
    return error(502, "No pudimos validar la disponibilidad en este momento. Inténtalo nuevamente.");
  }

  const departamento = catalogo.find((a) => a.id === departamentoId);
  const extras = extrasIds.map((id) => catalogo.find((a) => a.id === id));

  if (
    !departamento ||
    departamento.assetTypeValue !== "DEPARTAMENTO" ||
    !esDisponible(departamento) ||
    extras.some((a) => !a || !TIPOS_EXTRA.has(a.assetTypeValue) || !esDisponible(a))
  ) {
    return error(409, "Alguno de los bienes elegidos ya no está disponible. Actualiza la página y elige otro.");
  }

  const rutLimpio = rut.replace(/\./g, "").toUpperCase();

  try {
    const respuesta = await crearCotizacion({
      rut: rutLimpio,
      nombre,
      apellido: [apellidoPaterno, apellidoMaterno].filter(Boolean).join(" "),
      email,
      telefono: `${pais.codigo}${digitos}`,
      proyectoId: Number(PROYECTO.projectId),
      assetIds: [departamento.id, ...extrasIds],
    });

    const codigo = buscarCampo(respuesta, ["quoteCode", "code", "codigo", "quote_code", "codigoCotizacion"]);
    // El PDF oficial lo genera Mobysuite: el widget oficial lo toma de `cotizacion.urlDocumento`.
    const urlPdf = buscarCampo(respuesta, ["urlDocumento", "pdfURL", "pdfUrl", "urlPdf", "url_documento", "documentUrl"]);
    const pdfUrl = urlPdf && /^https:\/\//i.test(urlPdf) ? urlPdf : null;
    console.log("[cotizador] cotización creada", {
      codigo,
      conPdf: Boolean(pdfUrl),
      departamento: departamento.assetNumber,
      extras: extrasIds.length,
    });
    if (process.env.NODE_ENV !== "production") {
      console.log("[cotizador] respuesta de Mobysuite (solo dev):", JSON.stringify(respuesta).slice(0, 2000));
    }

    return NextResponse.json({
      ok: true,
      codigo,
      pdfUrl,
      // Solo en desarrollo: ver la forma real de la respuesta de Mobysuite.
      ...(process.env.NODE_ENV !== "production" && { debug: respuesta }),
    });
  } catch (cause) {
    console.error(
      "[cotizador] Mobysuite rechazó la cotización:",
      cause instanceof MobysuiteApiError ? { mensaje: cause.message, status: cause.status, detalle: cause.detail } : cause,
    );
    return error(502, "No pudimos registrar tu cotización en este momento. Inténtalo de nuevo o escríbenos por WhatsApp.");
  }
}
