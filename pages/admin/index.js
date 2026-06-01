import { useState } from 'react'
import Navbar from '../../components/Navbar'
import AnimatedSection from '../../components/AnimatedSection'

export default function Admin(){
  const [title,setTitle] = useState('')
  const [slug,setSlug] = useState('')
  const [content,setContent] = useState('')
  const [msg,setMsg] = useState('')
  const [imageUrl,setImageUrl] = useState('')

  const variants = ['slideDown','fadeUp','fadeLeft']

  async function submit(e){
    e.preventDefault()
    const res = await fetch('/api/posts', {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({title,slug,content, image: imageUrl})})
    const j = await res.json()
    setMsg(j.message || 'Saved')
  }

  async function uploadFile(e){
    const f = e.target.files[0]
    if(!f) return
    const form = new FormData()
    form.append('file', f)
    const res = await fetch('/api/upload', {method:'POST', body: form})
    const j = await res.json()
    if(j.url) setImageUrl(j.url)
  }

  return (
    <div>
      <Navbar />
      <main className="pt-16 max-w-3xl mx-auto px-6 py-12">
        <AnimatedSection variant="slideDown"><h1 className="text-2xl font-semibold">Admin - Blog CMS</h1></AnimatedSection>
        <AnimatedSection variant="fadeUp">
          <form onSubmit={submit} className="mt-6 space-y-4">
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="w-full p-2 border rounded" />
            <input value={slug} onChange={e=>setSlug(e.target.value)} placeholder="slug (no spaces)" className="w-full p-2 border rounded" />
            <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="HTML content" rows={8} className="w-full p-2 border rounded" />
            <div>
              <label className="block text-sm">Upload image</label>
              <input type="file" onChange={uploadFile} />
              {imageUrl && <div className="mt-2 text-sm">Uploaded: <a href={imageUrl} target="_blank" rel="noreferrer" className="underline">{imageUrl}</a></div>}
            </div>
            <div>
              <button className="bg-brand-blue text-white px-4 py-2 rounded">Create Post</button>
            </div>
            {msg && <div className="text-sm text-green-600">{msg}</div>}
          </form>
        </AnimatedSection>
      </main>
    </div>
  )
}
