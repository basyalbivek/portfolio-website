/**
 * Migration helper: copy `data/posts.json` into a Sanity dataset.
 * Usage:
 *   npm install @sanity/client
 *   SANITY_PROJECT_ID=... SANITY_DATASET=production SANITY_TOKEN=... node scripts/migrate-to-sanity.js
 */
const fs = require('fs')
const path = require('path')

async function main(){
  const projectId = process.env.SANITY_PROJECT_ID
  const dataset = process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_TOKEN
  if(!projectId || !token){
    console.error('Please set SANITY_PROJECT_ID and SANITY_TOKEN')
    process.exit(1)
  }
  const sanity = require('@sanity/client')({ projectId, dataset, token, useCdn: false })
  const dataPath = path.join(process.cwd(),'data','posts.json')
  const raw = fs.readFileSync(dataPath,'utf8')
  const posts = JSON.parse(raw)

  // helper: simple HTML -> Portable Text converter
  const htmlToBlocks = async (html) => {
    if(!html) return []
    const blocks = []
    // split by <p> blocks and handle <img> tags
    const parts = html.split(/<\/?p[^>]*>/i).map(s=>s.trim()).filter(Boolean)
    for(const part of parts){
      // if contains img tag
      const imgMatch = part.match(/<img[^>]+src=["']([^"']+)["'][^>]*>/i)
      if(imgMatch){
        const src = imgMatch[1]
        let url = src
        // if local uploads and S3 configured, upload to S3 and set url
        if(src.startsWith('/uploads') && process.env.AWS_S3_BUCKET && process.env.AWS_REGION && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY){
          const aws = require('@aws-sdk/client-s3')
          const { S3Client, PutObjectCommand } = aws
          const s3 = new S3Client({ region: process.env.AWS_REGION, credentials: { accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY }})
          const localPath = path.join(process.cwd(),'public', src)
          const body = fs.readFileSync(localPath)
          const key = `uploads/${path.basename(localPath)}`
          const up = await s3.send(new PutObjectCommand({ Bucket: process.env.AWS_S3_BUCKET, Key: key, Body: body, ACL: 'public-read' }))
          url = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
        }
        // create customImage block
        blocks.push({ _type: 'customImage', url, alt: '' })
      } else {
        // plain text block
        const text = part.replace(/<[^>]+>/g,'').trim()
        if(text) blocks.push({ _type: 'block', style: 'normal', children: [{ _type: 'span', text, marks: [] }] })
      }
    }
    return blocks
  }

  for(const p of posts){
    try{
      const bodyBlocks = await htmlToBlocks(p.content || '')
      const doc = {
        _type: 'post',
        title: p.title || 'Untitled',
        slug: { current: p.slug || (p.title||'').toLowerCase().replace(/[^a-z0-9]+/g,'-') },
        excerpt: p.excerpt || '',
        body: bodyBlocks,
        publishedAt: p.date ? new Date(p.date).toISOString() : new Date().toISOString()
      }
      const res = await sanity.create(doc)
      console.log('created', res._id)
      // update local posts.json with sanityId
      p.sanityId = res._id
    }catch(e){ console.error('error creating', p.title, e.message || e) }
  }
  // write back posts.json with sanityId
  fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2), 'utf8')
}

main().catch(e=>{ console.error(e); process.exit(1) })
