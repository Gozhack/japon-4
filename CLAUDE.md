# japan-4

Itinerario de viaje a Japón — app React desplegada en Vercel.

## Stack

- React 19 + Vite 8
- Sin router, sin librerías de UI — todo CSS-in-JS inline
- ESLint configurado

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # build de producción (output en dist/)
npm run preview  # previsualizar el build local
npm run lint     # linting
```

## Estructura

```
src/
  App.jsx          # componente raíz (itinerario completo)
  main.jsx         # entry point
  App.css          # estilos globales mínimos
  index.css
```

## Deploy

- Repositorio: https://github.com/Gozhack/japon-4
- Deploy: Vercel (conectado al repo, auto-deploy en push a master)
- Branch principal: `master`
- `base: '/'` en vite.config.js — necesario para Vercel (no usar `/japon-4/` que es para GitHub Pages)

## Notas

- El componente principal antes se llamaba `japan-itinerary.jsx`, renombrado a `App.jsx`
- Todo el contenido del itinerario (38 días, 7 bloques, 5 islas) vive directamente en `App.jsx`
