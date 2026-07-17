# Requerimientos - Cotizador Boulevard Santa Rosa

## 1. REQUERIMIENTOS FUNCIONALES

### 1.1 Gestión de Tipologías

**RF-001**: El sistema debe mostrar todas las tipologías disponibles (departamentos, bodegas, locales, estacionamientos)
- Cada tipología muestra: nombre, descripción, precio en UF, imagen/icono
- Las tipologías se obtienen de la API de Mobysuite
- Se pueden filtrar por categoría
- Prioridad: **CRÍTICA**

**RF-002**: El usuario puede seleccionar múltiples unidades de diferentes tipologías
- Click en botón "[+]" agrega la unidad al carrito
- Se puede seleccionar la misma tipología múltiples veces
- Máximo 10 unidades por cotización (configurable)
- Prioridad: **CRÍTICA**

### 1.2 Gestión del Carrito

**RF-003**: El carrito debe mostrar todas las unidades seleccionadas
- Muestra: nombre tipología, precio, número de unidad
- Permite eliminar items del carrito
- Muestra total en UF
- Actualización en tiempo real
- Persistencia en sesión (sessionStorage)
- Prioridad: **CRÍTICA**

**RF-004**: El carrito debe ser accesible desde cualquier vista
- Desktop: sidebar fijo a la derecha
- Mobile/Tablet: botón flotante o modal
- Indicador de cantidad de items
- Prioridad: **ALTA**

### 1.3 Formulario de Cotización

**RF-005**: El usuario debe completar datos personales antes de generar cotización
- Campos: Nombre, Email, Teléfono, RUT
- Validaciones en tiempo real
- Mensaje adicional (opcional)
- Checkboxes: financiamiento, términos y condiciones
- Prioridad: **CRÍTICA**

**RF-006**: Validaciones de datos
- Email: formato válido
- RUT: formato chileno válido (XX.XXX.XXX-X)
- Teléfono: 9 dígitos (formato: +56 9 XXXX XXXX)
- Nombre: mínimo 3 caracteres, máximo 100
- Prioridad: **ALTA**

### 1.4 Generación de Cotización

**RF-007**: El sistema debe generar y enviar cotización
- Envío por email al usuario
- PDF descargable con detalles
- Resumen visible en pantalla
- Datos guardados en base de datos
- Prioridad: **CRÍTICA**

**RF-008**: La cotización debe incluir
- Resumen de unidades seleccionadas con precios
- Total en UF y en pesos (conversión)
- Datos del cliente
- Fecha y hora de generación
- Enlace único para seguimiento (opcional)
- Prioridad: **ALTA**

### 1.5 Integración Mobysuite

**RF-009**: Integración con API Mobysuite
- Obtener tipologías disponibles
- Validar disponibilidad de unidades
- Sincronizar precios
- Crear cotización en sistema Mobysuite
- Prioridad: **CRÍTICA**

---

## 2. REQUERIMIENTOS NO FUNCIONALES

### 2.1 Rendimiento

**RNF-001**: Tiempos de respuesta
- Carga inicial: < 2 segundos
- Búsqueda de tipologías: < 500ms
- Generación de PDF: < 3 segundos
- Envío de email: < 5 segundos

**RNF-002**: Capacidad
- Manejar 1000 cotizaciones/día
- 100 usuarios concurrentes
- Almacenamiento máximo de 10GB para PDFs

### 2.2 Seguridad

**RNF-003**: Protección de datos
- HTTPS obligatorio
- Validación de inputs en servidor y cliente
- Sanitización de datos
- Encriptación de RUT en base de datos
- Cumplimiento RGPD (eliminar cotizaciones después de 2 años)

**RNF-004**: Autenticación/Autorización
- No requiere login (público)
- Rate limiting: máx 5 cotizaciones/IP/hora
- CAPTCHA en formulario (opcional, considerar)

### 2.3 Usabilidad

**RNF-005**: Diseño responsivo
- Desktop: 1280px+
- Tablet: 768px - 1024px
- Mobile: < 768px
- Pruebas en Chrome, Safari, Firefox, Edge

**RNF-006**: Accesibilidad
- WCAG 2.1 Level AA
- Navegación por teclado
- Screen reader compatible
- Contraste de colores suficiente

### 2.4 Compatibilidad

**RNF-007**: Navegadores soportados
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**RNF-008**: Dispositivos
- Desktop (Windows, macOS, Linux)
- Tablet (iPad 6+, Android 8+)
- Mobile (iOS 12+, Android 8+)

---

## 3. REQUERIMIENTOS TÉCNICOS

### 3.1 Stack Tecnológico

**RT-001**: Frontend
- Framework: Next.js 14+
- UI: React 18+
- Estilos: Tailwind CSS
- Estado: React Context (o Zustand si necesita)
- Validación: React Hook Form + Zod
- PDF: @react-pdf/renderer o similar
- HTTP: Fetch API o Axios

**RT-002**: Backend (API interna)
- Framework: Node.js + Express o Next.js API Routes
- Base de datos: PostgreSQL (Neon)
- Email: SendGrid o similar
- Archivos: Vercel Storage o Cloudinary (PDF storage)

**RT-003**: Servicios Externos
- Mobysuite API: para tipologías y cotizaciones
- Email service: SendGrid, Resend o AWS SES
- Conversion UF: API externa o cálculo manual

### 3.2 Base de Datos

**RT-004**: Tabla `cotizaciones`
```sql
CREATE TABLE cotizaciones (
  id UUID PRIMARY KEY,
  nombre_cliente VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  telefono VARCHAR(20) NOT NULL,
  rut VARCHAR(12) NOT NULL,
  unidades JSON NOT NULL,
  total_uf DECIMAL(10,2) NOT NULL,
  total_pesos DECIMAL(15,2) NOT NULL,
  fecha_creacion TIMESTAMP DEFAULT NOW(),
  estado VARCHAR(20), -- "pendiente", "enviada", "descargada"
  pdf_url VARCHAR(500),
  mensaje_adicional TEXT,
  desea_financiamiento BOOLEAN,
  ip_cliente VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

**RT-005**: Tabla `cotizacion_items`
```sql
CREATE TABLE cotizacion_items (
  id UUID PRIMARY KEY,
  cotizacion_id UUID NOT NULL,
  tipologia_nombre VARCHAR(100) NOT NULL,
  tipologia_id VARCHAR(100),
  precio_uf DECIMAL(10,2) NOT NULL,
  unidad_numero VARCHAR(50),
  piso VARCHAR(10),
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (cotizacion_id) REFERENCES cotizaciones(id)
);
```

### 3.3 API Endpoints (Backend)

**RT-006**: Endpoints requeridos
```
GET  /api/tipologias                 - Obtener tipologías disponibles
GET  /api/tipologias?categoria=dept  - Filtrar por categoría
POST /api/cotizaciones               - Crear nueva cotización
POST /api/cotizaciones/:id/enviar    - Enviar email
GET  /api/cotizaciones/:id/pdf       - Descargar PDF
POST /api/cotizaciones/:id/tracks    - Registrar descarga
```

---

## 4. REQUERIMIENTOS DE CONTENIDO

### 4.1 Tipologías (Datos)

**RC-001**: Debe incluir para cada tipología
- ID único (de Mobysuite)
- Nombre (ej: "Departamento 3 Dormitorios")
- Descripción
- Precio en UF (actual, de Mobysuite)
- Categoría (departamento, bodega, local, estacionamiento)
- Imagen/foto
- Piso o ubicación (si aplica)
- Estado de disponibilidad

### 4.2 Mensajes del Sistema

**RC-002**: Textos y mensajes
- Confirmación: "Agregado al carrito"
- Error: "Email inválido"
- Éxito: "Cotización enviada exitosamente"
- Tiempos de espera: "Generando PDF..."

---

## 5. REQUERIMIENTOS DE NEGOCIO

### 5.1 Objetivos

**RB-001**: Incrementar leads
- Capturar datos de interesados
- Seguimiento automatizado
- Integración con CRM

**RB-002**: Mejorar experiencia del usuario
- Proceso rápido y simple
- Transparencia en precios
- Confirmación inmediata

### 5.2 Restricciones

**RB-003**: Limitaciones
- Solo para propiedades en Boulevard Santa Rosa
- Máximo 10 unidades por cotización
- Cotizaciones válidas por 30 días
- No se pueden guardar "borradores"

---

## 6. CRITERIOS DE ACEPTACIÓN

### CA-001: Flujo Completo
- ✓ Usuario puede seleccionar tipologías sin crear cuenta
- ✓ Carrito se actualiza en tiempo real
- ✓ Formulario valida datos correctamente
- ✓ Email se recibe en < 5 segundos
- ✓ PDF es descargable y legible
- ✓ Funciona en móvil sin problemas

### CA-002: Integración Mobysuite
- ✓ Tipologías se obtienen desde API
- ✓ Precios están actualizados
- ✓ Cotización se crea en Mobysuite
- ✓ Sincronización cada 24 horas

---

## Matriz de Prioridades

| Característica | Prioridad | Fase | Esfuerzo |
|---|---|---|---|
| Mostrar tipologías | CRÍTICA | 1 | M |
| Agregar al carrito | CRÍTICA | 1 | M |
| Mostrar carrito | CRÍTICA | 1 | M |
| Formulario datos | CRÍTICA | 2 | M |
| Enviar email | CRÍTICA | 2 | M |
| Generar PDF | ALTA | 2 | L |
| Validaciones avanzadas | ALTA | 3 | M |
| Analytics | MEDIA | 3 | S |
| Descarga PDF | MEDIA | 3 | M |
| Historial cotizaciones (login) | BAJA | 4 | L |

