# 🗾 Japón 2027/2028 — Itinerario Interactivo

App React para planear y consultar un itinerario de viaje a Japón de 38 días. Incluye panel con agente IA para evaluar lugares nuevos contra el itinerario.

## El viaje

- **Duración:** 38 días
- **Temporada:** Noviembre 2027 o 2028 (koyo + onsen)
- **Ruta:** Sur → Norte (Okinawa → Hokkaido), salida desde Narita

| Bloque | Días | Lugares clave |
|--------|------|---------------|
| Okinawa | 1–4 | Naha, Islas Kerama, Acuario Churaumi |
| Kyushu | 5–10 | Fukuoka, Nagasaki, Kumamoto, Yufuin ♨️, Beppu |
| Shikoku | 11–15 | Matsuyama, Naoshima, Iya Valley, Naruto |
| Honshu Oeste | 16–21 | Hiroshima, Miyajima, Kyoto, Nara, Osaka |
| Honshu Centro | 22–28 | Kanazawa, Takayama, Shirakawa-go, Kusatsu ♨️, Nikko |
| Hokkaido | 29–33 | Sapporo, Noboribetsu ♨️, Hakodate |
| Tokyo | 34–38 | Barrios, Kamakura, salida Narita |

---

## Stack

- React 19 + Vite 8
- Vercel Serverless Functions
- Vercel Blob (persistencia)
- Claude API / Anthropic SDK (panel agente)

## Desarrollo local

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # build de producción
```

## Variables de entorno

Crear `.env.local` para desarrollo local (no se commitea):

```
BLOB_READ_WRITE_TOKEN=...
ANTHROPIC_API_KEY=...
SITE_PASSWORD=...
```

En producción estas variables viven en Vercel → Settings → Environment Variables.

## Endpoints

| Método | Ruta | Descripción |
|--------|------|-------------|
| `POST` | `/api/auth` | Valida la frase de acceso |
| `GET` | `/api/places` | Lista lugares guardados |
| `POST` | `/api/places` | Guarda un lugar nuevo |
| `POST` | `/api/evaluate` | Evalúa un lugar con Claude |

Todos los endpoints excepto `/api/auth` requieren el header `x-site-password`.

## Acceso

El sitio pide una frase de acceso al abrir. Se comparte solo la URL — no se necesita cuenta ni acceso al repositorio.

---

## Contexto de planeación

Este itinerario fue construido con base en las siguientes prioridades:

- Visitar las 5 islas principales (Okinawa, Kyushu, Shikoku, Honshu, Hokkaido)
- Onsen hopping sin saturar el viaje — máximo 3 onsens ancla
- Ruta Sur→Norte para terminar cerca de Narita sin backtracking
- Noviembre como ventana ideal: koyo (follaje otoñal) + onsens + menos turistas que primavera
- Evitar Golden Week, Obon y Silver Week
- Vuelos domésticos solo en saltos largos (OKA→FUK, TYO→CTS, HKD→TYO)
- Todo lo demás en shinkansen o tren regional

El itinerario está pensado para ajustarse sobre la marcha — hay días con margen intencional.
