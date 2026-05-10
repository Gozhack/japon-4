# japan-4

Itinerario de viaje a Japón — React + Vercel Serverless + Claude AI.

## Stack

- React 19 + Vite 8 (sin router, sin librerías UI — CSS-in-JS inline)
- Vercel Serverless Functions (`api/`)
- Vercel Blob (persistencia de lugares guardados)
- Anthropic SDK / Claude Haiku (evaluación de lugares con IA)
- Leaflet + CartoDB dark tiles (mapa interactivo, sin API key)

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción
npm run lint     # linting
```

## Estructura

```
src/
  App.jsx        # app completa: GateScreen + itinerario + panel Agente
  main.jsx       # entry point

api/
  auth.js        # POST /api/auth — valida frase de acceso
  places.js      # GET/POST /api/places — lista y guarda lugares en Blob
  evaluate.js    # POST /api/evaluate — evalúa un lugar con Claude
```

## Variables de entorno (Vercel)

| Variable              | Descripción                                              |
|-----------------------|----------------------------------------------------------|
| `BLOB_READ_WRITE_TOKEN` | Inyectado automáticamente al conectar Vercel Blob      |
| `ANTHROPIC_API_KEY`   | API key de Claude                                        |
| `SITE_PASSWORD`       | Frase de acceso al sitio (la defines tú en Vercel)       |

## Deploy

- Repo: https://github.com/Gozhack/japon-4
- Vercel auto-deploy en push a `master`
- `base: '/'` en vite.config.js — no cambiar a subdirectorio

## Autenticación

Frase secreta definida en `SITE_PASSWORD` (Vercel env var). El frontend
valida contra `/api/auth` al cargar; los endpoints `places` y `evaluate`
requieren el header `x-site-password` en cada request. La frase se
guarda en `localStorage` tras el primer login.

## Mapa interactivo

Leaflet con tiles oscuros de CartoDB (gratis, sin API key). Aparece entre
el header de cada isla y su lista de días. Muestra todos los pins de la isla;
al expandir un día vuela suavemente a esa ubicación con zoom 13. Soporta
scroll/pinch zoom nativo. Coordenadas definidas en `locationCoords` dentro
de `App.jsx`; defaults de zoom por isla en `islandDefaults`.

## Panel Agente

Tab "AGENTE" en la barra de navegación. El usuario pega un link + nota,
se guarda en Vercel Blob y Claude lo evalúa contra el itinerario de 38 días.
Respuesta: AGREGAR / SKIP / MODIFICAR con razón y día relacionado.

`url` y `nota` se pasan directamente a `/api/evaluate` — Claude corre sin
depender de leer el Blob. Esto evita una race condition donde el CDN de
Vercel servía la versión cacheada del blob (sin el lugar recién guardado),
haciendo que el `find()` fallara y Claude nunca se llamara.
