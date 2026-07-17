# Plan de Desarrollo - Cotizador Boulevard Santa Rosa

**Fecha de inicio**: 2026-07-17  
**Estimado de duración**: 4-5 semanas  
**Equipo**: 1 desarrollador  
**Estado**: 📋 PLANIFICACIÓN

---

## 📊 Resumen Ejecutivo

Desarrollo de una herramienta interactiva de cotización que permite a usuarios finales:
1. Explorar tipologías disponibles en Boulevard Santa Rosa
2. Crear un carrito con múltiples unidades
3. Completar datos personales
4. Recibir cotización por email con PDF

**Impacto**: Incremento de leads, mejor experiencia de usuario, automatización del proceso de cotización.

---

## 🎯 Objetivos

- [ ] Crear flujo de cotización completo (selección → datos → envío)
- [ ] Integrar con API Mobysuite para tipologías dinámicas
- [ ] Generar PDFs profesionales con resumen de cotización
- [ ] Validar datos en tiempo real (email, RUT, teléfono)
- [ ] Hacer responsive para desktop/mobile/tablet
- [ ] Implementar rate limiting y protección contra spam

---

## 📈 Fases de Desarrollo

### FASE 1: INFRAESTRUCTURA Y SETUP (1 semana)

**Duración**: 5 días  
**Objetivos**: Preparar el proyecto y la base de datos

#### Tareas

**1.1 Setup Base de Datos (1 día)**
- [ ] Crear tablas `cotizaciones` y `cotizacion_items` en Neon
- [ ] Crear índices en `email`, `fecha_creacion`
- [ ] Hacer backup de configuración
- **Archivo generado**: Migration SQL

**1.2 Setup Backend API (2 días)**
- [ ] Crear estructura `/api/cotizador/` en Next.js
- [ ] Endpoint `GET /api/cotizador/tipologias` (obtener de Mobysuite)
- [ ] Endpoint `POST /api/cotizador/cotizaciones` (guardar cotización)
- [ ] Middleware de validación y rate limiting (5 req/IP/hora)
- [ ] Setup SendGrid o similar para emails
- **Archivos**: `src/app/api/cotizador/*`

**1.3 Setup Frontend (1 día)**
- [ ] Crear página `/cotizador` con layout base
- [ ] Crear estructura de carpetas `/components/cotizador/*`
- [ ] Instalar dependencias: `react-hook-form`, `zod`, `@react-pdf/renderer`
- [ ] Setup estado global (Context o Zustand para carrito)
- **Archivos**: `src/app/cotizador/page.tsx`, `src/components/cotizador/`

**1.4 Testing Setup (1 día)**
- [ ] Configurar Jest y React Testing Library
- [ ] Tests unitarios básicos para validaciones
- **Archivos**: `__tests__/`

---

### FASE 2: VISTA DE SELECCIÓN (1 semana)

**Duración**: 5 días  
**Objetivos**: Implementar selección de tipologías

#### Tareas

**2.1 Componente TipologiasGrid (2 días)**
- [ ] Crear componente que muestre grid de tipologías
- [ ] Diseño: 3 columnas desktop, 1-2 mobile
- [ ] Agregar botón "[+]" con animación
- [ ] Cargar tipologías desde API
- [ ] Agregar filtros por categoría (tabs)
- [ ] Loader mientras carga
- [ ] Manejo de errores
- **Componente**: `src/components/cotizador/TipologiasGrid.tsx`

**2.2 Componente CarritoSidebar (2 días)**
- [ ] Crear sidebar desktop con lista de selecciones
- [ ] Mostrar nombre, precio, botón eliminar
- [ ] Actualizar total en tiempo real
- [ ] Persistir en sessionStorage
- [ ] Indicador de cantidad de items
- [ ] Mobile: Convertir a modal/drawer
- **Componente**: `src/components/cotizador/CarritoSidebar.tsx`

**2.3 Context/State Management (1 día)**
- [ ] Crear `CarritoContext` para estado global
- [ ] Acciones: addItem, removeItem, clearCarrito
- [ ] Persistencia en sessionStorage
- **Archivo**: `src/context/CarritoContext.tsx`

---

### FASE 3: FORMULARIO Y VALIDACIÓN (1 semana)

**Duración**: 5 días  
**Objetivos**: Implementar formulario de datos personales con validaciones

#### Tareas

**3.1 Schema de Validación con Zod (1 día)**
- [ ] Definir esquemas: email, RUT, teléfono, nombre
- [ ] Tests para cada validador
- **Archivo**: `src/schemas/cotizacion.schema.ts`

**3.2 Componente CotizacionForm (3 días)**
- [ ] Usar React Hook Form + Zod
- [ ] Campos: nombre, email, teléfono, RUT, mensaje
- [ ] Validaciones en tiempo real (onChange)
- [ ] Checkboxes: financiamiento, términos
- [ ] Botón submit deshabilitado si hay errores
- [ ] Mostrar mensajes de error inline
- [ ] Loading state durante envío
- **Componente**: `src/components/cotizador/CotizacionForm.tsx`

**3.3 Validadores Específicos (1 día)**
- [ ] Validador RUT chileno
- [ ] Validador teléfono (+56)
- [ ] Validador email
- [ ] Tests unitarios
- **Archivo**: `src/lib/validators.ts`

---

### FASE 4: BACKEND - GENERACIÓN Y ENVÍO (1 semana)

**Duración**: 5 días  
**Objetivos**: Implementar lógica de cotización, email y PDF

#### Tareas

**4.1 Endpoint POST /cotizaciones (2 días)**
- [ ] Recibir datos del formulario
- [ ] Validar en servidor (nunca confiar en cliente)
- [ ] Guardar en tabla `cotizaciones`
- [ ] Guardar items en tabla `cotizacion_items`
- [ ] Generar ID único
- [ ] Registrar IP y user agent para seguridad
- [ ] Retornar confirmación
- **Archivo**: `src/app/api/cotizador/cotizaciones/route.ts`

**4.2 Generación de PDF (2 días)**
- [ ] Crear template PDF con React PDF
- [ ] Incluir: logo, datos cliente, resumen unidades, total
- [ ] Guardar PDF en Vercel Storage o Cloudinary
- [ ] Retornar URL descargable
- **Archivo**: `src/lib/pdf-generator.ts`

**4.3 Envío de Email (1 día)**
- [ ] Template HTML profesional
- [ ] Incluir resumen en email
- [ ] Adjuntar (o incluir enlace a) PDF
- [ ] Enviar confirmación a cliente
- [ ] Registrar en base de datos si se envió
- **Archivo**: `src/lib/email-service.ts`

---

### FASE 5: PÁGINA CONFIRMACIÓN (3 días)

**Duración**: 3 días  
**Objetivos**: Mostrar resumen post-cotización

#### Tareas

**5.1 Componente ConfirmacionCotizacion (3 días)**
- [ ] Pantalla de éxito con animación
- [ ] Resumen de cotización (lo que se pidió)
- [ ] Botón descargar PDF
- [ ] Botón nueva cotización (reset)
- [ ] Mensaje "se envió email a X"
- [ ] Próximos pasos (contacto comercial)
- **Componente**: `src/components/cotizador/ConfirmacionCotizacion.tsx`

---

### FASE 6: RESPONSIVIDAD Y PULIDO (1 semana)

**Duración**: 5 días  
**Objetivos**: Hacer responsive, validar UX, pulir detalles

#### Tareas

**6.1 Responsive Design (2 días)**
- [ ] Pruebas en breakpoints: mobile (375px), tablet (768px), desktop (1280px)
- [ ] Ajustar layout en mobile (carrito como modal)
- [ ] Pruebas en dispositivos reales (si es posible)
- [ ] Optimizar imágenes de tipologías
- **Pruebas en**: Chrome, Safari, Firefox, Edge

**6.2 Animaciones y UX (1 día)**
- [ ] Transiciones smooth al agregar/remover items
- [ ] Loading states visuales
- [ ] Toast notifications para confirmar acciones
- [ ] Scroll automático a carrito en mobile
- **Librería**: Framer Motion (ya instalada)

**6.3 Accesibilidad (1 día)**
- [ ] ARIA labels en todos los inputs
- [ ] Navegación por teclado (Tab, Enter)
- [ ] Contraste de colores (WCAG AA)
- [ ] Alt text en imágenes
- [ ] Screen reader testing
- **Herramienta**: Axe DevTools

**6.4 Performance (1 día)**
- [ ] Lazy load de imágenes tipologías
- [ ] Optimizar bundle size
- [ ] Minify CSS/JS
- [ ] Medir con Lighthouse (target: 90+)
- [ ] Cache de tipologías (revalidate cada 24h)

---

### FASE 7: SEGURIDAD Y TESTING (1 semana)

**Duración**: 5 días  
**Objetivos**: Asegurar app y realizar QA completo

#### Tareas

**7.1 Seguridad (2 días)**
- [ ] Rate limiting: máximo 5 cotizaciones/IP/hora
- [ ] Validación en servidor de todos los inputs
- [ ] Sanitización de datos (no XSS, SQL injection)
- [ ] Encriptación de RUT en BD (bcrypt u otro)
- [ ] HTTPS en todas las rutas
- [ ] CORS configurado correctamente
- [ ] Headers de seguridad (CSP, X-Frame-Options, etc.)
- [ ] Test de inyección SQL manual
- **Archivo**: Security checklist

**7.2 Testing Manual QA (2 días)**
- [ ] Flujo completo end-to-end (seleccionar → form → envío)
- [ ] Validaciones (email inválido, RUT inválido, etc.)
- [ ] Errores: sin internet, API caída, email service caído
- [ ] Carrito: agregar/remover/limpiar
- [ ] Responsive: Mobile, Tablet, Desktop
- [ ] Navegadores: Chrome, Safari, Firefox, Edge
- [ ] PDF: se descarga, se abre, tiene datos correctos
- [ ] Email: se recibe en tiempo real, tiene contenido correcto
- **Documento**: QA Checklist

**7.3 Testing Automatizado (1 día)**
- [ ] Tests unitarios para validadores
- [ ] Tests para componentes principales (TipologiasGrid, CarritoSidebar)
- [ ] Tests de integración para API
- [ ] Cobertura mínimo 70%
- **Framework**: Jest + React Testing Library

---

### FASE 8: DEPLOY Y MONITOREO (3 días)

**Duración**: 3 días  
**Objetivos**: Desplegar a producción y configurar monitoreo

#### Tareas

**8.1 Deploy Previo (1 día)**
- [ ] Deploy a staging (rama `staging`)
- [ ] QA en staging
- [ ] Pruebas de carga (simular 100 usuarios)
- [ ] Validar emails en staging

**8.2 Deploy Producción (1 día)**
- [ ] Merge a `main`
- [ ] Deploy a https://boulevard-santa-rosa.vercel.app
- [ ] Smoke tests en producción
- [ ] Verificar emails lleguen
- [ ] Verificar PDFs descargables
- [ ] Revisar CloudFlare analytics

**8.3 Monitoreo (1 día)**
- [ ] Setup Sentry para error tracking
- [ ] Setup Google Analytics eventos
- [ ] Dashboard de cotizaciones (pendiente crear admin panel)
- [ ] Alertas: rate limit alcanzado, email service caído
- [ ] Logs en BD para auditoría
- **Herramientas**: Sentry, GA4

---

## 🏗️ Arquitectura Técnica

### Estructura de Carpetas

```
src/
├── app/
│   ├── cotizador/
│   │   └── page.tsx                 # Página principal
│   ├── api/
│   │   └── cotizador/
│   │       ├── tipologias/
│   │       │   └── route.ts         # GET tipologías
│   │       └── cotizaciones/
│   │           ├── route.ts         # POST crear
│   │           ├── [id]/
│   │           │   ├── enviar/      # POST enviar
│   │           │   └── pdf/         # GET descargar
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   └── cotizador/
│       ├── TipologiasGrid.tsx
│       ├── CarritoSidebar.tsx
│       ├── CotizacionForm.tsx
│       ├── ConfirmacionCotizacion.tsx
│       └── CotizadorLayout.tsx      # Layout general
│
├── context/
│   └── CarritoContext.tsx
│
├── lib/
│   ├── validators.ts                # Validadores (RUT, email, etc)
│   ├── pdf-generator.ts             # Generador PDF
│   ├── email-service.ts             # Servicio email
│   ├── mobysuite.ts                 # Cliente API Mobysuite
│   └── db.ts                        # Cliente Neon
│
├── schemas/
│   └── cotizacion.schema.ts         # Zod schemas
│
├── types/
│   └── cotizador.ts                 # TypeScript types
│
├── hooks/
│   ├── useCarrito.ts
│   ├── useValidacion.ts
│   └── useMobysuite.ts
│
├── styles/
│   └── cotizador.css                # Estilos específicos
│
└── __tests__/
    ├── validators.test.ts
    ├── components/
    └── api/
```

### Flujo de Datos

```
USUARIO
  ↓
[Selecciona Tipologías] → CarritoContext (add/remove)
  ↓
[Completa Formulario]
  ↓
[Submit] → POST /api/cotizador/cotizaciones
  ↓
[Backend]
  ├→ Validar datos
  ├→ Guardar en BD (cotizaciones + items)
  ├→ Generar PDF
  ├→ Enviar email (con PDF)
  └→ Retornar confirmación
  ↓
[Mostrar Confirmación] → Usuario descarga PDF
```

---

## 📦 Dependencias a Instalar

```bash
npm install react-hook-form zod @hookform/resolvers
npm install @react-pdf/renderer
npm install resend  # o sendgrid
npm install axios
npm install zustand  # si usamos Zustand en lugar de Context
npm install clsx     # para className condicionales
npm install date-fns # para formatos de fecha
```

### Dev Dependencies
```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
npm install --save-dev @types/react @types/node
```

---

## ⏱️ Timeline Gantt

```
Semana 1 (5 días):  [████████] Fase 1: Setup
Semana 2 (5 días):  [████████] Fase 2: Selección
Semana 3 (5 días):  [████████] Fase 3: Formulario
Semana 4 (5 días):  [████████] Fase 4: Backend
Semana 5 (3 días):  [██████  ] Fase 5: Confirmación
Semana 5 (2 días):  [██      ] Fase 6: Responsive (paralelo)
Semana 6 (5 días):  [████████] Fase 7: Seguridad + Testing
Semana 7 (3 días):  [██████  ] Fase 8: Deploy

TOTAL: ~28 días de trabajo efectivo (4-5 semanas aprox)
```

---

## 🎬 Hitos Clave

| Hito | Fecha Estimada | Criterios de Éxito |
|---|---|---|
| Setup completado | +1 sem | BD creada, API estructura lista |
| Selección funcionando | +2 sem | Tipologías cargan, carrito guarda |
| Formulario validado | +3 sem | Validaciones frontend y backend |
| Email/PDF funcionando | +4 sem | Email llega, PDF se descarga |
| Responsive completo | +5 sem | Funciona en mobile/tablet/desktop |
| QA aprobado | +6 sem | Checklist 100%, no bugs críticos |
| En producción | +7 sem | Live en https://boulevard-santa-rosa.vercel.app |

---

## 🚨 Riesgos y Mitigación

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| API Mobysuite inestable | Media | Alto | Tests con mock data, fallback local |
| Email service caído | Baja | Alto | Retry logic, alert en admin |
| Rate limiting muy restrictivo | Media | Medio | Ajustar límite según usuarios reales |
| RUT inválido rechaza muchos | Baja | Bajo | Flexible validator, logs para revisar |
| PDF tarda mucho | Baja | Medio | Generar en background, email con enlace |

---

## ✅ Checklist Pre-Launch

- [ ] Código mergeado a `main`
- [ ] Deploy en Vercel exitoso
- [ ] Emails llegan en < 5 segundos
- [ ] PDFs se descargan sin error
- [ ] Tipologías se cargan desde API
- [ ] Rate limit funciona
- [ ] Sentry alertas configuradas
- [ ] GA eventos rastreados
- [ ] Tests pasan 100%
- [ ] Performance Lighthouse > 90
- [ ] Accesibilidad Axe sin errores críticos
- [ ] Documentación actualizada
- [ ] Team notificado del launch

---

## 📝 Notas Importantes

1. **Prioritario**: El flujo principal (seleccionar → form → email) debe ser sólido
2. **Datos de prueba**: Usar tipologías de demo de Mobysuite hasta que esté estable
3. **Rate limiting**: Ajustar después de día 1 en producción según uso real
4. **PDF**: No es crítico que sea perfecto, lo importante es que se descargue
5. **Admin panel**: No incluido en este plan (considerar para Fase 2)
6. **Analytics**: Rastrear: conversión (form enviado), tasa abandono, tiempo sesión

---

## 📞 Contactos y Escalation

**Propietario**: Vicente Rabanales (rcapcorp.cl)  
**Técnico**: Claude Code  
**Escalation**: Si API Mobysuite falla > 1 hora, contactar soporte técnico

---

**Última actualización**: 2026-07-17  
**Estado**: 📋 PLANIFICACIÓN  
**Siguiente paso**: Aprobación de mockups y requerimientos

