export interface Tipologia {
  id: string;
  nombre: string;
  tipo: "departamento" | "bodega" | "local" | "estacionamiento";
  precioUF: number;
  precioCLP?: number;
  m2?: number;
  dormitorios?: number;
  banos?: number;
  estado: "disponible" | "presale" | "vendido";
  piso?: number;
  orientacion?: string;
  destacado?: boolean;
}

export const tipologias: Tipologia[] = [
  {
    id: "1d-1b-1",
    nombre: "Depto 1D+1B",
    tipo: "departamento",
    precioUF: 2850,
    precioCLP: 89400000,
    m2: 42,
    dormitorios: 1,
    banos: 1,
    estado: "disponible",
    piso: 3,
    orientacion: "Oriente",
    destacado: true,
  },
  {
    id: "2d-2b-1",
    nombre: "Depto 2D+2B",
    tipo: "departamento",
    precioUF: 4200,
    precioCLP: 131760000,
    m2: 68,
    dormitorios: 2,
    banos: 2,
    estado: "disponible",
    piso: 5,
    orientacion: "Nor-Oriente",
  },
  {
    id: "3d-2b-1",
    nombre: "Depto 3D+2B",
    tipo: "departamento",
    precioUF: 5800,
    precioCLP: 182040000,
    m2: 92,
    dormitorios: 3,
    banos: 2,
    estado: "presale",
    piso: 7,
    orientacion: "Poniente",
  },
  {
    id: "local-50",
    nombre: "Local 50m²",
    tipo: "local",
    precioUF: 3500,
    precioCLP: 109760000,
    m2: 50,
    estado: "disponible",
    piso: 1,
  },
  {
    id: "bodega-100",
    nombre: "Bodega 100m²",
    tipo: "bodega",
    precioUF: 6500,
    precioCLP: 204000000,
    m2: 100,
    estado: "disponible",
    piso: -1,
  },
  {
    id: "estacionamiento",
    nombre: "Estacionamiento",
    tipo: "estacionamiento",
    precioUF: 750,
    precioCLP: 23550000,
    estado: "vendido",
  },
];
