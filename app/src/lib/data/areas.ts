export interface Area {
  id: string;
  nombre: string;
  descripcion: string;
  icono?: string;
}

export const areas: Area[] = [
  {
    id: "piscina",
    nombre: "Piscina",
    descripcion: "Piscina temperada con área de sunbathing y jacuzzi.",
  },
  {
    id: "gimnasio",
    nombre: "Gimnasio",
    descripcion: "Gimnasio completamente equipado con aparatos de última generación.",
  },
  {
    id: "coworking",
    nombre: "Coworking",
    descripcion: "Espacio de trabajo flexible para residentes con conexión de alta velocidad.",
  },
  {
    id: "areas-verdes",
    nombre: "Áreas Verdes",
    descripcion: "Amplias áreas verdes con jardines y espacios de esparcimiento.",
  },
  {
    id: "seguridad",
    nombre: "Seguridad 24/7",
    descripcion: "Sistema de seguridad integrado con vigilancia permanente.",
  },
  {
    id: "estacionamientos",
    nombre: "Estacionamientos",
    descripcion: "Estacionamientos subterráneos y tecnología de acceso automatizada.",
  },
];
