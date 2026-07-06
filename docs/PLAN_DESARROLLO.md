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

[Ver documento completo...]
