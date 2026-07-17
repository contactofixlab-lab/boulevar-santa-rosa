# Mockups - Cotizador Boulevard Santa Rosa

## Descripción General
El cotizador es una herramienta interactiva que permite a los usuarios:
1. Explorar las tipologías disponibles (departamentos, bodegas, locales, estacionamientos)
2. Seleccionar múltiples unidades
3. Ver carrito de compras dinámico
4. Completar datos personales
5. Generar cotización personalizada

---

## 1. MOCKUP: Vista Principal (Landing / Página Cotizador)

```
┌─────────────────────────────────────────────────────────────┐
│ COTIZADOR - Boulevard Santa Rosa                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Selecciona tus unidades                              │   │
│  │                                                       │   │
│  │  [Departamentos] [Bodegas] [Locales] [Estacion.]    │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ Tipologías Disponibles                                │   │
│  │                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │ Depto 1  │  │ Depto 2  │  │ Depto 3  │           │   │
│  │  │ 3 dorm   │  │ 2 dorm   │  │ 1 dorm   │           │   │
│  │  │ UF 2.850 │  │ UF 2.100 │  │ UF 1.650 │           │   │
│  │  │ [+]      │  │ [+]      │  │ [+]      │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  │                                                       │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐           │   │
│  │  │ Bodega   │  │ Local    │  │ Estac.   │           │   │
│  │  │ 25 m²    │  │ 50 m²    │  │ Simple   │           │   │
│  │  │ UF 450   │  │ UF 1.200 │  │ UF 150   │           │   │
│  │  │ [+]      │  │ [+]      │  │ [+]      │           │   │
│  │  └──────────┘  └──────────┘  └──────────┘           │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                               │
│  ┌──────────────────┐                                        │
│  │  [CONTINUAR]     │  (deshabilitado si carrito vacío)      │
│  └──────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. MOCKUP: Carrito Lateral (Desktop) / Modal (Mobile)

```
┌─────────────────────────────┐
│ TU SELECCIÓN                │
├─────────────────────────────┤
│                             │
│ Depto 3 Dorm - Piso 5      │
│ UF 2.850                   │
│ [x] Eliminar               │
│                             │
│ Bodega 25m² - Nivel -1     │
│ UF 450                     │
│ [x] Eliminar               │
│                             │
│ Estacionamiento Simple     │
│ UF 150                     │
│ [x] Eliminar               │
│                             │
├─────────────────────────────┤
│ TOTAL:  UF 3.450            │
├─────────────────────────────┤
│                             │
│ [CONTINUAR CON COTIZACIÓN]  │
└─────────────────────────────┘
```

---

## 3. MOCKUP: Formulario de Cotización

```
┌─────────────────────────────────────────────────────────────┐
│ DATOS PERSONALES                                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│ Nombre Completo:          ┌──────────────────────────────┐  │
│                           │                              │  │
│                           └──────────────────────────────┘  │
│                                                               │
│ Email:                    ┌──────────────────────────────┐  │
│                           │                              │  │
│                           └──────────────────────────────┘  │
│                                                               │
│ Teléfono:                 ┌──────────────────────────────┐  │
│                           │                              │  │
│                           └──────────────────────────────┘  │
│                                                               │
│ RUT:                      ┌──────────────────────────────┐  │
│                           │                              │  │
│                           └──────────────────────────────┘  │
│                                                               │
│ Mensaje Adicional:        ┌──────────────────────────────┐  │
│                           │                              │  │
│                           │                              │  │
│                           └──────────────────────────────┘  │
│                                                               │
│ ☐ Deseo recibir información sobre financiamiento           │
│ ☐ Acepto términos y condiciones                            │
│                                                               │
│                           [GENERAR COTIZACIÓN]               │
└─────────────────────────────────────────────────────────────┘
```

---

## 4. MOCKUP: Confirmación / Descarga

```
┌─────────────────────────────────────────────────────────────┐
│ ¡COTIZACIÓN ENVIADA!                                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ✓ Tu cotización ha sido enviada a: nombre@email.com        │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │ Resumen de tu Cotización:                           │    │
│  │                                                     │    │
│  │ • Departamento 3 Dorm - Piso 5      UF 2.850       │    │
│  │ • Bodega 25m² - Nivel -1             UF 450        │    │
│  │ • Estacionamiento Simple              UF 150       │    │
│  │                                                     │    │
│  │ TOTAL:                               UF 3.450       │    │
│  │                                                     │    │
│  │ Nuestro equipo se contactará contigo en 24 horas.  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
│              [DESCARGAR PDF]  [NUEVA COTIZACIÓN]             │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. MOCKUP: Vista Mobile (Responsive)

### Mobile - Selección de Tipologías
```
┌─────────────────────┐
│ COTIZADOR           │
├─────────────────────┤
│ Categorías:         │
│ [Depto] [Bodega]    │
│ [Local] [Estacion.] │
│                     │
│ ┌────────────────┐  │
│ │ Depto 3 Dorm  │  │
│ │ UF 2.850      │  │
│ │ [+]            │  │
│ └────────────────┘  │
│ ┌────────────────┐  │
│ │ Depto 2 Dorm  │  │
│ │ UF 2.100      │  │
│ │ [+]            │  │
│ └────────────────┘  │
│ ┌────────────────┐  │
│ │ Bodega 25m²   │  │
│ │ UF 450        │  │
│ │ [+]            │  │
│ └────────────────┘  │
│                     │
│ [Ver Carrito (2)]   │
└─────────────────────┘
```

### Mobile - Carrito Modal
```
┌─────────────────────┐
│ TU SELECCIÓN   [x]  │
├─────────────────────┤
│ Depto 3D  UF 2.850  │
│ [x]                 │
│                     │
│ Bodega   UF 450     │
│ [x]                 │
│                     │
├─────────────────────┤
│ TOTAL: UF 3.300    │
├─────────────────────┤
│ [CONTINUAR]         │
└─────────────────────┘
```

---

## Notas de Diseño

- **Colores**: Usar paleta Boulevard (#0671AE azul, #84CE25 verde, #033D6B navy)
- **Tipografía**: Nunito Sans (igual que la web)
- **Animaciones**: Smooth transitions al añadir/remover items
- **Validaciones**: En tiempo real para email, RUT, teléfono
- **Responsividad**: Desktop (sidebar carrito), Tablet (modal), Mobile (overlay)
- **Accesibilidad**: ARIA labels, focus states, keyboard navigation

