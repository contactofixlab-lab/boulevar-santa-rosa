# Optimizaciones PageSpeed - Boulevard Santa Rosa

**Fecha**: 2026-08-06  
**Objetivo**: Pasar de 56→90+ en Performance y 73→90+ en Accesibilidad en Google PageSpeed Insights

## 1. PERFORMANCE - Cambios Implementados

### ✓ Framer Motion Optimization
- **Antes**: SlideInSection usaba `motion.div` con `whileInView` y spring physics  
- **Después**: Reemplazado con CSS keyframes (`animate-slide-in-left`, `animate-slide-in-right`)
- **Impacto**: Reduce JavaScript bloqueante, delegando animaciones a CSS puro

**Archivos modificados:**
- `src/components/ui/SlideInSection.tsx` - Removido Framer Motion
- `tailwind.config.ts` - Agregadas 2 nuevas animaciones CSS

### ✓ Invierte Section - 3D Animations Removed
- **Antes**: 5× `motion.div` por tarjeta (div principal, sombra, luz, icon, borde)  
  - Con `whileInView` (dispara al entrar en viewport)
  - Con `whileHover` (3D rotations: rotateX, rotateY, scale)
  - Con `whileTap` (interacción táctil)
  - Spring physics con stiffness/damping
- **Después**: Simplificado a div estático con hover sutil
  - Sombra estática sin animación
  - Hover: solo `shadow-lg` y `-translate-y-2` vía Tailwind
  - Icon escalado simple: `group-hover:scale-110` en Tailwind

**Archivo modificado:**
- `src/components/sections/InvierteSection.tsx`

**Métrica estimada**: -~200ms de main thread time en IntersectionObserver

### ✓ Conoce Proyecto Section - Remove whileInView
- **Antes**: 4 features con `motion.div` y `whileInView` (desktop)  
  - Mobile carousel: también animado con `whileInView`
- **Después**: Reemplazado con divs estáticos
- **Impacto**: Elimina Framer Motion dependency de esta sección

**Archivo modificado:**
- `src/components/sections/ConoceProyectoSection.tsx`

### ✓ Lazy Loading Below-the-Fold (2026-08-06)
- **ConoceProyectoSection**: Lazy loaded with `next/dynamic({ ssr: false })`
- **InvierteSection**: Lazy loaded with `next/dynamic({ ssr: false })`
- **Impact**: Defers component hydration until client-side, reduces initial bundle
- **Estimated gain**: 10-12 Lighthouse points (Performance)

**Archivo modificado:**
- `src/app/page.tsx` - Changed to Client Component, added dynamic imports

---

## 2. ACCESIBILIDAD - Cambios Implementados

### ✓ Heading Hierarchy - Arreglada
- **Antes**: HeroSection tenía 2 × h2 (líneas 51, 54)
- **Después**: 1 × h1 con spans + id="hero-title"
- **Impacto**: Estructura semántica correcta, cumple WCAG 2.1 Level A

**Archivo modificado:**
- `src/components/sections/HeroSection.tsx`

### ✓ Aria Labels - Agregados Masivamente

#### Header
- Logo link: `aria-label="Volver al inicio - Boulevard Santa Rosa"`
- Nav links: `aria-current="page"` cuando es la página actual
- Mobile menu: `aria-label` en botón toggle (ya existía)

**Archivo:**
- `src/components/layout/Header.tsx`

#### Conoce Proyecto Section
- Botones de filtro: `aria-pressed`, `aria-label` descriptivo
- Grupo de filtros: `role="group"` + `aria-label="Filtros de fotos"`
- Botón foto principal: `aria-label` dinámico con nombre de foto

**Archivo:**
- `src/components/sections/ConoceProyectoSection.tsx`

#### Footer
- Links de contacto: `aria-label` específico para tel: y mailto:
- UF/Dólar boxes: **REMOVED invalid aria-labels** (2026-08-06) - divs decorativos no necesitan aria-label
- Cambio h4 → h3 para mejor jerarquía

**Archivo:**
- `src/components/layout/Footer.tsx`

#### Invierte Section
- Tarjetas métricas: `role="article"` + `aria-label` descriptivo
- Cambio h2 → h3 para jerarquía H2→H3 correcta
- **REMOVED duplicate aria-label** (2026-08-06) - Removido aria-label en link wrapper, mantener solo en button

**Archivo:**
- `src/components/sections/InvierteSection.tsx`

#### HeroSection (2026-08-06)
- **REMOVED duplicate aria-labels** on wrapper links - Buttons already have semantic content
- Buttons inherit context from click action, no redundant labels needed

**Archivo:**
- `src/components/sections/HeroSection.tsx`

### ✓ Aria Hidden - Agregados a Elementos Decorativos
- SVG decorativos: `aria-hidden="true"` (curvas de transición)
- Divs decorativos: `aria-hidden="true"` (líneas de color)
- Icons puramente decorativos: `aria-hidden="true"`
- Gradient overlays: `aria-hidden="true"`

### ✓ Semantic HTML Improvements
- Reemplazo de `<div>` por `<article>` donde corresponde (Invierte Section)
- Uso de `role="group"` para grupos de botones (filtros)
- Links con `aria-label` para acciones poco claras visualmente

---

## 3. Resumen de Cambios por Archivo

| Archivo | Cambio | Tipo | Impacto |
|---------|--------|------|--------|
| `src/components/ui/SlideInSection.tsx` | Remover Framer Motion, usar CSS | Performance | Alto |
| `tailwind.config.ts` | Agregar keyframes slide-in | Performance | Medio |
| `src/components/sections/InvierteSection.tsx` | Remover motion.div (5 por tarjeta); remover aria-label duplicado | Performance + Accesibilidad | Alto |
| `src/components/sections/ConoceProyectoSection.tsx` | Remover whileInView en features | Performance | Medio |
| `src/components/sections/HeroSection.tsx` | Arreglar H1, agregar aria-labelledby; remover aria-labels duplicados (2026-08-06) | Accesibilidad | Medio |
| `src/components/layout/Header.tsx` | Agregar aria-labels, aria-current | Accesibilidad | Alto |
| `src/components/layout/Footer.tsx` | Agregar aria-labels, cambiar h4→h3; remover aria-labels inválidos en divs (2026-08-06) | Accesibilidad | Medio |
| `src/app/page.tsx` | Lazy load ConoceProyectoSection + InvierteSection con next/dynamic (2026-08-06) | Performance | Alto |

---

## 4. Verificación de Build

✓ Build exitoso: `npm run build`  
✓ No warnings de type  
✓ 13/13 static pages generated  
✓ Compilación en 5-6s  

---

## 5. Próximos Pasos para Optimizar Más (Opcional)

### Performance adicional:
1. Lazy load secciones under-the-fold con `next/dynamic({ ssr: false })`
2. Preconnect a Google Fonts y external CDNs en `next.config.ts`
3. Minificar SVGs en componentes (especialmente AsesorSection waves)
4. Image optimization con `<Image>` priority settings más estricto

### Accesibilidad adicional:
1. Revisar contraste de colores con WCAG AA (AAA para textos pequeños)
2. Agregar skip-to-content link al inicio de Header
3. Probar con screen readers (NVDA, JAWS)
4. Revisar focus order en formularios (cotizador)

---

## 6. Notas Técnicas

- Framer Motion sigue siendo útil para animaciones complejas, pero es costoso para animaciones simples
- CSS animations puro (keyframes) es mucho más eficiente para entrance animations
- Tailwind's built-in utilities (`hover:`, `group-hover:`) son suficientes para hover states
- Accessible icons require `aria-hidden="true"` cuando no comunican información
- Headings deben seguir jerarquía H1 > H2 > H3 etc. (no H1 > H3 saltando)
