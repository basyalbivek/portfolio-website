const { verifyPassword, createSessionToken } = require('../../../lib/auth')

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { password } = req.body || {}
  const ADMIN_PASS = process.env.ADMIN_PASS || 'password123'
  const ADMIN_PASS_HASH = process.env.ADMIN_PASS_HASH || null

  let ok = false
  if (ADMIN_PASS_HASH) {
    ok = verifyPassword(password, ADMIN_PASS_HASH)
  } else {
    ok = password === ADMIN_PASS
  }

  if (ok) {
    const token = createSessionToken({ role: 'admin' }, 60 * 60)
    const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
    res.setHeader('Set-Cookie', `session=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Lax${secure}`)
    return res.json({ ok: true })
  }
  return res.status(401).json({ message: 'invalid' })
}
