"use client";

import { Dialog } from "@base-ui/react/dialog";

/**
 * Handle global del cotizador: cualquier botón en cualquier página puede
 * abrirlo (con o sin tipología pre-seleccionada como payload) sin prop-drilling.
 */
export const cotizadorDialogHandle = Dialog.createHandle<string | undefined>();
