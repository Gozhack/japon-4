import { useState, useEffect } from "react";

const itinerary = [
  {
    island: "OKINAWA",
    islandEn: "Okinawa / Ryukyu",
    color: "#00b4d8",
    accent: "#90e0ef",
    days: [
      { day: 1, title: "Llegada a Naha", location: "Naha", type: "viaje", desc: "Vuelo MEX → NRT (escala) → OKA. Llegada tarde, check-in, descanso. Kokusai-dori de noche si hay energía.", tags: ["vuelo", "llegada"] },
      { day: 2, title: "Naha & Shuri Castle", location: "Naha", type: "cultura", desc: "Castillo Shuri (UNESCO, cultura Ryukyu única, rojo bermellón). Mercado Makishi. Comida local: champuru, soki soba.", tags: ["castillo", "cultura", "comida"] },
      { day: 3, title: "Islas Kerama", location: "Kerama Islands", type: "naturaleza", desc: "Ferry 30 min desde Naha. Aguas con visibilidad 40m, coral vivo, tortugas marinas. Snorkel o buceo. El mejor mar de Japón.", tags: ["playa", "snorkel", "naturaleza"] },
      { day: 4, title: "Churaumi Aquarium + vuelo", location: "Norte de Okinawa → Fukuoka", type: "viaje", desc: "Mañana: Acuario Churaumi (tiburones ballena en tanque enorme). Tarde: vuelo OKA → FUK. Llegada a Fukuoka.", tags: ["acuario", "vuelo"] },
    ]
  },
  {
    island: "KYUSHU",
    islandEn: "Kyushu",
    color: "#e76f51",
    accent: "#f4a261",
    days: [
      { day: 5, title: "Fukuoka", location: "Fukuoka", type: "ciudad", desc: "La ciudad más joven y dinámica de Japón. Ramen tonkotsu en su lugar de origen (Ichiran o Shin-Shin). Tenjin, canal de Nakasu, yatai (puestos callejeros nocturnos).", tags: ["gastronomía", "ciudad", "ramen"] },
      { day: 6, title: "Nagasaki", location: "Nagasaki", type: "historia", desc: "Tren desde Fukuoka (1h40). Memorial de la bomba atómica, Parque de la Paz. Barrio chino, influencia holandesa en Dejima. Vista nocturna desde Mt. Inasa (top 3 Japón).", tags: ["historia", "memorial", "cultura"] },
      { day: 7, title: "Kumamoto", location: "Kumamoto", type: "cultura", desc: "Kumamoto Castle: uno de los 3 grandes castillos de Japón, parcialmente en restauración post-terremoto 2016 (lo que lo hace visualmente único). Jardín Suizen-ji.", tags: ["castillo", "jardín"] },
      { day: 8, title: "🛁 Yufuin Onsen", location: "Yufuin", type: "onsen", desc: "ONSEN #1 del viaje. Pueblo boutique entre montañas volcánicas. Ambiente tranquilo y curado. Ryokan con rotenburo (baño exterior). Yukata por las calles, galerías de arte locales.", tags: ["onsen", "ryokan", "volcán"] },
      { day: 9, title: "Beppu — Jigoku Meguri", location: "Beppu", type: "onsen", desc: "30 min desde Yufuin. Los 8 'infiernos': agua azul cobalto (Umi Jigoku), rojo sangre (Chinoike), gris hirviendo, con cocodrilos. Espectáculo visual único. No se bañan — se observan.", tags: ["jigoku", "volcán", "único"] },
      { day: 10, title: "Miyazaki + traslado", location: "Miyazaki", type: "naturaleza", desc: "Tren costa sur. Aoshima Island (isla con jungla tropical dentro del mar). Playas de arena, palmeras — se siente diferente al resto de Japón. Tarde libre, traslado a Kagoshima o ferry.", tags: ["playa", "naturaleza", "subtropical"] },
    ]
  },
  {
    island: "SHIKOKU",
    islandEn: "Shikoku",
    color: "#2d6a4f",
    accent: "#74c69d",
    days: [
      { day: 11, title: "Llegada a Matsuyama", location: "Matsuyama", type: "viaje", desc: "Ferry desde Beppu o Usuki a Matsuyama (opción escénica por el Mar Interior de Seto). Tarde: Dogo Onsen Honkan — el onsen más antiguo de Japón (3,000 años). Bañarse aquí es más por la historia que por el onsen en sí.", tags: ["ferry", "onsen", "historia"] },
      { day: 12, title: "Matsuyama Castle + Shimanami", location: "Matsuyama / Imabari", type: "cultura", desc: "Mañana: Matsuyama Castle, vistas al Mar Interior de Seto. Tarde: inicio del Shimanami Kaido — la ruta de islas conectadas por puentes. Bicicleta opcional desde Imabari.", tags: ["castillo", "ciclismo", "islas"] },
      { day: 13, title: "Naoshima — Isla de Arte", location: "Naoshima", type: "arte", desc: "Ferry desde Takamatsu. Museos diseñados por Tadao Ando. Yayoi Kusama (la calabaza roja), Andy Warhol, Monet. Arte integrado con la naturaleza de la isla. Único en el mundo.", tags: ["arte", "arquitectura", "isla"] },
      { day: 14, title: "Iya Valley", location: "Iya Valley / Tokushima", type: "naturaleza", desc: "El valle más remoto y dramático de Japón. Kazurabashi: puentes colgantes de vid sobre el río Iya. Pueblo de Nagoro con espantapájaros tamaño real en lugar de habitantes. Gorges de cedro.", tags: ["naturaleza", "senderismo", "único"] },
      { day: 15, title: "Naruto + Ritsurin Garden", location: "Naruto / Takamatsu", type: "naturaleza", desc: "Mañana: Remolinos de Naruto desde el paseo Uzu-no-michi (42m sobre el agua). Tarde: Jardín Ritsurin en Takamatsu — 400 años de historia, absolutamente impresionante en noviembre con koyo.", tags: ["naturaleza", "jardín", "koyo"] },
    ]
  },
  {
    island: "HONSHU OESTE",
    islandEn: "Honshu — Eje Clásico",
    color: "#7b2d8b",
    accent: "#c77dff",
    days: [
      { day: 16, title: "Hiroshima + Miyajima", location: "Hiroshima", type: "historia", desc: "Shinkansen desde Takamatsu (vía Okayama). Parque Memorial de la Paz, Museo de la Bomba Atómica. Tarde: ferry a Miyajima — torii flotante del santuario Itsukushima al atardecer. Ciervos sueltos.", tags: ["historia", "UNESCO", "torii"] },
      { day: 17, title: "Kyoto — Templos del Norte", location: "Kyoto", type: "cultura", desc: "Shinkansen 1h. Fushimi Inari al amanecer (los 10,000 torii naranjas, antes de las masas). Kinkakuji. Ryoan-ji. En noviembre el koyo en los templos es de revista.", tags: ["templos", "koyo", "torii"] },
      { day: 18, title: "Kyoto — Arashiyama + Gion", location: "Kyoto", type: "cultura", desc: "Mañana: Bosque de bambú de Arashiyama, Tenryu-ji. Tarde: barrio de Gion, machiya (casas tradicionales), posible avistamiento de maiko. Noche en Pontocho.", tags: ["bambú", "geishas", "cultura"] },
      { day: 19, title: "Nara", location: "Nara", type: "cultura", desc: "45 min desde Kyoto. Ciervos sagrados por las calles. Todai-ji: el Buda de madera más grande del mundo (15 metros). Kasuga Taisha entre el bosque. Regreso a Osaka para dormir.", tags: ["ciervos", "Buda", "UNESCO"] },
      { day: 20, title: "Osaka", location: "Osaka", type: "ciudad", desc: "Dotonbori (el caos neón del takoyaki y okonomiyaki). Osaka Castle. Shinsekai. Si te queda energía, Kuromon Market en la mañana. La ciudad más honesta y sin pretensiones de Japón.", tags: ["gastronomía", "neón", "castillo"] },
      { day: 21, title: "Kobe + Kinosaki (viaje)", location: "Kobe / Kinosaki", type: "viaje", desc: "Mañana: Kobe — breve parada, carne Wagyu, barrio Kitano con casas occidentales del s.XIX. Tarde: tren a Kinosaki (2h). Si decides no repetir, directo a Kanazawa.", tags: ["gastronomía", "wagyu", "tren"] },
    ]
  },
  {
    island: "HONSHU CENTRO",
    islandEn: "Honshu — Alpes & Onsen",
    color: "#c9184a",
    accent: "#ff758f",
    days: [
      { day: 22, title: "Kanazawa", location: "Kanazawa", type: "cultura", desc: "El 'Kyoto sin turistas'. Kenroku-en (uno de los 3 jardines más bellos de Japón). Barrio de samurais Nagamachi. Barrio de geishas Higashi Chaya. Mercado Omicho para mariscos frescos.", tags: ["jardín", "cultura", "samurais"] },
      { day: 23, title: "Takayama", location: "Takayama", type: "cultura", desc: "Bus o tren desde Kanazawa (2h). Ciudad de madera del período Edo perfectamente preservada. Sanmachi Suji. Sake artesanal local. Mercado matutino Jinya-mae. Autenticísima.", tags: ["Edo", "sake", "arquitectura"] },
      { day: 24, title: "Shirakawa-go", location: "Shirakawa-go", type: "naturaleza", desc: "30 min en bus desde Takayama. Aldeas UNESCO con casas gassho-zukuri (techo de paja a 60 grados para aguantar nieve). En noviembre ya hay posibilidades de primera nieve. Absolutamente cinematográfico.", tags: ["UNESCO", "nieve", "aldeas"] },
      { day: 25, title: "Hakone", location: "Hakone", type: "naturaleza", desc: "Bus o tren hacia el este. Hakone: onsen con vista al Fuji (si el día está despejado, vistas brutales). Museo al aire libre Hakone. Lago Ashi en barco. Ryokan para la noche.", tags: ["Fuji", "onsen", "lago"] },
      { day: 26, title: "🛁 Kusatsu Onsen", location: "Kusatsu", type: "onsen", desc: "ONSEN #2 — el principal del viaje. El #1 de Japón en calidad de agua. Yubatake (campo de agua caliente en el centro del pueblo). Yumomi: ritual único de enfriar el agua con paletas de madera. Hotel Sakurai si lo reservaste.", tags: ["onsen", "ritual", "yumomi"] },
      { day: 27, title: "Kusatsu — día libre", location: "Kusatsu", type: "onsen", desc: "Segunda noche en Kusatsu. Mañana tranquila: probar diferentes baños públicos (hay 7 gratuitos). Tarde: Sainokawara Rotenburo (baño exterior enorme). Sin prisa, sin agenda.", tags: ["onsen", "relax", "rotenburo"] },
      { day: 28, title: "Nikko", location: "Nikko", type: "cultura", desc: "Tren desde Kusatsu (vía Numata). Tosho-gu: el santuario más barroco y recargado de Japón, lacado en oro entre cedros milenarios. Kegon Falls. En noviembre: koyo entre los cedros gigantes.", tags: ["santuario", "cedros", "koyo"] },
    ]
  },
  {
    island: "HOKKAIDO",
    islandEn: "Hokkaido",
    color: "#0096c7",
    accent: "#48cae4",
    days: [
      { day: 29, title: "Tokyo → Sapporo (vuelo)", location: "Sapporo", type: "viaje", desc: "Vuelo doméstico desde Haneda → New Chitose (1h40). Tarde en Sapporo: calle Susukino, ramen miso en su lugar de origen, cerveza Sapporo en la fábrica original.", tags: ["vuelo", "ramen", "cerveza"] },
      { day: 30, title: "Sapporo", location: "Sapporo", type: "ciudad", desc: "Parque Odori. Torre de TV. Mercado Nijo para cangrejo fresco de Hokkaido (el mejor de tu vida). Si hay suerte, primeras nieves en la ciudad. Ambiente completamente diferente al Japón del sur.", tags: ["gastronomía", "cangrejo", "mercado"] },
      { day: 31, title: "🛁 Noboribetsu Onsen", location: "Noboribetsu", type: "onsen", desc: "ONSEN #3 — el más dramático visualmente. Jigokudani: valle volcánico humeante con ríos de agua termal de colores. Ryokan con baños de distintos minerales. Salir del baño caliente al aire helado de Hokkaido: experiencia pura.", tags: ["onsen", "volcán", "ryokan"] },
      { day: 32, title: "Noboribetsu + Hakodate", location: "Hakodate", type: "ciudad", desc: "Mañana en Noboribetsu. Tarde: tren a Hakodate (2h). Ciudad puerto histórica con arquitectura occidental del s.XIX. Vista nocturna de la bahía desde Mt. Hakodate: top 3 vistas nocturnas de Japón.", tags: ["historia", "vista nocturna", "puerto"] },
      { day: 33, title: "Hakodate — mercado + vuelta", location: "Hakodate → Tokyo", type: "viaje", desc: "Mercado Asa-ichi al amanecer: mariscos vivos, erizos de mar, cangrejo. Vuelo Hakodate → Haneda. Tarde en Tokyo para descanso.", tags: ["mercado", "vuelo", "mariscos"] },
    ]
  },
  {
    island: "CIERRE TOKYO",
    islandEn: "Tokyo — Cierre",
    color: "#6c757d",
    accent: "#adb5bd",
    days: [
      { day: 34, title: "Tokyo — Barrios nuevos", location: "Tokyo", type: "ciudad", desc: "Shimokitazawa: el barrio más hipster de Tokyo, discos de vinilo, café de especialidad, teatro indie. Yanaka: el barrio que sobrevivió los bombardeos, casas de madera, cementerio de gatos, el Tokyo antiguo.", tags: ["barrios", "cultura", "local"] },
      { day: 35, title: "Akihabara + Asakusa", location: "Tokyo", type: "cultura", desc: "Akihabara para lo que te llame (electrónica, figuras, retro gaming). Asakusa: Senso-ji, Nakamise. Skytree si el cielo está despejado. Cena en Ueno o Yanaka Ginza.", tags: ["electrónica", "templo", "shopping"] },
      { day: 36, title: "Kamakura day trip", location: "Kamakura", type: "cultura", desc: "1h en tren desde Tokyo. Gran Buda de Kamakura (bronce, 13m, al aire libre). Templo Hase-dera. Enoshima. El mar ya está frío pero el paisaje costero en noviembre es bello y sin masas.", tags: ["Buda", "costa", "templos"] },
      { day: 37, title: "Tokyo libre — compras", location: "Tokyo", type: "libre", desc: "Día para lo que quedó pendiente. Ginza si quieres lujo. Harajuku/Omotesando para moda. Recuerdos en Nakamise o Don Quijote. Cena de despedida seria: sushi omakase o yakiniku.", tags: ["compras", "libre", "despedida"] },
      { day: 38, title: "Salida desde Narita", location: "Narita → MEX", type: "viaje", desc: "Traslado al aeropuerto con tiempo. Narita Express desde Shinjuku o Ueno (1h). Vuelo de regreso a México.", tags: ["salida", "Narita"] },
    ]
  }
];

const typeColors = {
  viaje: "#64748b",
  cultura: "#7c3aed",
  naturaleza: "#15803d",
  onsen: "#dc2626",
  ciudad: "#1d4ed8",
  historia: "#92400e",
  arte: "#be185d",
  libre: "#374151",
};

const typeLabels = {
  viaje: "✈ Viaje",
  cultura: "🏯 Cultura",
  naturaleza: "🌿 Naturaleza",
  onsen: "♨️ Onsen",
  ciudad: "🌆 Ciudad",
  historia: "📜 Historia",
  arte: "🎨 Arte",
  libre: "🕐 Libre",
};

function AgentPanel() {
  const [places, setPlaces] = useState([]);
  const [url, setUrl] = useState("");
  const [nota, setNota] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPlaces, setLoadingPlaces] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/places")
      .then((r) => r.json())
      .then((d) => { setPlaces(d.places || []); setLoadingPlaces(false); })
      .catch(() => setLoadingPlaces(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const r1 = await fetch("/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), nota: nota.trim() }),
      });
      const d1 = await r1.json();
      if (!r1.ok) throw new Error(d1.error);
      const newPlace = d1.places[d1.places.length - 1];
      setPlaces(d1.places);
      setUrl("");
      setNota("");
      const r2 = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: newPlace.id }),
      });
      const d2 = await r2.json();
      if (r2.ok) setPlaces(d2.places);
      else throw new Error(d2.error);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const recCfg = {
    AGREGAR:   { color: "#4ade80", bg: "#4ade8012", border: "#4ade8035", label: "AGREGAR" },
    SKIP:      { color: "#6a6a9a", bg: "#6a6a9a12", border: "#6a6a9a35", label: "YA INCLUIDO" },
    MODIFICAR: { color: "#fb923c", bg: "#fb923c12", border: "#fb923c35", label: "MODIFICAR" },
  };

  const inp = {
    width: "100%", boxSizing: "border-box",
    background: "#0d0d18", border: "1px solid #2a2a4e",
    color: "#e0d8f0", borderRadius: "6px", padding: "10px 12px",
    fontSize: "13px", fontFamily: "inherit", outline: "none",
    marginBottom: "8px",
  };

  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <div style={{ padding: "20px 0 16px", borderBottom: "1px solid #1e1e2e", marginBottom: "20px" }}>
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: "#a78bfa", textTransform: "uppercase", marginBottom: "4px" }}>
          Agente de investigación
        </div>
        <div style={{ fontSize: "12px", color: "#4a4a6a" }}>
          Pega un link — Claude lo evalúa contra el itinerario
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
        <input
          type="url" value={url} onChange={(e) => setUrl(e.target.value)}
          placeholder="https://youtube.com/... o Google Maps, blog..."
          required style={inp}
        />
        <input
          type="text" value={nota} onChange={(e) => setNota(e.target.value)}
          placeholder="Nota opcional (ej: ryokan recomendado en Kyoto)"
          style={inp}
        />
        <button
          type="submit" disabled={loading || !url.trim()}
          style={{
            width: "100%", padding: "11px", borderRadius: "6px", border: "none",
            background: loading || !url.trim() ? "#1e1e3e" : "#7c3aed",
            color: loading || !url.trim() ? "#4a4a6a" : "#fff",
            fontSize: "13px", letterSpacing: "1px", cursor: loading || !url.trim() ? "not-allowed" : "pointer",
            fontFamily: "inherit", transition: "background 0.2s",
          }}
        >
          {loading ? "Evaluando con Claude..." : "Guardar y evaluar"}
        </button>
      </form>

      {error && (
        <div style={{ color: "#f87171", background: "#f8717112", border: "1px solid #f8717130", padding: "10px 12px", borderRadius: "6px", marginBottom: "16px", fontSize: "12px" }}>
          {error}
        </div>
      )}

      {loadingPlaces && (
        <div style={{ textAlign: "center", color: "#4a4a6a", padding: "40px 0", fontSize: "12px" }}>Cargando lugares...</div>
      )}

      {!loadingPlaces && places.length === 0 && (
        <div style={{ textAlign: "center", color: "#4a4a6a", padding: "48px 0", fontSize: "13px", lineHeight: "1.8" }}>
          Ningún lugar guardado aún.<br />Pega tu primer link arriba.
        </div>
      )}

      {[...places].reverse().map((place) => {
        const cfg = place.evaluacion ? recCfg[place.evaluacion.recomendacion] : null;
        return (
          <div key={place.id} style={{
            background: "#0f0f1a",
            border: `1px solid ${cfg ? cfg.border : "#1e1e2e"}`,
            borderRadius: "8px", marginBottom: "8px", padding: "14px 16px",
          }}>
            <a href={place.url} target="_blank" rel="noopener noreferrer"
              style={{ fontSize: "12px", color: "#7c3aed", wordBreak: "break-all", textDecoration: "none" }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              {place.url.length > 70 ? place.url.slice(0, 70) + "…" : place.url}
            </a>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginTop: "6px", gap: "8px" }}>
              {place.nota && <div style={{ fontSize: "12px", color: "#b8b0c8" }}>{place.nota}</div>}
              <div style={{ fontSize: "10px", color: "#4a4a6a", whiteSpace: "nowrap", marginLeft: "auto" }}>
                {new Date(place.fecha).toLocaleDateString("es-MX", { day: "numeric", month: "short" })}
              </div>
            </div>
            {place.evaluado && place.evaluacion ? (
              <div style={{
                marginTop: "10px", padding: "10px 12px", background: cfg.bg,
                borderRadius: "6px", borderLeft: `3px solid ${cfg.color}`,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "9px", letterSpacing: "2px", color: cfg.color, fontWeight: "600" }}>
                    {cfg.label}
                  </span>
                  {place.evaluacion.dia_relacionado && (
                    <span style={{ fontSize: "9px", color: "#4a4a6a" }}>Día {place.evaluacion.dia_relacionado}</span>
                  )}
                  {place.evaluacion.isla && (
                    <span style={{ fontSize: "9px", color: "#4a4a6a" }}>{place.evaluacion.isla}</span>
                  )}
                </div>
                <p style={{ margin: 0, fontSize: "12px", color: "#b8b0c8", lineHeight: "1.7" }}>
                  {place.evaluacion.razon}
                </p>
              </div>
            ) : (
              <div style={{ marginTop: "8px", fontSize: "10px", color: "#3a3a5a", letterSpacing: "1px" }}>
                Pendiente de evaluación
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function JapanItinerary() {
  const [selectedIsland, setSelectedIsland] = useState(0);
  const [expandedDay, setExpandedDay] = useState(null);
  const [view, setView] = useState("itinerary");

  const island = itinerary[selectedIsland];

  return (
    <div style={{
      fontFamily: "'Georgia', 'Times New Roman', serif",
      background: "#0a0a0f",
      minHeight: "100vh",
      color: "#e8e0d5",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 50%, #0a0a0f 100%)`,
        borderBottom: "1px solid #2a2a3e",
        padding: "32px 24px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(circle at 20% 50%, rgba(120,40,200,0.08) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(0,150,200,0.08) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />
        <div style={{ fontSize: "11px", letterSpacing: "6px", color: "#6b5f8a", marginBottom: "8px", textTransform: "uppercase" }}>
          Itinerario de viaje
        </div>
        <h1 style={{
          fontSize: "clamp(28px, 6vw, 48px)",
          fontWeight: "400",
          margin: "0 0 4px",
          letterSpacing: "2px",
          color: "#f0e8d8",
        }}>
          Japón 2027 / 2028
        </h1>
        <div style={{ fontSize: "13px", color: "#8a7a9a", letterSpacing: "2px" }}>
          38 días · 5 islas · 3 onsens ancla
        </div>

        {/* Stats row */}
        <div style={{
          display: "flex", justifyContent: "center", gap: "32px",
          marginTop: "20px", flexWrap: "wrap",
        }}>
          {[
            { label: "Días totales", value: "38" },
            { label: "Islas", value: "5" },
            { label: "Onsens", value: "3" },
            { label: "Bloques", value: "7" },
          ].map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "24px", fontWeight: "300", color: "#c9b8e8" }}>{s.value}</div>
              <div style={{ fontSize: "10px", letterSpacing: "2px", color: "#5a4a7a", textTransform: "uppercase" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Island selector */}
      <div style={{
        display: "flex", overflowX: "auto", gap: "0",
        borderBottom: "1px solid #1e1e2e",
        background: "#0d0d18",
        scrollbarWidth: "none",
      }}>
        {itinerary.map((isl, i) => (
          <button
            key={i}
            onClick={() => { setSelectedIsland(i); setExpandedDay(null); setView("itinerary"); }}
            style={{
              flex: "0 0 auto",
              padding: "14px 16px",
              background: view === "itinerary" && selectedIsland === i ? `${isl.color}18` : "transparent",
              border: "none",
              borderBottom: view === "itinerary" && selectedIsland === i ? `2px solid ${isl.color}` : "2px solid transparent",
              color: view === "itinerary" && selectedIsland === i ? isl.accent : "#4a4a6a",
              cursor: "pointer",
              fontSize: "10px",
              letterSpacing: "2px",
              textTransform: "uppercase",
              fontFamily: "inherit",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {isl.island}
            <span style={{ display: "block", fontSize: "9px", color: view === "itinerary" && selectedIsland === i ? isl.color : "#2a2a4a", marginTop: "2px" }}>
              {isl.days.length} días
            </span>
          </button>
        ))}
        <button
          onClick={() => setView("agente")}
          style={{
            flex: "0 0 auto",
            padding: "14px 16px",
            background: view === "agente" ? "#7c3aed18" : "transparent",
            border: "none",
            borderBottom: view === "agente" ? "2px solid #7c3aed" : "2px solid transparent",
            color: view === "agente" ? "#a78bfa" : "#4a4a6a",
            cursor: "pointer",
            fontSize: "10px",
            letterSpacing: "2px",
            textTransform: "uppercase",
            fontFamily: "inherit",
            whiteSpace: "nowrap",
            transition: "all 0.2s",
          }}
        >
          AGENTE
          <span style={{ display: "block", fontSize: "9px", color: view === "agente" ? "#7c3aed" : "#2a2a4a", marginTop: "2px" }}>
            IA
          </span>
        </button>
      </div>

      {view === "agente" ? (
        <AgentPanel />
      ) : (
        <>

      {/* Island header */}
      <div style={{
        padding: "20px 24px 12px",
        background: `linear-gradient(90deg, ${island.color}12 0%, transparent 100%)`,
        borderBottom: `1px solid ${island.color}30`,
      }}>
        <div style={{ fontSize: "10px", letterSpacing: "4px", color: island.color, textTransform: "uppercase", marginBottom: "4px" }}>
          {island.islandEn}
        </div>
        <div style={{ fontSize: "11px", color: "#4a4a6a" }}>
          Días {island.days[0].day} – {island.days[island.days.length - 1].day}
        </div>
      </div>

      {/* Days list */}
      <div style={{ padding: "12px 16px 40px" }}>
        {island.days.map((d, i) => {
          const isOnsen = d.type === "onsen";
          const isExpanded = expandedDay === `${selectedIsland}-${i}`;

          return (
            <div
              key={i}
              onClick={() => setExpandedDay(isExpanded ? null : `${selectedIsland}-${i}`)}
              style={{
                marginBottom: "8px",
                background: isOnsen
                  ? "linear-gradient(135deg, #2a0a0a, #1a0808)"
                  : "#0f0f1a",
                border: `1px solid ${isOnsen ? "#dc262640" : isExpanded ? `${island.color}40` : "#1e1e2e"}`,
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.2s",
                overflow: "hidden",
              }}
            >
              {/* Day row */}
              <div style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "14px 16px",
              }}>
                {/* Day number */}
                <div style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: isOnsen ? "#dc262620" : `${island.color}15`,
                  border: `1px solid ${isOnsen ? "#dc262650" : `${island.color}40`}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "11px", fontWeight: "600",
                  color: isOnsen ? "#ff8080" : island.accent,
                  flexShrink: 0,
                }}>
                  {d.day}
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: "14px", fontWeight: "500",
                    color: isOnsen ? "#ffaaaa" : "#e0d8f0",
                    marginBottom: "3px",
                    display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap",
                  }}>
                    {d.title}
                    {isOnsen && <span style={{ fontSize: "10px", background: "#dc262620", color: "#ff8080", padding: "2px 6px", borderRadius: "4px", letterSpacing: "1px" }}>ONSEN ANCLA</span>}
                  </div>
                  <div style={{ fontSize: "11px", color: "#4a4a6a" }}>
                    📍 {d.location}
                  </div>
                </div>

                {/* Type badge */}
                <div style={{
                  fontSize: "9px", letterSpacing: "1px",
                  color: typeColors[d.type],
                  textTransform: "uppercase",
                  flexShrink: 0,
                  textAlign: "right",
                }}>
                  {typeLabels[d.type]}
                </div>

                {/* Expand arrow */}
                <div style={{
                  color: "#3a3a5a", fontSize: "12px",
                  transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                  flexShrink: 0,
                }}>
                  ▼
                </div>
              </div>

              {/* Expanded content */}
              {isExpanded && (
                <div style={{
                  padding: "0 16px 16px",
                  borderTop: `1px solid ${isOnsen ? "#dc262630" : "#1e1e2e"}`,
                  marginTop: "0",
                }}>
                  <p style={{
                    margin: "12px 0 10px",
                    fontSize: "13px",
                    lineHeight: "1.7",
                    color: "#b8b0c8",
                  }}>
                    {d.desc}
                  </p>
                  <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {d.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: "9px", letterSpacing: "1px",
                        background: "#1a1a2e",
                        color: "#6a6a9a",
                        padding: "3px 8px", borderRadius: "4px",
                        textTransform: "uppercase",
                        border: "1px solid #2a2a4e",
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

        </>
      )}

      {/* Legend */}
      <div style={{
        position: "fixed", bottom: 0, left: 0, right: 0,
        background: "#0a0a0f",
        borderTop: "1px solid #1e1e2e",
        padding: "8px 16px",
        display: "flex", gap: "12px", overflowX: "auto",
        scrollbarWidth: "none",
      }}>
        {Object.entries(typeLabels).map(([key, label]) => (
          <span key={key} style={{
            fontSize: "9px", color: typeColors[key],
            whiteSpace: "nowrap", letterSpacing: "0.5px",
          }}>
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
