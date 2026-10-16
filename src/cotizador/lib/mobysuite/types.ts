/**
 * Config mínima para apuntar el cliente a cualquier proyecto Mobysuite.
 * `realEstate` identifica la inmobiliaria (ej: "inesdesuarez") y `projectId`
 * el proyecto específico dentro de ella (ej: 4 = Boulevard Santa Rosa).
 * Reutilizable: un proyecto nuevo solo necesita pasar otro `projectId`.
 */
export interface MobysuiteProjectConfig {
  realEstate: string;
  projectId: string | number;
  /** "2" (default) resuelve a la API v3; cualquier otro valor cae a v2. */
  version?: "1" | "2";
}

export interface MobysuiteAssetTypeInfo {
  id: number;
  assetName: string;
  enumValue: string;
  isPrimary: boolean;
}

/** Tipo de bien tal como lo entrega la API (departamento, bodega, etc). */
export type MobysuiteAssetTypeValue =
  | "DEPARTAMENTO"
  | "BODEGA"
  | "ESTACIONAMIENTO"
  | "ESTACIONAMIENTO_MOTO"
  | (string & {});

/**
 * Un bien (unidad) disponible para cotizar. Campos confirmados contra la
 * respuesta real de la API el 2026-08-18 — ver docs/API-MOBYSUITE.md.
 *
 * OJO: `numberOfBeds` son camas, NO dormitorios. Para dormitorios usar
 * `numberOfRooms`. Solo viene presente en algunos bienes (típicamente
 * departamentos), no en todos.
 */
export interface MobysuiteAsset {
  id: number;
  assetNumber: string;
  assetType: MobysuiteAssetTypeInfo;
  assetTypeValue: MobysuiteAssetTypeValue;
  assetSubtype: string | null;
  departmentTypology: string;
  projectId: number;
  status: string;
  available: boolean;
  showOnWebQuote: boolean;

  floor: number;
  orientation: string;

  numberOfRooms: number;
  numberOfBathrooms: number;
  /** Camas, no dormitorios — no presente en todos los bienes. */
  numberOfBeds?: number;

  totalArea: number;
  usableArea: number;
  lodgeArea: number;
  terraceArea?: number;
  ufMt2: number;

  baseValue: number;
  listValue: number;
  ivaListValue: number;
  baseValue2: number;
  listValue2: number;
  ivaValue2: number;
  saleValue2: number;
  originalListValue2: number;
  authorizedDiscount: number;
  nonAuthorizedDiscount: number;
  discountGroup: unknown[];

  jointAssets: unknown[];
  masterAsset: unknown[];
  externalDescription?: string;

  urlImage1?: string;
  fullUrlImageOne?: string;
}

/**
 * Resumen de un proyecto dentro de una inmobiliaria. Devuelto por
 * `list-projects` — sirve para descubrir qué `projectId` usar sin tener
 * que conocerlo de antemano (clave para reutilizar el cliente en
 * proyectos nuevos).
 */
export interface MobysuiteProjectSummary {
  id: number;
  nombreProyecto: string;
  nombreLegal?: string;
  activoCotizadorWeb: boolean;
  activoReservaWeb?: boolean;
  monedaPrincipal?: string;
  direccion?: {
    calle?: string;
    ciudad?: string;
    municipio?: string;
    estado?: string;
    pais?: string;
    referencia?: string;
  };
  urlLogoProyectoCompleta?: string;
  urlImagenUnoProyectoCompleta?: string;
  urlImagenDosProyectoCompleta?: string;
  // La API devuelve muchos más campos de configuración (formularios,
  // mínimos/máximos, etc). No se tipan por no ser necesarios hoy.
  [key: string]: unknown;
}
