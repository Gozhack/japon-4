import { put, head, getDownloadUrl } from "@vercel/blob";

const BLOB_KEY = "places.json";

async function readPlaces() {
  try {
    const info = await head(BLOB_KEY);
    const res = await fetch(info.url);
    return await res.json();
  } catch {
    return { places: [] };
  }
}

async function writePlaces(data) {
  await put(BLOB_KEY, JSON.stringify(data), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
  });
}

function randomId() {
  return crypto.randomUUID();
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const data = await readPlaces();
    return res.status(200).json(data);
  }

  if (req.method === "POST") {
    const { url, nota } = req.body ?? {};

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "url es requerido" });
    }

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
  }

  res.setHeader("Allow", "GET, POST");
  return res.status(405).json({ error: "Método no permitido" });
}
