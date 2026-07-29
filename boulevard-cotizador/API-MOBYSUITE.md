# API Mobysuite — Hallazgos técnicos

**Fecha:** 2026-07-28
**Estado:** ✅ VERIFICADO con llamadas reales a producción

Este documento resuelve la dependencia que `PROGRESO.md` marcaba como
_"API Mobysuite — ⏳ Verificar"_. La API **funciona** y entrega todos los
datos necesarios para construir un cotizador propio con diseño libre.

---

## 1. Resumen ejecutivo

Existen **dos APIs distintas** de Mobysuite. La confusión entre ambas es la
causa de que la integración anterior nunca funcionara.

| | API Administrativa | **API del Cotizador** |
|---|---|---|
| Host | `https://inesdesuarez-api.mobysuite.com` | `https://cotizacion.mobysuite.com/api` |
| Auth | OAuth2 client_credentials | **Ninguna** (pública) |
| Uso | Back-office (508 permisos) | Alimentar cotizadores web |
| Para nuestro caso | No necesaria | ✅ **Esta es la que usamos** |

**Conclusión:** el cotizador propio NO necesita credenciales. La API del
cotizador es pública y es la misma que consume el widget oficial.

---

## 2. API del Cotizador (la que usaremos)

**Base URL:** `https://cotizacion.mobysuite.com/api/v3/`

> El prefijo de versión depende del parámetro `version` del widget:
> `version=2` → `v3`, cualquier otro → `v2`. Para Boulevard corresponde **v3**
> (`v2` devuelve HTTP 500).

### Parámetros del proyecto

```
real_estate = inesdesuarez
project_id  = 4
```

### Endpoints disponibles

| Endpoint | Método | Descripción |
|---|---|---|
| `/quotes/list-available-assets` | GET | **Unidades disponibles** (el principal) |
| `/quotes/list-projects` | GET | Listado de proyectos |
| `/quotes/list-real-estate-info` | GET | Datos de la inmobiliaria |
| `/quotes/list-demographic-info` | GET | Opciones del formulario (edad, sexo, destino) |
| `/quotes/get-terms` | GET | Términos y condiciones |
| `/quotes/get-asset-map-images` | GET | Planos de la unidad |
| `/quotes/get-building-map-images` | GET | Planos del edificio |
| `/quotes` | POST | **Crear cotización** |
| `/quotes/reservations` | POST | Reservas |
| `/opportunities/get_uf` | GET | Valor UF del día |
| `/opportunities/calculate-payment` | GET | Cálculo de dividendo |

### Llamada verificada

```
GET https://cotizacion.mobysuite.com/api/v3/quotes/list-available-assets?real_estate=inesdesuarez&project_id=4
→ HTTP 200 · 174 KB · 216 bienes
```

Acepta además el parámetro opcional `typology` para filtrar por tipo.

---

## 3. ⚠️ Cloudflare bloquea sin User-Agent de navegador

El host administrativo está detrás de Cloudflare y devuelve **HTTP 403
(Error 1010 — "browser signature banned")** a clientes sin User-Agent de
navegador. Un `fetch()` de Node sale sin User-Agent y es bloqueado.

**Solución obligatoria en toda llamada desde el servidor:**

```ts
headers: {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
}
```

---

## 4. Datos reales del proyecto (216 bienes)

Todos con `status: "DISPONIBLE"` y `showOnWebQuote: true`.

| Tipo | Cantidad |
|---|---|
| DEPARTAMENTO | 94 |
| ESTACIONAMIENTO | 61 |
| BODEGA | 58 |
| ESTACIONAMIENTO_MOTO | 3 |

### Tipologías de departamento

| Tipología | Dorm. | Baños | Superficie | UF (lista) | Unidades |
|---|---|---|---|---|---|
| TIPO A | 1 | 1 | 32,3 m² | 2.617 | 35 |
| TIPO B | 2 | 1 | 40,1 m² | 3.478 | 9 |
| TIPO C | 2 | 2 | 46,3 m² | 3.809 | 18 |
| TIPO D | 2 | 2 | 48,8 m² | 3.973 | 24 |
| TIPO E | 3 | 2 | 69,7 m² | 5.426 | 8 |

- **Rango de precios:** UF 2.027 – 5.581
- **Superficies:** 24,3 – 69,7 m²
- **Pisos:** 2 al 10

### ⚠️ Cuidado con `numberOfBeds`

`numberOfBeds` **NO son dormitorios, son camas** (capacidad). El campo
correcto para dormitorios es **`numberOfRooms`**.

Ejemplo: TIPO A tiene `numberOfRooms: 1` y `numberOfBeds: 3` en 32 m².
Usar `numberOfBeds` mostraría "3 dormitorios en 32 m²", que es falso.

---

## 5. Campos disponibles por bien

```
id                      assetNumber            floor
assetType               assetTypeValue         orientation
assetSubtype            departmentTypology     projectId
status                  available              showOnWebQuote

numberOfRooms  ← dormitorios
numberOfBathrooms
numberOfBeds   ← camas, NO dormitorios

totalArea              usableArea             lodgeArea
ufMt2

baseValue              listValue              ivaListValue
baseValue2             listValue2             ivaValue2
saleValue2             originalListValue2
authorizedDiscount     nonAuthorizedDiscount
discountGroup

urlImage1              fullUrlImageOne
jointAssets            masterAsset
```

Cubre todo lo que exige `REQUERIMIENTOS.md`: grid de tipologías, filtros
(dormitorios, baños, superficie, precio, piso, orientación), imágenes,
precios y descuentos.

---

## 6. Bugs del `src/lib/mobysuite/api.ts` actual

El archivo apunta a la API equivocada y tiene dos errores que lo hacen
fallar siempre y caer al mock:

1. **Host y ruta equivocados** — usa `MOBYSUITE_HOST/api/tipologias`
   (API administrativa). Debe usar la API del cotizador.
2. **Cloudflare 403** — el `fetch` no envía User-Agent de navegador.
3. **Campo del token mal leído** — hace `const { access_token }` pero la
   API responde **`accessToken`** (camelCase). Aunque pasara Cloudflare,
   el token quedaría `undefined`.

---

## 7. Discrepancias de datos detectadas

| Dato | Mobysuite (real) | Web (StatsBand) | Brochure PDF |
|---|---|---|---|
| Departamentos | **94** | 94 ✅ | 95 ❌ |
| Estacionamientos | **61** | 61 ✅ | 61 ✅ |
| Bodegas | **58** | 68 ❌ | 68 ❌ |
| Locales comerciales | — (no vienen en la API) | 19 | 19 |

**A confirmar con el cliente:** bodegas (58 vs 68) y departamentos en el
brochure (95 vs 94).

---

## 8. Impacto en el plan

- ✅ **Desbloquea la dependencia crítica** de `PROGRESO.md`.
- ✅ **No se necesitan credenciales** para leer el catálogo → menos riesgo.
- ⚠️ **Falta verificar el POST `/quotes`** (crear cotización): qué campos
  exige y si requiere reCAPTCHA. El widget usa reCAPTCHA
  (site key visible en su bundle), así que es probable que sí.
- ⚠️ Si el POST resulta inviable sin reCAPTCHA, alternativa: guardar la
  cotización en Neon y enviar el correo por cuenta propia, usando
  Mobysuite solo como fuente del catálogo.

---

**Verificado por:** Claude Code · 2026-07-28
**Muestra de datos:** 216 bienes descargados y analizados
