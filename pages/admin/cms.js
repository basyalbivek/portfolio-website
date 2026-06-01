import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import path from 'path'
import { promises as fs } from 'fs'

export default function AdminCMS({ initialPosts }){
  const [posts, setPosts] = useState(initialPosts || [])
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [content, setContent] = useState('')
  const [editingId, setEditingId] = useState(null)
  const router = useRouter()

  useEffect(()=>{
    setPosts(initialPosts)
  },[initialPosts])

  // Use a simple textarea for content (no TinyMCE)
  useEffect(()=>{
    // nothing to initialize client-side for the textarea
  }, [])

  const refresh = async ()=>{
    const r = await fetch('/api/posts')
    const data = await r.json()
    setPosts(data)
  }

  const submit = async (e)=>{
    e.preventDefault()
    let contentValue = content
    const body = { title, slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g,'-'), content: contentValue }
    if(editingId){
      await fetch('/api/posts/'+editingId,{method:'PUT', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)})
    } else {
      await fetch('/api/posts',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)})
    }
    setTitle(''); setSlug(''); setContent(''); setEditingId(null)
    await refresh()
  }

  const remove = async (id)=>{
    if(!confirm('Delete this post?')) return
    await fetch('/api/posts/'+id,{method:'DELETE'})
    await refresh()
  }

  const edit = (p)=>{
    setEditingId(p.id); setTitle(p.title); setSlug(p.slug); setContent(p.content || '')
  }

  const logout = async ()=>{
    await fetch('/api/admin/logout',{method:'POST'})
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Admin CMS</h1>
          <div className="flex gap-2">
            <button onClick={refresh} className="btn-brand-outline px-3 py-1">Refresh</button>
            <button onClick={logout} className="btn-brand bg-brand-maroon text-white px-3 py-1">Logout</button>
          </div>
        </div>

        <form onSubmit={submit} className="bg-white p-4 rounded shadow mb-6">
          <h2 className="font-semibold mb-3">{editingId ? 'Edit Post' : 'Create Post'}</h2>
          <label className="block mb-2">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="w-full p-2 border rounded mb-3" />
          <label className="block mb-2">Slug (optional)</label>
          <input value={slug} onChange={e=>setSlug(e.target.value)} className="w-full p-2 border rounded mb-3" />
          <label className="block mb-2">Content (HTML or text allowed)</label>
          <textarea id="editor" value={content} onChange={e=>setContent(e.target.value)} rows={8} className="w-full p-2 border rounded mb-3" />
          <div className="flex gap-2">
            <button className="btn-brand bg-brand-blue text-white px-3 py-1 rounded">{editingId ? 'Update' : 'Create'}</button>
            {editingId && <button type="button" onClick={()=>{setEditingId(null); setTitle(''); setSlug(''); setContent('')}} className="btn-brand-outline px-3 py-1">Cancel</button>}
          </div>
        </form>

        <div className="space-y-3">
          {posts.map(p=> (
            <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between items-start">
              <div>
                <h3 className="font-medium">{p.title}</h3>
                <p className="text-sm text-gray-600">/{p.slug} · {p.date}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>edit(p)} className="btn-brand-outline px-2 py-1">Edit</button>
                <button onClick={()=>remove(p.id)} className="btn-brand bg-red-600 text-white px-2 py-1">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { verifySessionToken } from '../../lib/auth'

export async function getServerSideProps(context){
  const cookie = context.req.headers.cookie || ''
  const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('session='))
  if(!match) return { redirect: { destination: '/admin/login', permanent: false } }
  const token = match.split('=')[1]
  const payload = verifySessionToken(token)
  if(!payload) return { redirect: { destination: '/admin/login', permanent: false } }

  const dataPath = path.join(process.cwd(),'data','posts.json')
  let posts = []
  try{ const raw = await fs.readFile(dataPath,'utf8'); posts = JSON.parse(raw) }catch(e){ posts = [] }
  return { props: { initialPosts: posts } }
}
