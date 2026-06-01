import { useState } from 'react'
import { useRouter } from 'next/router'
import { verifySessionToken } from '../../lib/auth'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    })
    if (res.ok) return router.push('/admin/cms')
    setError('Invalid password')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={submit}>
          <label className="block mb-2">Password</label>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full p-2 border rounded mb-4" />
          {error && <p className="text-red-600 mb-2">{error}</p>}
          <div className="flex gap-2">
            <button className="btn-brand bg-brand-maroon text-white px-4 py-2 rounded">Log in</button>
            <a className="ml-auto text-sm text-gray-500" href="/">Back</a>
          </div>
        </form>
      </div>
    </div>
  )
}

export async function getServerSideProps(context){
  const cookie = context.req.headers.cookie || ''
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('session='))
  if(match){
    const token = match.split('=')[1]
    const payload = verifySessionToken(token)
    if(payload) return { redirect: { destination: '/admin/cms', permanent: false } }
  }
  return { props: {} }
}
