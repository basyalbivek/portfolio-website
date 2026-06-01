export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  // Clear cookie
  res.setHeader('Set-Cookie', `session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax`)
  return res.json({ ok: true })
}
