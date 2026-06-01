import formidable from 'formidable'
import fs from 'fs'
import path from 'path'

export const config = {
  api: { bodyParser: false }
}

export default async function handler(req,res){
  if(req.method !== 'POST') return res.status(405).end()
  const form = new formidable.IncomingForm()
  const uploadDir = path.join(process.cwd(),'public','uploads')
  try{ fs.mkdirSync(uploadDir,{recursive:true}) }catch(e){}

  form.uploadDir = uploadDir
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    if(err) return res.status(500).json({message: String(err)})
    const file = files.file
    if(!file) return res.status(400).json({message:'no file'})
    const filename = path.basename(file.filepath || file.path || file.newFilename)
    const url = `/uploads/${filename}`
    return res.json({url})
  })
}
