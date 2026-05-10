# 🗾 Japón 2027/2028 — Itinerario Interactivo

Itinerario de viaje planeado para el 4to viaje a Japón. App React interactiva con navegación por isla, detalle por día y marcadores especiales para los onsens ancla del viaje.

## Contexto del viaje

- **Duración:** 38 días
- **Temporada objetivo:** Noviembre 2027 o 2028 (koyo + onsen)
- **Ruta general:** Sur → Norte, llegando a Narita (Tokyo) al final
- **Punto de entrada/salida:** MEX → NRT (Narita), siempre

### Las 5 islas en orden de visita

| # | Isla | Días | Highlights |
|---|------|------|------------|
| 1 | Okinawa / Ryukyu | 4 | Kerama Islands, Shuri Castle, cultura Ryukyu |
| 2 | Kyushu | 6 | Fukuoka, Nagasaki, Yufuin, Beppu Jigoku |
| 3 | Shikoku | 5 | Iya Valley, Naoshima, Dogo Onsen, Naruto |
| 4 | Honshu Oeste → Centro | 13 | Hiroshima, Kyoto, Nara, Kanazawa, Takayama, Kusatsu |
| 5 | Hokkaido | 5 | Sapporo, Noboribetsu, Hakodate |
| — | Cierre Tokyo | 5 | Nikko, Kamakura, barrios, Narita salida |

### Los 3 onsens ancla

- **Yufuin** (Kyushu, día 8) — ambiente boutique, volcánico, tranquilo
- **Kusatsu** (Honshu Centro, días 26–27) — el #1 de Japón en calidad de agua, ritual yumomi, Hotel Sakurai
- **Noboribetsu** (Hokkaido, día 31) — onsen nevado, jigokudani volcánico, ryokan

---

## Stack técnico

- React 18 + Vite
- Sin dependencias externas — todo CSS-in-JS inline
- Deploy en Vercel (auto-deploy desde GitHub)

---

## Correr en local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev
```

La app corre en `http://localhost:5173` por defecto.

---

## Build para producción

```bash
npm run build
```

Genera la carpeta `dist/` lista para deploy.

---

## Subir a GitHub (primera vez)

```bash
git init
git add .
git commit -m "itinerario inicial"
git remote add origin https://github.com/TU_USUARIO/japon-4.git
git push -u origin main
```

Para cambios posteriores:

```bash
git add .
git commit -m "descripción del cambio"
git push
```

---

## Deploy en Vercel

1. Crear cuenta en [vercel.com](https://vercel.com) usando login con GitHub
2. En el dashboard: **Add New Project**
3. Seleccionar el repo `japon-4`
4. Vercel detecta Vite automáticamente — no hay nada que configurar
5. Click en **Deploy**

La URL pública quedará tipo `japon-4.vercel.app` o similar.

Cada vez que alguien haga push a `main`, Vercel redespliega automáticamente en ~30 segundos.

### Colaboradores

Para que tu hermana o novia puedan editar el itinerario:

1. En GitHub: **Settings → Collaborators → Add people**
2. Pueden editar los archivos directo desde la interfaz web de GitHub sin instalar nada
3. Sus cambios también disparan el auto-deploy en Vercel

---

## Estructura del proyecto

```
japon-4/
├── src/
│   ├── App.jsx          # Componente principal del itinerario
│   ├── main.jsx         # Entry point de React
│   └── index.css        # Reset CSS básico
├── index.html
├── vite.config.js
└── package.json
```

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