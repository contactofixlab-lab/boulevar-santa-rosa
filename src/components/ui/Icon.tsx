import Image from "next/image";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  alt?: string;
}

export const Icon = ({ name, size = 24, className = "", alt }: IconProps) => {
  const iconPath = `/iconos/${name}.svg`;

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
