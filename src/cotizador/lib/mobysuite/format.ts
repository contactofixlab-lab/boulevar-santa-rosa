import type { MobysuiteAsset, MobysuiteAssetTypeValue } from "./types";

const ASSET_TYPE_LABELS: Record<string, string> = {
  DEPARTAMENTO: "Departamento",
  BODEGA: "Bodega",
  ESTACIONAMIENTO: "Estacionamiento",
  ESTACIONAMIENTO_MOTO: "Estacionamiento moto",
};

export function assetTypeLabel(value: MobysuiteAssetTypeValue): string {
  return ASSET_TYPE_LABELS[value] ?? value;
}

/** "Depto TIPO A #1002" / "Bodega #38" */
export function assetTitle(asset: MobysuiteAsset): string {
  const base = assetTypeLabel(asset.assetTypeValue);
  const typology =
    asset.departmentTypology && asset.departmentTypology !== asset.assetTypeValue
      ? ` ${asset.departmentTypology}`
      : "";
  return `${base}${typology} #${asset.assetNumber}`;
}

export function formatUF(value: number): string {
  return new Intl.NumberFormat("es-CL", { maximumFractionDigits: 0 }).format(Math.round(value));
}

export function formatCLP(value: number): string {
  return new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
  }).format(value);
}

export function ufToClp(uf: number, ufValue: number): number {
  return uf * ufValue;
}
