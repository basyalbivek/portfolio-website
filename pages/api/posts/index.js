import { promises as fs } from 'fs'
import path from 'path'
let sanityClient = null
if(process.env.SANITY_PROJECT_ID && process.env.SANITY_TOKEN){
  const sanity = require('@sanity/client')
  sanityClient = sanity({ projectId: process.env.SANITY_PROJECT_ID, dataset: process.env.SANITY_DATASET||'production', token: process.env.SANITY_TOKEN, useCdn: false })
}

const dataPath = path.join(process.cwd(),'data','posts.json')

export default async function handler(req,res){
  if(req.method === 'GET'){
    try{ const raw = await fs.readFile(dataPath,'utf8'); return res.json(JSON.parse(raw)) }catch(e){ return res.json([]) }
  }
  if(req.method === 'POST'){
    const { title, slug, content } = req.body
    if(!title || !slug) return res.status(400).json({message:'title and slug required'})
    const raw = await fs.readFile(dataPath,'utf8')
    const posts = JSON.parse(raw)
    const id = Date.now().toString()
    const newPost = {id, title, slug, content, date: new Date().toISOString().slice(0,10)}
    // If Sanity configured, create there as well
    if(sanityClient){
      try{
        const doc = { _type: 'post', title, slug: { current: slug }, excerpt: '', body: [{ _type:'block', style:'normal', children:[{_type:'span', text: (content||'').replace(/<[^>]+>/g,'') }]}], publishedAt: new Date().toISOString() }
        const r = await sanityClient.create(doc)
        newPost.sanityId = r._id
      }catch(e){ console.error('sanity create failed', e.message || e) }
    }
    posts.unshift(newPost)
    await fs.writeFile(dataPath, JSON.stringify(posts,null,2),'utf8')
    return res.json({message:'created', id, sanityId: newPost.sanityId})
  }
  return res.status(405).end()
}
