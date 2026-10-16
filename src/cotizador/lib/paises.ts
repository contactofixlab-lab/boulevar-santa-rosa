export interface Pais {
  codigo: string;
  /** Emoji de respaldo; la bandera visible se dibuja en components/ui/Bandera.tsx
   *  porque Windows no renderiza los emoji de bandera. */
  bandera: string;
  nombre: string;
  /** Largo esperado del número local, para validar sin ser demasiado estricto. */
  digitos: [number, number];
}

/**
 * Códigos de país del formulario de contacto. Chile primero por ser el mercado
 * base; el resto son los orígenes más habituales de compradores extranjeros.
 */
export const PAISES: Pais[] = [
  { codigo: "+56", bandera: "🇨🇱", nombre: "Chile", digitos: [9, 9] },
  { codigo: "+54", bandera: "🇦🇷", nombre: "Argentina", digitos: [10, 11] },
  { codigo: "+51", bandera: "🇵🇪", nombre: "Perú", digitos: [9, 9] },
  { codigo: "+591", bandera: "🇧🇴", nombre: "Bolivia", digitos: [8, 8] },
  { codigo: "+57", bandera: "🇨🇴", nombre: "Colombia", digitos: [10, 10] },
  { codigo: "+593", bandera: "🇪🇨", nombre: "Ecuador", digitos: [9, 9] },
  { codigo: "+58", bandera: "🇻🇪", nombre: "Venezuela", digitos: [10, 10] },
  { codigo: "+55", bandera: "🇧🇷", nombre: "Brasil", digitos: [10, 11] },
  { codigo: "+598", bandera: "🇺🇾", nombre: "Uruguay", digitos: [8, 9] },
  { codigo: "+595", bandera: "🇵🇾", nombre: "Paraguay", digitos: [9, 9] },
  { codigo: "+52", bandera: "🇲🇽", nombre: "México", digitos: [10, 10] },
  { codigo: "+34", bandera: "🇪🇸", nombre: "España", digitos: [9, 9] },
  { codigo: "+1", bandera: "🇺🇸", nombre: "Estados Unidos", digitos: [10, 10] },
];

export const PAIS_POR_DEFECTO = PAISES[0].codigo;

export const buscarPais = (codigo: string) =>
  PAISES.find((p) => p.codigo === codigo) ?? PAISES[0];
