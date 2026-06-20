import Image from "next/image";

import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
  style?: React.CSSProperties;
}

// Iconografía nueva (public/iconos/iconos mejores). Mapea los nombres usados
// en el sitio al PNG correspondiente; lo que no tiene equivalente cae al set
// SVG anterior en public/iconos.
const NEW_ICONS: Record<string, string> = {
  metro: "metro",
  bancos: "banco",
  supermercados: "supermercado",
  colegios: "colegio",
  "centros-medicos": "centro-salud",
  "areas-verdes": "areas-verdes",
  dormitorios: "dormitorios",
  banos: "bano",
  "proyecto-pisos": "pisos",
  departamentos: "edificio",
  mercado: "mercado",
  autopista: "autopista",
  parques: "parques",
  carabineros: "carabineros",
  quincho: "quincho",
  "sala-multiuso": "sala-multiuso",
  bicicletero: "bicicletero",
  telefono: "telefono",
  correo: "correo",
  direccion: "direccion",
  "cocina-equipada": "cocina-equipada",
  ventanas: "ventanas",
  "agua-caliente": "agua-caliente",
  entretenimiento: "entretenimiento",
  web: "web",
};

export const Icon = ({ name, size = 24, className = "", alt, style }: IconProps) => {
  const newIcon = NEW_ICONS[name];
  const iconPath = newIcon
    ? `/iconos/iconos%20mejores/${newIcon}.png`
    : `/iconos/${name}.svg`;

  return (
    <Image
      src={iconPath}
      alt={alt || name}
      width={size}
      height={size}
      className={`inline-block ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        ...style,
      }}
    />
  );
};

// Exporta iconos con nombres específicos
export const Icons = {
  proyectoPisos: "proyecto-pisos",
  departamentos: "departamentos",
  estacionamiento: "estacionamiento",
  bodegas: "bodegas",
  metro: "metro",
  colegios: "colegios",
  supermercados: "supermercados",
  centrosMedicos: "centros-medicos",
  bancos: "bancos",
  areasVerdes: "areas-verdes",
  dormitorios: "dormitorios",
  banos: "banos",
} as const;
