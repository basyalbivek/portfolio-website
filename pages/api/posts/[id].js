import { promises as fs } from 'fs'
import path from 'path'
let sanityClient = null
if(process.env.SANITY_PROJECT_ID && process.env.SANITY_TOKEN){
  const sanity = require('@sanity/client')
  sanityClient = sanity({ projectId: process.env.SANITY_PROJECT_ID, dataset: process.env.SANITY_DATASET||'production', token: process.env.SANITY_TOKEN, useCdn: false })
}

const dataPath = path.join(process.cwd(),'data','posts.json')

export default async function handler(req,res){
  const { id } = req.query
  const raw = await fs.readFile(dataPath,'utf8')
  const posts = JSON.parse(raw)
  const idx = posts.findIndex(p=>p.id===id)
  if(req.method==='GET'){
    if(idx===-1) return res.status(404).json({message:'not found'})
    return res.json(posts[idx])
  }
  if(req.method==='PUT'){
    if(idx===-1) return res.status(404).json({message:'not found'})
    const body = req.body
    posts[idx] = {...posts[idx], ...body}
    // patch sanity if available
    if(sanityClient && posts[idx].sanityId){
      try{
        await sanityClient.patch(posts[idx].sanityId).set({ title: posts[idx].title, excerpt: posts[idx].excerpt||'', publishedAt: posts[idx].date, body: [{ _type:'block', style:'normal', children:[{_type:'span', text: (posts[idx].content||'').replace(/<[^>]+>/g,'') }]}] }).commit()
      }catch(e){ console.error('sanity patch failed', e.message||e) }
    }
    await fs.writeFile(dataPath, JSON.stringify(posts,null,2),'utf8')
    return res.json({message:'updated'})
  }
  if(req.method==='DELETE'){
    if(idx===-1) return res.status(404).json({message:'not found'})
    const [deleted] = posts.splice(idx,1)
    if(sanityClient && deleted && deleted.sanityId){
      try{ await sanityClient.delete(deleted.sanityId) }catch(e){ console.error('sanity delete failed', e.message||e) }
    }
    await fs.writeFile(dataPath, JSON.stringify(posts,null,2),'utf8')
    return res.json({message:'deleted'})
  }
  return res.status(405).end()
}
