"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";

// Genera una onda S-curve que fluye desde el lado DERECHO (x=1440)
// hacia el lado IZQUIERDO con oscilaciones verticales.
// Cada línea parte a una altura y0 y tiene una leve deriva diagonal hacia abajo.
function sWave(y0: number, drift = 80): string {
  const a = 28; // amplitud de oscilación vertical
  const d = drift; // cuánto baja al llegar al extremo izquierdo
  return [
    `M1440,${y0}`,
    `C1300,${y0 - a}   1150,${y0 + a + d * 0.1}  1000,${y0 + d * 0.2}`,
    `S 800,${y0 - a + d * 0.3}   640,${y0 + d * 0.4}`,
    `S 440,${y0 + a + d * 0.55}  280,${y0 + d * 0.65}`,
    `S 120,${y0 - a + d * 0.8}     0,${y0 + d}`,
  ].join(" ");
}

export const HeroSection = () => {
  // 18 ondas S-curve que nacen del borde derecho en distintas alturas (60–790)
  const LINES = Array.from({ length: 18 }, (_, i) => ({
    y: 60 + i * 42,
    drift: 50 + i * 3,
    opacity: i < 3 ? 0.22 : i < 8 ? 0.18 - i * 0.008 : Math.max(0.04, 0.12 - i * 0.006),
    w: i < 3 ? 1.8 : i < 7 ? 1.3 : 0.9,
  }));

  return (
    <section className="relative bg-white overflow-hidden min-h-[92vh] flex items-center pt-20">

      {/* ── Fondo azul lado derecho — borde suave ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 860"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          {/* Fade horizontal: líneas más visibles a la derecha, se desvanecen a la izquierda */}
          <linearGradient id="waveFadeGrad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="45%"  stopColor="white" stopOpacity="0.7" />
            <stop offset="75%"  stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="waveFadeMask">
            <rect width="1440" height="860" fill="url(#waveFadeGrad)" />
          </mask>
        </defs>

        {/* Área azul derecha */}
        <path
          d="M600,0 C575,180 615,360 585,540 C562,680 605,770 588,860 L1440,860 L1440,0 Z"
          fill="#E3F3FB"
        />
      </svg>

      {/* ── Imagen del edificio — full-bleed derecha ── */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[55%] overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        {/* Fade izquierdo para que se funda con el área azul */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10
                        bg-gradient-to-r from-[#E3F3FB] via-[#E3F3FB]/45 to-transparent" />

        <svg viewBox="0 0 792 860" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="hSky" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#94c4e0" />
              <stop offset="50%"  stopColor="#b4d8ee" />
              <stop offset="100%" stopColor="#d0eaf8" />
            </linearGradient>
            <linearGradient id="hBldg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#cce2f0" />
              <stop offset="100%" stopColor="#b4cee0" />
            </linearGradient>
          </defs>

          {/* Cielo */}
          <rect width="792" height="860" fill="url(#hSky)" />
          {/* Nubes */}
          <ellipse cx="170" cy="68" rx="105" ry="26" fill="white" opacity="0.28" />
          <ellipse cx="530" cy="45" rx="78" ry="19" fill="white" opacity="0.20" />
          <ellipse cx="370" cy="108" rx="58" ry="14" fill="white" opacity="0.16" />

          {/* Árboles */}
          <ellipse cx="72" cy="722" rx="72" ry="50" fill="#4a9828" opacity="0.72" />
          <ellipse cx="34" cy="732" rx="45" ry="32" fill="#62b040" opacity="0.62" />
          <ellipse cx="714" cy="716" rx="65" ry="44" fill="#469025" opacity="0.70" />
          <ellipse cx="756" cy="726" rx="42" ry="28" fill="#5aaa38" opacity="0.62" />
          <ellipse cx="392" cy="726" rx="50" ry="34" fill="#52a030" opacity="0.52" />

          {/* Edificio bloque A */}
          <rect x="95" y="84" width="360" height="650" rx="3" fill="url(#hBldg)" />
          {Array.from({ length: 20 }, (_, i) => 96 + i * 31).map(y => (
            <rect key={`fA${y}`} x="95" y={y} width="360" height="2" fill="#a6c6dc" opacity="0.48" />
          ))}
          {Array.from({ length: 19 }, (_, r) => 90 + r * 31).map(y =>
            [112, 152, 192, 232, 272, 314, 355].map(x => (
              <rect key={`wA${x}${y}`} x={x} y={y} width="26" height="22" rx="2" fill="#80bada" opacity="0.88" />
            ))
          )}
          {[122, 184, 246, 308, 370, 432].map(y =>
            [112, 172, 232, 294, 354].map(x => (
              <rect key={`bA${x}${y}`} x={x - 2} y={y + 22} width="30" height="3" rx="1" fill="#68aace" opacity="0.36" />
            ))
          )}

          {/* Edificio bloque B (detrás-derecha) */}
          <rect x="462" y="54" width="252" height="682" rx="3" fill="#bcdcea" />
          {Array.from({ length: 23 }, (_, i) => 64 + i * 29).map(y => (
            <rect key={`fB${y}`} x="462" y={y} width="252" height="1.5" fill="#9cc6dc" opacity="0.44" />
          ))}
          {Array.from({ length: 22 }, (_, r) => 60 + r * 29).map(y =>
            [478, 513, 548, 583, 618, 654, 684].map(x => (
              <rect key={`wB${x}${y}`} x={x} y={y} width="22" height="18" rx="2" fill="#74aeca" opacity="0.82" />
            ))
          )}

          {/* Planta baja */}
          <rect x="74" y="730" width="630" height="90" rx="3" fill="#96bace" opacity="0.90" />
          <rect x="276" y="660" width="150" height="102" rx="4" fill="#6c9cb8" />
          <rect x="316" y="674" width="70" height="88" rx="3" fill="#50869e" opacity="0.88" />
          <rect x="334" y="698" width="14" height="52" rx="2" fill="#38709a" opacity="0.70" />
          <rect x="354" y="698" width="14" height="52" rx="2" fill="#38709a" opacity="0.70" />
          {/* Acera */}
          <rect x="0" y="820" width="792" height="40" fill="#7ea8be" opacity="0.60" />
        </svg>

        <div className="absolute bottom-5 right-4 z-20
                        bg-[#033D6B]/62 backdrop-blur-sm rounded-xl px-4 py-2">
          <p className="text-white text-[11px] font-semibold">Render arquitectónico referencial</p>
        </div>
      </div>

      {/* ── ONDULACIONES DIAGONALES ──
          Nacen del lado derecho (x=1440) y fluyen en diagonal hacia abajo-izquierda.
          Cada línea es un S-curve con 4 segmentos bezier = hartas ondulaciones.
          Se desvanecen hacia la izquierda gracias al mask con gradiente. ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1440 860"
        preserveAspectRatio="none"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="wlFade" x1="1" y1="0.5" x2="0" y2="0.5">
            <stop offset="0%"   stopColor="white" stopOpacity="1" />
            <stop offset="50%"  stopColor="white" stopOpacity="0.65" />
            <stop offset="80%"  stopColor="white" stopOpacity="0.12" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <mask id="wlMask">
            <rect width="1440" height="860" fill="url(#wlFade)" />
          </mask>
        </defs>

        <g mask="url(#wlMask)">
          {LINES.map(({ y, drift, opacity, w }, i) => (
            <path
              key={i}
              d={sWave(y, drift)}
              stroke="#0671AE"
              strokeWidth={w}
              opacity={opacity}
            />
          ))}
        </g>
      </svg>

      {/* ── Contenido izquierdo ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full py-20">
        <div className="max-w-[490px]">

          <span className="inline-block bg-[#E3F3FB] text-[#0671AE] text-xs font-semibold
                           px-4 py-1.5 rounded-full tracking-wide mb-5">
            San Miguel, Santiago
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-[3.4rem] font-bold text-[#033D6B]
                         leading-[1.15] mb-5">
            Vive conectado<br />
            al nuevo{" "}
            <span className="text-[#84CE25]">San Miguel</span>
          </h1>

          <p className="text-[#4A6275] text-base md:text-lg leading-relaxed mb-8 max-w-[410px]">
            Departamentos con diseño moderno en el corazón de San Miguel.
            A pasos del metro y con áreas comunes exclusivas.
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            <Link href="/cotizador">
              <Button variant="primary" size="md" className="shadow-lg">
                Cotizar ahora →
              </Button>
            </Link>
            <Button variant="outline" size="md">
              Descargar brochure ↓
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#EBF7CC] rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M2 7L5.5 10.5L12 3.5" stroke="#65A81A" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs text-[#4A6275]">
              Proyecto inmobiliario{" "}
              <strong className="text-[#033D6B]">Boulevard Santa Rosa</strong>{" "}— San Miguel
            </p>
          </div>
        </div>
      </div>

      {/* ── Onda inferior → Stats ── */}
      <div className="absolute bottom-0 left-0 right-0 leading-none pointer-events-none" aria-hidden="true">
        <svg viewBox="0 0 1440 90" preserveAspectRatio="none"
          className="block w-full h-20 md:h-24" fill="#E3F3FB">
          <path d="M0,45 C200,90 400,10 600,50 C800,88 1000,15 1200,48 C1320,65 1380,38 1440,45 L1440,90 L0,90 Z" />
        </svg>
      </div>
    </section>
  );
};
