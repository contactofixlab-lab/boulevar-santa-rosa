/**
 * Equipamiento y terminaciones por tipología. NO viene de Mobysuite (sus campos
 * de descripción están vacíos): se toma del brochure oficial del proyecto.
 * Al reutilizar el módulo en otro edificio, este es el archivo a reemplazar.
 */
const BASE = [
  "Cocina equipada (horno, encimera y campana)",
  "Walking clóset",
  "Ventanas termopanel",
];

const POR_TIPOLOGIA: Record<string, string[]> = {
  "TIPO A": [
    "Cocina equipada (horno, encimera y campana)",
    "Conexión para lavavajillas o lavadora",
    "Walking clóset",
    "Living comedor integrado",
    "Excelente distribución y luz natural",
    "Ventanas termopanel",
  ],
  "TIPO B": [
    "Cocina equipada (horno, encimera y campana)",
    "Conexión para lavavajillas o lavadora",
    "Walking clóset",
    "Living comedor integrado",
    "Segundo dormitorio versátil",
    "Terraza funcional",
    "Ventanas termopanel",
  ],
  "TIPO C": [
    "Cocina equipada (horno, encimera y campana)",
    "Conexión para lavavajillas",
    "Espacio para lavadora",
    "Segundo dormitorio versátil para una cama y escritorio",
    "Walking clóset",
    "Terraza amplia y funcional",
    "Dormitorio principal con clóset doble",
    "Ventanas termopanel",
  ],
  "TIPO D": [
    "Cocina equipada (horno, encimera y campana)",
    "Conexión para lavavajillas",
    "Espacio para lavadora",
    "Segundo dormitorio amplio y versátil para dos camas",
    "Walking clóset",
    "Terraza amplia y funcional",
    "Dormitorio principal con clóset doble",
    "Ventanas termopanel",
  ],
};

/** Tipologías sin ficha propia (ej. una nueva) muestran solo lo común a todo el proyecto. */
export const equipamientoDe = (tipologia: string): string[] => POR_TIPOLOGIA[tipologia] ?? BASE;
