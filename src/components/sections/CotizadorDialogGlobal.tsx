"use client";

import { Dialog } from "@base-ui/react/dialog";
import { X } from "lucide-react";
import { cotizadorDialogHandle } from "@/lib/cotizadorDialog";
import { CotizadorDetalle } from "@/components/sections/CotizadorDetalle";
import type { Tipologia } from "@/lib/data/tipologias";

interface CotizadorDialogGlobalProps {
  tipologias: Tipologia[];
}

/**
 * Dialog montado una sola vez (en el layout raíz) y controlado por
 * `cotizadorDialogHandle`. Cualquier botón en cualquier página lo abre
 * vía `cotizadorDialogHandle.openWithPayload(tipologiaId)`, sin importar
 * dónde esté en el árbol — esto evita prop-drilling y duplicar el modal.
 */
export const CotizadorDialogGlobal = ({ tipologias }: CotizadorDialogGlobalProps) => {
  return (
    <Dialog.Root handle={cotizadorDialogHandle}>
      {({ payload }) => (
        <Dialog.Portal>
          <Dialog.Backdrop className="fixed inset-0 bg-secondary-navy/60 backdrop-blur-sm z-[100] transition-opacity" />
          <Dialog.Popup className="fixed inset-0 z-[101] overflow-y-auto p-4 md:p-8 flex items-start md:items-center justify-center outline-none">
            <div className="bg-surface-light rounded-2xl w-full max-w-5xl my-auto p-6 md:p-10 relative shadow-2xl">
              <Dialog.Close
                className="absolute top-4 right-4 text-slate-blue hover:text-primary-blue transition-colors"
                aria-label="Cerrar cotizador"
              >
                <X size={24} />
              </Dialog.Close>
              <Dialog.Title className="text-2xl font-bold text-primary-blue mb-1">
                Cotiza tu espacio
              </Dialog.Title>
              <Dialog.Description className="text-sm text-slate-blue mb-6">
                Boulevard Santa Rosa
              </Dialog.Description>
              <CotizadorDetalle tipologias={tipologias} initialSelectedId={payload} />
            </div>
          </Dialog.Popup>
        </Dialog.Portal>
      )}
    </Dialog.Root>
  );
};
