# Plan de Implementación — Boulevard Santa Rosa (Web v1 local)

## Contexto

Inmobiliaria con un único proyecto en venta: **Boulevard Santa Rosa, San Miguel** (Santiago, Chile). Vende departamentos, bodegas, locales y estacionamientos. Existe un **Design System completo en Figma** (paleta, botones, badges, cards, 12+ vistas) que sirve de referencia visual.

El objetivo de esta **Etapa 1** es construir y correr la web **en local** (`npm run dev`) incluyendo la integración real de Mobysuite, para revisarla visualmente antes de subir a producción. Solo cuando esté aprobada pasamos a **Etapa 2** (GitHub + Vercel + CI/CD + tests + Sanity CMS).

Decisiones confirmadas:
- **Multi-página** (rutas separadas para SEO).
- **Integración Mobysuite en v1** — el cotizador/tipologías se integra en esta etapa (documentación pendiente de recibir).
- **Datos mock realistas** de respaldo mientras llega la documentación de Mobysuite; se reemplazan sin tocar el diseño.
- **Placeholders** de imágenes ahora; los renders reales se exportan del Figma luego.
- Libertad para mejorar el Figma a nivel visual y de animación (enfoque de consultor de marketing).

No hay código existente — es greenfield. La carpeta `Pagina Web/` solo contiene `Fotos Rewferencia Figma/`.

---

## Sistema de diseño (extraído del Figma)

**Colores**
| Token | Hex | Uso |
|---|---|---|
| `primary.blue` | `#0671AE` | Acciones, links, acentos azules |
| `primary.green` | `#84CE25` | CTA principal "Cotizar", énfasis |
| `navy` | `#033D6B` | Títulos, header sólido, footer |
| `accent.green` | `#65A81A` | Verde oscuro hover/estados |
| `surface.blue` | `#E3F3FB` | Fondos secciones, badges info |
| `surface.green` | `#EBF7CC` | Fondos verdes suaves, badge disponible |
| `surface.light` | `#F4F9FB` | Fondo base alterno |
| `slate.blue` | `#4A6275` | Texto secundario, badge oscuro |

**Botones** (4 variantes del Figma): verde sólido (CTA), azul sólido, outline azul, disabled verde-claro. Tamaños sm/md.
**Badges de estado**: Disponible (verde), Pre-venta activa (azul), Últimas N unidades (ámbar).
**Tipografía**: sans geométrica con títulos en dos colores (azul + verde). Se usará **Poppins** (Google Font, vía `next/font`) como aproximación cercana — intercambiable cuando el diseñador entregue tokens.

---

## Stack técnico

- **Next.js 14** (App Router) + **TypeScript** + React 18 — SSG por defecto (rápido + SEO).
- **Tailwind CSS** con los tokens anteriores como variables CSS.
- **shadcn/ui** (primitivos Radix) — `Dialog` (modal depto), `Accordion` (FAQ), `Tabs` (masterplan), `Button`, etc.
- **Framer Motion** — scroll-reveal, parallax, contadores animados, micro-interacciones.
- **Embla Carousel** — galerías.
- **Lucide React** — iconos.
- **react-hook-form** + **zod** — formularios (agenda visita / contacto).
- **next/image** + **next/font** — optimización imágenes y fuentes (Core Web Vitals).

---

## Arquitectura de carpetas

```
Pagina Web/boulevard-santa-rosa/
├── app/
│   ├── layout.tsx              # fuentes, metadata base, Header/Footer/WhatsApp
│   ├── page.tsx                # Home
│   ├── proyecto/page.tsx       # El Proyecto + Áreas Comunes + Masterplan
│   ├── tipologias/page.tsx     # Grid tipologías + modal detalle
│   ├── ubicacion/page.tsx      # Mapa + conectividad
│   ├── galeria/page.tsx        # Galería
│   ├── proceso-compra/page.tsx # 6 pasos + FAQ
│   ├── contacto/page.tsx       # Asesor + agenda visita
│   ├── cotizador/page.tsx      # Cotizador Mobysuite
│   ├── globals.css             # Tailwind + tokens CSS
│   ├── sitemap.ts / robots.ts
├── components/
│   ├── ui/                     # shadcn (button, dialog, accordion, tabs, badge...)
│   ├── layout/                 # Header (sticky), Footer, WhatsAppFab
│   ├── sections/               # Hero, Stats, Ubicacion, ConoceProyecto,
│   │                           #   AreasComunes, Tipologias, Masterplan,
│   │                           #   Asesor, FAQ, ProcesoCompra, AgendaVisita,
│   │                           #   CotizadorMobysuite
│   └── shared/                 # PropertyCard, DataCard, StatusBadge,
│                               #   SectionHeading (título 2 colores),
│                               #   DepartamentoModal, AnimatedCounter, Reveal
├── lib/
│   ├── utils.ts
│   ├── constants.ts            # marca, contacto, nav, links
│   ├── mobysuite/              # adapter.ts, iframe.ts, widget.ts, api.ts, index.ts
│   └── data/                   # tipologias.ts, faqs.ts, proceso.ts, areas.ts (MOCK)
├── types/index.ts
├── public/images/ + public/brand/   # placeholders + logo
├── .env.local / .env.example
├── tailwind.config.ts · next.config.js · tsconfig.json · package.json
```

**Patrón clave**: cada página = composición de `sections/`. Datos en `lib/data/` (mock hoy → Mobysuite mañana). Header/Footer/WhatsApp viven en `layout.tsx` (consistencia automática en todas las páginas). Un componente `SectionHeading` centraliza el patrón de título a dos colores. Esto cumple el requisito de **reglas estándar consistentes** y **flexibilidad para agregar páginas**.

---

## Mapa de páginas → secciones

| Ruta | Secciones |
|---|---|
| `/` Home | Hero (render + stats overlay + CTAs) · Stats band · teaser Conoce el Proyecto · teaser Tipologías (3 cards) · teaser Ubicación · bloque Asesor · CTA final |
| `/proyecto` | Descripción · Áreas Comunes (grid) · Masterplan interactivo (Tabs Plan 1 / Azotea + hotspots numerados) |
| `/tipologias` | Filtros (tipo, dormitorios) · grid de cards `PropertyCard` · `DepartamentoModal` (plano, ubicación en edificio, características, equipamiento, descargar ficha, solicitar cotización) |
| `/ubicacion` | Mapa (placeholder→Google Maps) · conectividad · puntos de interés |
| `/galeria` | Carousel Embla + lightbox + hover zoom |
| `/proceso-compra` | 6 pasos numerados · FAQ (accordion) |
| `/contacto` | Conversemos con tu asesor (foto, agendar, WhatsApp) · Agenda tu visita (form validado) |
| `/cotizador` | Cotizador Mobysuite (integrado — 3 modos: iframe/widget/API) |

Botón global **"Cotizar"** → abre el cotizador Mobysuite (integrado en v1).

---

## Integración Mobysuite (v1 — flexible, 3 modos)

El cotizador y las tipologías son responsabilidad de Mobysuite. El sitio se diseña para soportar los tres modos de integración posibles. Cuando llegue la documentación se activa el modo que corresponda cambiando **solo la capa de datos**, sin tocar diseño ni rutas.

### Arquitectura del adaptador

```
lib/mobysuite/
├── adapter.ts          # interfaz única MobysuiteAdapter
├── iframe.ts           # Modo A — iframe/HTML embed
├── widget.ts           # Modo B — script JS inyectado
├── api.ts              # Modo C — fetch API REST
└── index.ts            # exporta el modo activo vía env var
```

Variable de entorno en `.env.local`:
```
NEXT_PUBLIC_MOBYSUITE_MODE=iframe   # "iframe" | "widget" | "api"
NEXT_PUBLIC_MOBYSUITE_URL=          # URL del iframe o endpoint API
NEXT_PUBLIC_MOBYSUITE_TOKEN=        # token API (modo C)
NEXT_PUBLIC_MOBYSUITE_SCRIPT_ID=    # ID del widget (modo B)
```

### Modo A — Iframe / HTML embed (más simple)
```tsx
// components/sections/CotizadorMobysuite.tsx
<iframe
  src={process.env.NEXT_PUBLIC_MOBYSUITE_URL}
  className="w-full min-h-[700px] border-0 rounded-xl"
  title="Cotizador Boulevard Santa Rosa"
/>
```
- Página `/cotizador` con el iframe a full-width.
- El iframe hereda estilos básicos del contenedor (max-width, bordes).
- Fallback: si la URL no está configurada → muestra el formulario de contacto.

### Modo B — Widget JS inyectado
```tsx
// components/sections/CotizadorMobysuite.tsx
useEffect(() => {
  const script = document.createElement('script')
  script.src = 'URL_DEL_SCRIPT_MOBYSUITE'
  script.setAttribute('data-container', 'mobysuite-widget')
  document.body.appendChild(script)
  return () => document.body.removeChild(script)
}, [])

return <div id="mobysuite-widget" className="w-full min-h-[600px]" />
```
- El widget se renderiza dentro del contenedor con nuestra clase → respeta el diseño.
- Se puede sobreescribir estilos del widget con CSS custom en `globals.css`.

### Modo C — API REST (máximo control visual)
```tsx
// lib/mobysuite/api.ts
export async function getTipologias(): Promise<Tipologia[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_MOBYSUITE_URL}/tipologias`, {
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_MOBYSUITE_TOKEN}` },
    next: { revalidate: 300 } // ISR cada 5 min
  })
  return res.json()
}
```
- Los datos de Mobysuite se renderizan con nuestros propios componentes (`PropertyCard`, `DepartamentoModal`).
- ISR de 5 minutos: el sitio siempre tiene precios actualizados sin rebuild.
- Mock de respaldo: si la API falla → `lib/data/tipologias.ts` como fallback.

### Página `/cotizador`
- Ruta `app/cotizador/page.tsx`.
- Renderiza `<CotizadorMobysuite />` que selecciona el modo activo según la env var.
- Metadata SEO específica para cotizar.
- Accesible desde el nav global y desde cada `PropertyCard`.

### Protocolo cuando llegue la documentación de Mobysuite
1. Identificar el modo (iframe / widget / API).
2. Completar `lib/mobysuite/<modo>.ts` con la URL/token real.
3. Setear `NEXT_PUBLIC_MOBYSUITE_MODE` en `.env.local`.
4. Verificar en local → commit → PR → preview Vercel.
5. **Sin tocar** ningún componente de diseño ni rutas existentes.

---

## Mejoras de marketing/visual sobre el Figma

1. **Hero** — render con parallax sutil, overlay gradiente, entrada de texto escalonada, indicador scroll-down.
2. **Stats** — contadores con count-up al entrar en viewport.
3. **Scroll-reveal** — fade-up + stagger en cada sección (componente `Reveal`).
4. **Header sticky** — transparente sobre el hero → blanco sólido al hacer scroll.
5. **Galería** — carousel + lightbox + zoom en hover.
6. **Tipologías** — filtros interactivos, hover elevation, toggle **UF/CLP** con valor UF del día.
7. **Masterplan** — hotspots numerados clickeables con tooltip, tabs Plan 1 / Azotea.
8. **WhatsApp FAB** — botón flotante con pulso.
9. **Badges de urgencia** ("Últimas 3 unidades") con animación sutil.
10. **Micro-interacciones** en los 4 botones + smooth scroll.
11. **SEO base** — metadata por página, Open Graph, `sitemap.ts`, `robots.ts`, JSON-LD `RealEstateListing`, alt en imágenes, headings semánticos.

---

## Etapas de ejecución (Etapa 1 = local)

- ✅ **E0 — Scaffold**: Next.js 14 + Tailwind + shadcn + TypeScript + Framer Motion + Embla Carousel + react-hook-form + zod. 
  - Estructura: `/app/src/{app,components,lib}`
  - Servidor corriendo: **http://localhost:8080** (Next.js 16.2.9 Turbopack)
  - Componentes base creados: Button (4 variantes), StatusBadge, SectionHeading
  - Configuración: tailwind.config.ts con tokens del Figma
  - Metadata: layout.tsx con Poppins + meta tags Boulevard Santa Rosa

- ✅ **E1 — Layout + Design System Completo**:
  - ✓ Header sticky + Footer con contacto
  - ✓ WhatsApp FAB flotante (pulso animado)
  - ✓ Home funcional: Hero + Stats + Features + Tipologías + CTA
  - ✓ DataCard component creado
  - ✓ 7 páginas de rutas creadas y sirviendo: /proyecto, /tipologias, /ubicacion, /galeria, /proceso-compra, /contacto, /cotizador
  - ✓ Metadata personalizada por página

- ✅ **E2 — Expandir páginas + Datos mock**:
  - ✓ lib/data creada con tipologias, faqs, proceso, areas mock
  - ✓ /proyecto: Descripción + áreas comunes (6 DataCard)
  - ✓ /tipologias: 6 tipologías con datos (precio UF/CLP, m2, estado)
  - ✓ /proceso-compra: 6 pasos + FAQ interactivo (accordion)
  - ✓ /contacto: Form funcional + datos de contacto
  - ✓ Todas las páginas están sirviendo contenido dinámico

- ✅ **E3 — Redesign Figma (Homepage)** — 2026-06-12:
  - ✓ Header rediseñado: logo cross icon + "BOULEVARD SANTA ROSA / San Miguel", nav correcto (Proyecto/Ubicación/Departamentos/Áreas Comunes/Inversión/Contacto), menú mobile con hamburguesa
  - ✓ HeroSection: split layout (texto izquierda, render derecha), titular "Vive conectado al nuevo San Miguel", botones "Cotizar ahora →" + "Descargar brochure"
  - ✓ StatsBand nueva: fondo navy #033D6B, 4 estadísticas con íconos (6 Pisos / 94 Departamentos / 62 Estacionamientos / 48 Bodegas)
  - ✓ UbicacionSection nueva: bullets conectividad + mapa placeholder + grid POIs (Supermercados/Educación/Salud/Comercio)
  - ✓ ConoceProyectoSection nueva: mosaico de 5 fotos (1 grande izquierda + 2×2 derecha)
  - ✓ AreasComunes nueva: 6 amenidades en grid (Quinchos, Co-work, Sala Multiuso, Bicicletero, Áreas Verdes, Estac. Visita)
  - ✓ InvierteSection nueva: texto izquierda + 4 tarjetas métricas (5-6% rentabilidad, 35-40% plusvalía, Alta demanda, Domótica)
  - ✓ TipologiasPreview nueva: plano izquierda + datos tipología 2D+1B / 45.31m² + bullets de características
  - ✓ AgendaVisita nueva: fondo navy, info contacto + formulario en tarjeta blanca (Nombre/Email/Teléfono)
  - ✓ Footer rediseñado: logo, nav, redes sociales (SVG inline), Sala de Ventas, Mobysuite badge
  - ✓ Fix lucide-react v1: Instagram/Facebook/Linkedin no existen → reemplazados por SVG inline
  - ✓ Servidor compilando sin errores en http://localhost:8080

- ✅ **E3.1 — Correcciones Figma + Fixes críticos** — 2026-06-15:
  - ✓ `layout.tsx`: eliminado `scroll-smooth` de className → movido a `style={{ scrollBehavior: "smooth" }}` (fix warning Tailwind v4)
  - ✓ `globals.css`: agregados colores de marca Boulevard en bloque `@theme inline` (fix Tailwind v4 CSS-first config): `--color-primary-green: #84CE25`, `--color-primary-blue: #0671AE`, `--color-secondary-navy: #033D6B`, `--color-secondary-green-dark: #65A81A`, `--color-surface-blue/green/light`, `--color-slate-blue`
  - ✓ Botones (`Button.tsx`) ahora renderizan con colores correctos: "Cotizar →" verde #84CE25, botones azules #0671AE, outline border visible
  - ✓ `AsesorSection.tsx` creada: "Conversemos con tu asesor" con avatar circular, datos de Enrique Polidori, CTAs "Agendar reunión" + "Conversar por WhatsApp", decorative wave lines, trust badges
  - ✓ `AsesorSection` integrada en `page.tsx` entre TipologiasPreview y AgendaVisita (match referencia Figma d0d1d184)
  - ✓ `AgendaVisita`: agregado `id="agenda"` para anclar desde el link "Agendar reunión"
  - ✓ Dev server corriendo en **http://localhost:3006** (puerto 3000/3001 ocupados por Iencinas)

- ✅ **E3.2 — HeroSection rediseño full-bleed** — 2026-06-15:
  - ✓ `HeroSection.tsx` reescrita desde cero para respetar la referencia Figma
  - ✓ **Imagen del edificio full-bleed**: ya no está en una "tarjeta" redondeada, ahora ocupa el 55% derecho de la sección como elemento de fondo absoluto (de top a bottom)
  - ✓ **Gradiente de fusión**: la imagen del edificio tiene `from-[#E3F3FB] via-[#E3F3FB]/60 to-transparent` en el borde izquierdo para que se funda suavemente con el área de ondas
  - ✓ **Ondas en SVG global**: las líneas onduladas ahora abarcan todo el ancho del hero con un único SVG (no dividido en divs izquierdo/derecho), corriendo desde x=510 hasta x=1440 sobre el área azul y cruzando hacia la imagen del edificio — creando la conexión visual que faltaba
  - ✓ **Ondas zona blanca**: 4 líneas adicionales que arrancan desde x=-20 y llegan hasta la frontera del área azul (x≈560) para continuidad visual
  - ✓ **Fondo azul derecho**: área `#E3F3FB` con borde izquierdo ondulado (path bezier `M590,0 C550,120 610,260...`) que "abraza" el edificio
  - ✓ **Contenido izquierdo**: `max-w-[500px]`, sin grid de 2 columnas, el texto flota libre sobre el fondo blanco con las ondas sutiles detrás

- ✅ **E3.4 — HeroSection: ondulaciones diagonales desde la derecha** — 2026-06-15:
  - ✓ 15 líneas diagonales que NACEN en x=1440 (borde derecho) y fluyen hacia abajo-izquierda
  - ✓ Cada línea = path bezier con 4 segmentos S-curve (función `diagonalWave()`): crea 4+ inflexiones visibles por línea = "hartas ondulaciones"
  - ✓ SVG mask con gradiente horizontal: las líneas se desvanecen hacia la izquierda (efecto "fundiéndose con la imagen")
  - ✓ Líneas más visibles cerca del edificio (derecha), casi transparentes sobre el texto (izquierda)
  - ✓ Área azul #E3F3FB + imagen edificio full-bleed mantienen el layout correcto

- ✅ **E3.3 — HeroSection: ondas diagonales correctas** — 2026-06-15:
  - ✓ Eliminadas las líneas horizontales (incorrectas según referencia Figma)
  - ✓ **Nuevo patrón de ondas**: 6 curvas S paralelas que fluyen de ARRIBA A ABAJO con oscilación izquierda-derecha (no horizontal)
  - ✓ Implementado con función `wavePath(x0)` que genera bezier cúbicos verticales con 2 inflexiones (S-curve)
  - ✓ Cada línea paralela se desplaza +38px en X respecto a la anterior → crea el efecto "ondulaciones que vienen del lado derecho en diagonal"
  - ✓ La PRIMERA línea (más a la izquierda) define el borde del área azul `#E3F3FB` — es el fill del `waveAreaPath()`
  - ✓ Las siguientes 6 líneas son strokes sin fill, opacidad decreciente (0.20 → 0.04)
  - ✓ Imagen del edificio sigue full-bleed en el lado derecho 54%, con gradient fade izquierdo `from-[#E3F3FB]` para fusión
  - ✓ Sin errores de compilación, sección verificada en preview

- ✅ **E3.5 — Limpieza Homepage + Ajustes Figma** — 2026-06-16:
  - ✓ **Etiquetas redundantes eliminadas**: Removidos todos los `<p>` de categoría sobre los `<h2>` (CONECTIVIDAD, GALERÍA, AMENIDADES, INVERSIÓN, Tipologías, Contacto) en UbicacionSection, ConoceProyectoSection, AreasComunes, InvierteSection, TipologiasPreview, AsesorSection, AgendaVisita
  - ✓ **Logo real en Header**: Reemplazado el logo SVG genérico por `next/image` apuntando a `/Boulevard_color.png` (archivo en `/public/`). Tamaño `width={160} height={48}`, `className="h-10 w-auto object-contain"`, `priority`
  - ✓ **ConoceProyectoSection — layout Figma correcto**: Reescrita completa con `grid-cols-5`. Columna izquierda (col-span-2): título + línea verde + descripción + botón "Ver galería completa →". Columna derecha (col-span-3): mosaico CSS Grid con 1 imagen grande (gridRow: "1/3") + 4 pequeñas en 2×2
  - ✓ **InvierteSection — botón CTA**: Añadido `<Link href="/cotizador"><Button variant="primary">Cotizar ahora →</Button></Link>` debajo de los 2 párrafos de descripción
  - ✓ **InvierteSection — tarjetas métricas lado a lado**: Grid `grid-cols-2 gap-4` ya estaba implementado correctamente

- ✅ **E3.6 — Revisión visual completa + correcciones Figma** — 2026-06-16:
  - ✓ **InvierteSection — 4 tarjetas en una sola fila**: eliminada la cuadrícula 2×2; ahora `grid-cols-1 lg:grid-cols-4`. Texto+botón en top-left (2 columnas), 4 metric cards abajo en una fila completa (289px × 4)
  - ✓ **StatsBand — fondo navy**: cambiado de `bg-[#E3F3FB]` a `bg-[#033D6B]`, cards con `bg-white/10 border-white/15`, iconos lucide-react (Building2/Home/Car/Package) reemplazando emojis
  - ✓ **AreasComunes — cards profesionales**: iconos lucide-react (Flame/Monitor/Star/Bike/Leaf/Car) en contenedor con color de marca, descripción corta por amenidad, hover con `-translate-y-1`, sin emojis
  - ✓ **AsesorSection — logo real + iconos**: logo `/Boulevard_color.png` vía `next/image` en top-left, iconos lucide (Phone/Clock/Shield/UserCheck/Home) reemplazando emojis
  - ✓ **AgendaVisita — iconos profesionales**: iconos lucide (MapPin/Phone/Mail/Clock/Shield/UserCheck/Home) con fondo `bg-white/10` en la sección navy, reemplazando emojis

- ✅ **E3.7 — Revisión exhaustiva Figma II** — 2026-06-16:
  - ✓ **InvierteSection — layout correcto**: `grid-cols-5` outer, texto izquierda (col-span-2) + 4 tarjetas en fila derecha (col-span-3 con grid-cols-4 anidado). Verificado: cada tarjeta = 166px ancho
  - ✓ **StatsBand — fondo azul claro**: revertido de navy a `bg-[#E3F3FB]` (la referencia Figma muestra fondo azul suave, no navy). Iconos lucide-react, cards blancas
  - ✓ **Footer — fondo blanco**: cambiado de `bg-[#033D6B]` a `bg-white`, texto en tonos oscuros (#033D6B, #4A6275), logo real con `next/image`, íconos sociales azules sobre fondo `#E3F3FB`
  - ✓ **UbicacionSection — mapa más grande**: removido `max-w-md mx-auto` del contenedor del mapa, ahora ocupa el 100% de la columna derecha
  - ✓ **ConoceProyectoSection — mosaico mejorado**: `gridTemplateRows: "230px 230px"`, componente `PhotoCard` reutilizable con overlay oscuro, ícono `ImageIcon` lucide como placeholder, label visible
  - ✓ **AgendaVisita — imagen izquierda + formulario derecha**: layout 2-columna `lg:grid-cols-2`, columna izquierda = render SVG del edificio nocturno con ventanas iluminadas (deterministas), badge del proyecto, gradiente de transición. Columna derecha = título + datos de contacto (Phone/Mail/Clock/MapPin lucide) + formulario con campos en fondo `bg-white/10`
  - ✓ **HeroSection — ondas S-curve**: nueva función `sWave()` que genera curvas S horizontales con ligera deriva diagonal. 18 líneas desde y=60 a y=816, amplitud 28px, fade gradiente derecha→izquierda
  - ✓ Fix: ventanas del SVG de AgendaVisita cambiadas de `Math.random()` a patrón determinista para evitar hydration mismatch

- **E4 — Adaptador Mobysuite**: `lib/mobysuite/` con los 3 modos (iframe/widget/api) + .env.local
- **E5 — Interactividad**: modal detalle depto, filtros tipologías, masterplan hotspots, galería lightbox
- **E6 — Animaciones**: Framer Motion (reveal, parallax, counters, micro-interacciones)
- **E7 — Responsive QA**: mobile / tablet / desktop  
- **E8 — SEO + Analytics**: metadata dinámicas, OG, sitemap, robots, JSON-LD, GA4, GTM
- **E9 — QA Final**: revisión visual, tests Lighthouse CI, bugfixes

**Etapa 2 (posterior, fuera de este plan)**: repo GitHub, Vercel, GitHub Actions CI, tests (Vitest + Playwright + Lighthouse CI), Sanity CMS, dominio `.cl`.

---

## Recomendaciones adicionales

### Analytics y conversión (agregar en v1 antes del lanzamiento)
- **Google Analytics 4** — instalar `@next/third-parties/google` (no impacta performance). Eventos clave: `clic_cotizar`, `clic_whatsapp`, `ver_departamento`, `descargar_ficha`, `envio_contacto`.
- **Google Tag Manager** — para que el equipo de marketing pueda agregar pixels (Meta, Google Ads) sin tocar código.
- **Hotjar o Microsoft Clarity** (gratis) — heatmaps y grabaciones de sesión. Revela dónde se pierde la gente antes de cotizar.

### Conversión y UX (mejoras de marketing sobre el Figma)
- **Exit-intent popup** — si el usuario mueve el mouse hacia cerrar → mostrar oferta o formulario de contacto rápido.
- **Sticky CTA bar en mobile** — barra fija abajo con botones "Cotizar" y "WhatsApp" (en mobile el header queda lejos).
- **Social proof** — añadir un contador de "Unidades reservadas esta semana" o testimonios de compradores.
- **Lead magnet** — botón "Descarga el brochure" que pide email antes de entregar el PDF. Captura leads pasivos.
- **Contador de urgencia** — "Quedan N unidades disponibles" dinámico desde los datos de Mobysuite.

### Performance
- **next/image** con `priority` en el hero (evita LCP alto).
- **`loading="lazy"`** en imágenes fuera del viewport.
- **Prefetch de rutas** en el nav (`<Link prefetch>`) para transiciones instantáneas.
- **Bundle analyzer** (`@next/bundle-analyzer`) para detectar librerías pesadas antes del deploy.

### SEO local (crítico para proyectos inmobiliarios en Chile)
- **Google Business Profile** — crear perfil del proyecto con dirección, fotos y link al sitio.
- **Schema.org `RealEstateListing`** con `address`, `numberOfRooms`, `floorSize`, `price` en UF.
- **Meta descripción con UF** — "Departamentos desde UF 2.850 en San Miguel. 1D+1B, 2D+2B." — aparece en Google.
- **Palabras clave objetivo**: "departamentos San Miguel", "boulevard santa rosa san miguel", "departamentos nuevos santiago sur".

### Preparación para Etapa 2
- Crear `.env.example` desde el inicio (`.env.local` nunca va a git).
- Estructura de carpetas ya preparada para Sanity (`lib/sanity/`) y tests (`__tests__/`, `e2e/`) — vacías pero nombradas.
- Convenciones de commit desde el día 1: `feat:`, `fix:`, `chore:` (Conventional Commits) — simplifica el CHANGELOG.

---

## Verificación (antes de pasar a Etapa 2)

1. `npm run dev` levanta sin errores en `http://localhost:3000`.
2. Navegar las 8 rutas; header/footer/WhatsApp consistentes en todas.
3. Probar interactividad: abrir modal de departamento, filtros de tipologías, tabs del masterplan, lightbox de galería, envío del form de contacto (validación zod).
4. Revisar responsive en DevTools (375px, 768px, 1440px).
5. `npm run build` compila sin errores de tipos.
6. Revisión visual conjunta contra las referencias del Figma.

---

## Notas

- El token de Figma fue compartido en texto plano — **recomendado rotarlo** en Figma → Settings → Security.
- Imágenes: placeholders con proporciones correctas ahora; reemplazo por exports reales del Figma (página "06 Assets") después.
- Estructura pensada para que agregar una página nueva = crear `app/<ruta>/page.tsx` + componer secciones, sin tocar el resto.
- Cuando llegue la documentación de Mobysuite: identificar modo → completar `lib/mobysuite/<modo>.ts` → setear env var → verificar local.
