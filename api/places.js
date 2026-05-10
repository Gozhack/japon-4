import { put, list } from "@vercel/blob";

const BLOB_KEY = "places.json";

async function readPlaces() {
  const { blobs } = await list({ prefix: BLOB_KEY });
  if (!blobs.length) return { places: [] };
  const res = await fetch(blobs[0].url, {
    headers: { Authorization: `Bearer ${process.env.BLOB_READ_WRITE_TOKEN}` },
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

function randomId() {
  return crypto.randomUUID();
}

export default async function handler(req, res) {
  if (req.headers["x-site-password"] !== process.env.SITE_PASSWORD) {
    return res.status(401).json({ error: "No autorizado" });
  }

  if (req.method === "GET") {
    try {
      const data = await readPlaces();
      return res.status(200).json(data);
    } catch (err) {
      console.error("GET /api/places error:", err);
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === "POST") {
    const { url, nota } = req.body ?? {};

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "url es requerido" });
    }

    try {
      const data = await readPlaces();

      data.places.push({
        id: randomId(),
        url: url.trim(),
        nota: nota?.trim() ?? "",
        fecha: new Date().toISOString(),
        evaluado: false,
      });

      await writePlaces(data);
      return res.status(201).json(data);
    } catch (err) {
      console.error("POST /api/places error:", err);
      return res.status(500).json({ error: err.message, stack: err.stack });
    }
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Método no permitido" });
}
