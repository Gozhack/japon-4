import Anthropic from "@anthropic-ai/sdk";
import { put, list } from "@vercel/blob";

const BLOB_KEY = "places.json";

const ITINERARY_SUMMARY = `Itinerario Japón 38 días (noviembre/invierno)
Días 1-4   | OKINAWA: Naha (Shuri Castle UNESCO), Islas Kerama (snorkel), Acuario Churaumi
Días 5-10  | KYUSHU: Fukuoka (ramen tonkotsu), Nagasaki (memorial bomba), Kumamoto (castillo), Yufuin Onsen, Beppu (Jigoku Meguri, 8 infiernos), Miyazaki (Aoshima)
Días 11-15 | SHIKOKU: Matsuyama (Dogo Onsen, castillo), Shimanami Kaido (bicicleta/islas), Naoshima (arte/Tadao Ando/Kusama), Iya Valley (puentes vid), Naruto (remolinos), Ritsurin Garden
Días 16-21 | HONSHU OESTE: Hiroshima (Peace Park/Museo), Miyajima (torii flotante), Kyoto (Fushimi Inari, Kinkakuji, Arashiyama bambú, Gion), Nara (Todai-ji, ciervos), Osaka (Dotonbori), Kobe (wagyu)
Días 22-28 | HONSHU CENTRO: Kanazawa (Kenroku-en, barrio samurais), Takayama (calles Edo), Shirakawa-go (aldeas nieve UNESCO), Hakone (Fuji, lago Ashi, onsen), Kusatsu Onsen #1 Japón (2 noches, yumomi), Nikko (Tosho-gu, cedros)
Días 29-33 | HOKKAIDO: Sapporo (ramen miso, cerveza), Noboribetsu Onsen (Jigokudani volcánico), Hakodate (puerto histórico, mercado madrugada)
Días 34-38 | TOKYO CIERRE: Shimokitazawa, Yanaka, Akihabara, Asakusa (Senso-ji), Kamakura (Gran Buda), salida Narita`;

async function readPlaces() {
  const { blobs } = await list({ prefix: BLOB_KEY });
  if (!blobs.length) return { places: [] };
  const res = await fetch(blobs[0].url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
    cache: "no-store",
  });
  return await res.json();
}

async function writePlaces(data) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}

export default async function handler(req, res) {
  if (req.headers["x-site-password"] !== process.env.SITE_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }

  // Receive url + nota directly — don't depend on Blob read to get place data
  const { id, url, nota } = req.body ?? {};
  if (!id || !url) return res.status(400).json({ error: "id y url son requeridos" });

  try {
    const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 400,
      system: `Eres un asistente de planificación de viaje a Japón. Evalúas si un link o recurso es relevante para el siguiente itinerario.

${ITINERARY_SUMMARY}

Responde ÚNICAMENTE con JSON válido, sin markdown ni texto adicional. Formato exacto:
{"recomendacion":"AGREGAR","razon":"1-2 oraciones explicando por qué","dia_relacionado":null,"isla":null}

Valores para recomendacion:
- AGREGAR: el lugar o actividad NO está en el itinerario y vale la pena considerarlo
- SKIP: ya está cubierto en el itinerario, o no es relevante para este viaje específico
- MODIFICAR: el recurso aporta info útil que mejoraría un día ya existente

Para dia_relacionado usa el número de día (1-38) si aplica, o null.
Para isla usa el nombre del bloque (OKINAWA, KYUSHU, SHIKOKU, HONSHU OESTE, HONSHU CENTRO, HOKKAIDO, TOKYO) o null.`,
      messages: [
        {
          role: "user",
          content: `URL: ${url}\nNota del usuario: ${nota || "(sin nota)"}`,
        },
      ],
    });

    let evaluacion;
    try {
      const raw = message.content[0].text.trim().replace(/^```json\s*/i, "").replace(/```\s*$/, "");
      evaluacion = JSON.parse(raw);
    } catch {
      evaluacion = {
        recomendacion: "SKIP",
        razon: "No se pudo procesar la respuesta del agente.",
        dia_relacionado: null,
        isla: null,
      };
    }

    // Update the place in Blob with the evaluation result
    const data = await readPlaces();
    const place = data.places.find((p) => p.id === id);

    if (place) {
      place.evaluado = true;
      place.evaluacion = evaluacion;
      await writePlaces(data);
      return res.status(200).json(data);
    }

    // Race condition fallback: place not yet in Blob, return evaluation alone
    return res.status(200).json({ evaluacion, id, partial: true });
  } catch (err) {
    console.error("POST /api/evaluate error:", err);
    return res.status(500).json({ error: err.message });
  }
}
