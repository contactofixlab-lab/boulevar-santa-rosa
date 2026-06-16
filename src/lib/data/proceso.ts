export interface PasoCompra {
  numero: number;
  titulo: string;
  descripcion: string;
}

export const pasos: PasoCompra[] = [
  {
    numero: 1,
    titulo: "Cotización",
    descripcion: "Consulta disponibilidad y recibe propuesta personalizada de nuestra ejecutiva de ventas.",
  },
  {
    numero: 2,
    titulo: "Reserva",
    descripcion: "Realiza una reserva del inmueble con boleta de garantía.",
  },
  {
    numero: 3,
    titulo: "Promesa de Venta",
    descripcion: "Se formaliza la promesa de venta con todos los términos y condiciones.",
  },
  {
    numero: 4,
    titulo: "Inspección",
    descripcion: "Inspecciona la propiedad finalizada y conforme a las especificaciones.",
  },
  {
    numero: 5,
    titulo: "Escrituración",
    descripcion: "Se realiza la escritura pública ante notario.",
  },
  {
    numero: 6,
    titulo: "Entrega",
    descripcion: "Recibe las llaves y toma posesión de tu propiedad.",
  },
];
