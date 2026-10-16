/**
 * Banderas como SVG en vez de emoji.
 *
 * Windows no dibuja los emoji de bandera (los muestra como las dos letras del
 * país), así que a 20×14 px se dibujan a mano. A ese tamaño los escudos no se
 * distinguen, por eso se representan solo las bandas y el elemento central
 * mínimo que hace reconocible cada una.
 */

type Props = { codigo: string; className?: string };

const marco = "rounded-[2px] shadow-[0_0_0_1px_rgba(3,61,107,0.12)]";

export function Bandera({ codigo, className = "" }: Props) {
  const Dibujo = MAPA[codigo] ?? Generica;
  return (
    <svg viewBox="0 0 21 15" className={`h-[15px] w-[21px] shrink-0 ${marco} ${className}`} aria-hidden="true">
      <Dibujo />
    </svg>
  );
}

const Estrella = ({ x, y, r = 2 }: { x: number; y: number; r?: number }) => {
  const puntos = Array.from({ length: 10 }, (_, i) => {
    const radio = i % 2 === 0 ? r : r / 2.4;
    const ang = (Math.PI / 5) * i - Math.PI / 2;
    return `${(x + radio * Math.cos(ang)).toFixed(2)},${(y + radio * Math.sin(ang)).toFixed(2)}`;
  }).join(" ");
  return <polygon points={puntos} fill="#fff" />;
};

const Chile = () => (
  <>
    <rect width="21" height="7.5" fill="#fff" />
    <rect y="7.5" width="21" height="7.5" fill="#D52B1E" />
    <rect width="7.5" height="7.5" fill="#0039A6" />
    <Estrella x={3.75} y={3.75} r={2.4} />
  </>
);

const Argentina = () => (
  <>
    <rect width="21" height="15" fill="#fff" />
    <rect width="21" height="5" fill="#74ACDF" />
    <rect y="10" width="21" height="5" fill="#74ACDF" />
    <circle cx="10.5" cy="7.5" r="1.9" fill="#F6B40E" />
  </>
);

const Peru = () => (
  <>
    <rect width="21" height="15" fill="#fff" />
    <rect width="7" height="15" fill="#D91023" />
    <rect x="14" width="7" height="15" fill="#D91023" />
  </>
);

const Bolivia = () => (
  <>
    <rect width="21" height="5" fill="#D52B1E" />
    <rect y="5" width="21" height="5" fill="#F9E300" />
    <rect y="10" width="21" height="5" fill="#007934" />
  </>
);

const Colombia = () => (
  <>
    <rect width="21" height="7.5" fill="#FCD116" />
    <rect y="7.5" width="21" height="3.75" fill="#003893" />
    <rect y="11.25" width="21" height="3.75" fill="#CE1126" />
  </>
);

const Ecuador = () => (
  <>
    <rect width="21" height="7.5" fill="#FFDD00" />
    <rect y="7.5" width="21" height="3.75" fill="#034EA2" />
    <rect y="11.25" width="21" height="3.75" fill="#ED1C24" />
    <circle cx="10.5" cy="7.5" r="2" fill="#FFDD00" stroke="#034EA2" strokeWidth="0.6" />
  </>
);

const Venezuela = () => (
  <>
    <rect width="21" height="5" fill="#FFCE00" />
    <rect y="5" width="21" height="5" fill="#00247D" />
    <rect y="10" width="21" height="5" fill="#CF142B" />
    <circle cx="10.5" cy="7.5" r="0.7" fill="#fff" />
    <circle cx="7.6" cy="8.1" r="0.6" fill="#fff" />
    <circle cx="13.4" cy="8.1" r="0.6" fill="#fff" />
  </>
);

const Brasil = () => (
  <>
    <rect width="21" height="15" fill="#009B3A" />
    <polygon points="10.5,1.8 19.4,7.5 10.5,13.2 1.6,7.5" fill="#FEDF00" />
    <circle cx="10.5" cy="7.5" r="3.1" fill="#002776" />
  </>
);

const Uruguay = () => (
  <>
    <rect width="21" height="15" fill="#fff" />
    <rect y="3.2" width="21" height="1.6" fill="#0038A8" />
    <rect y="6.4" width="21" height="1.6" fill="#0038A8" />
    <rect y="9.6" width="21" height="1.6" fill="#0038A8" />
    <rect y="12.8" width="21" height="1.6" fill="#0038A8" />
    <rect width="8.4" height="8" fill="#fff" />
    <circle cx="4.2" cy="4" r="2.1" fill="#FCD116" />
  </>
);

const Paraguay = () => (
  <>
    <rect width="21" height="5" fill="#D52B1E" />
    <rect y="5" width="21" height="5" fill="#fff" />
    <rect y="10" width="21" height="5" fill="#0038A8" />
    <circle cx="10.5" cy="7.5" r="1.6" fill="#fff" stroke="#0038A8" strokeWidth="0.5" />
  </>
);

const Mexico = () => (
  <>
    <rect width="7" height="15" fill="#006847" />
    <rect x="7" width="7" height="15" fill="#fff" />
    <rect x="14" width="7" height="15" fill="#CE1126" />
    <circle cx="10.5" cy="7.5" r="1.9" fill="#8C6239" opacity="0.85" />
  </>
);

const Espana = () => (
  <>
    <rect width="21" height="15" fill="#AA151B" />
    <rect y="3.75" width="21" height="7.5" fill="#F1BF00" />
  </>
);

const EstadosUnidos = () => (
  <>
    <rect width="21" height="15" fill="#fff" />
    {[0, 2, 4, 6].map((i) => (
      <rect key={i} y={i * 2.3} width="21" height="1.15" fill="#B22234" />
    ))}
    {[1, 3, 5].map((i) => (
      <rect key={i} y={i * 2.3} width="21" height="1.15" fill="#B22234" />
    ))}
    <rect width="9" height="8.05" fill="#3C3B6E" />
  </>
);

const Generica = () => <rect width="21" height="15" fill="#E3F3FB" />;

const MAPA: Record<string, () => React.ReactElement> = {
  "+56": Chile,
  "+54": Argentina,
  "+51": Peru,
  "+591": Bolivia,
  "+57": Colombia,
  "+593": Ecuador,
  "+58": Venezuela,
  "+55": Brasil,
  "+598": Uruguay,
  "+595": Paraguay,
  "+52": Mexico,
  "+34": Espana,
  "+1": EstadosUnidos,
};
