export default function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Método no permitido" });
  }
  const { password } = req.body ?? {};
  if (password && password === process.env.SITE_PASSWORD) {
    return res.status(200).json({ ok: true });
  }
  return res.status(401).json({ error: "Frase incorrecta" });
}
