const crypto = require('crypto')

function hashPassword(password){
  const salt = crypto.randomBytes(16).toString('hex')
  const derived = crypto.scryptSync(password, salt, 64).toString('hex')
  return `${salt}:${derived}`
}

function verifyPassword(password, stored){
  if(!stored) return false
  const parts = stored.split(':')
  if(parts.length !== 2) return false
  const [salt, derived] = parts
  const check = crypto.scryptSync(password, salt, 64).toString('hex')
  try{
    return crypto.timingSafeEqual(Buffer.from(check,'hex'), Buffer.from(derived,'hex'))
  }catch(e){
    return false
  }
}

function base64urlEncode(buf){
  return Buffer.from(buf).toString('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
}
function base64urlDecode(str){
  str = str.replace(/-/g,'+').replace(/_/g,'/')
  while(str.length %4) str += '='
  return Buffer.from(str,'base64')
}

function createSessionToken(data={}, expiresIn=3600){
  const secret = process.env.ADMIN_SECRET || 'dev_change_secret'
  const payload = { ...data, exp: Math.floor(Date.now()/1000) + expiresIn, n: crypto.randomBytes(8).toString('hex') }
  const payloadStr = JSON.stringify(payload)
  const payload64 = base64urlEncode(payloadStr)
  const hmac = crypto.createHmac('sha256', secret).update(payload64).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
  return `${payload64}.${hmac}`
}

function verifySessionToken(token){
  if(!token) return null
  const secret = process.env.ADMIN_SECRET || 'dev_change_secret'
  const parts = token.split('.')
  if(parts.length !== 2) return null
  const [payload64, sig] = parts
  const expected = crypto.createHmac('sha256', secret).update(payload64).digest('base64').replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')
  try{
    if(!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))) return null
  }catch(e){ return null }
  const payloadStr = base64urlDecode(payload64).toString('utf8')
  let payload
  try{ payload = JSON.parse(payloadStr) }catch(e){ return null }
  if(!payload.exp || payload.exp < Math.floor(Date.now()/1000)) return null
  return payload
}

module.exports = { hashPassword, verifyPassword, createSessionToken, verifySessionToken }
