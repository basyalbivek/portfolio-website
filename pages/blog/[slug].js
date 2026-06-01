import Navbar from '../../components/Navbar'
import SEO from '../../components/SEO'
import AnimatedSection from '../../components/AnimatedSection'
import { promises as fs } from 'fs'
import path from 'path'

export default function Post({post}){
  if(!post) return <div>Not found</div>
  return (
    <div>
      <SEO title={post.title} description={post.excerpt || post.title} />
      <Navbar />
      <main className="pt-16 max-w-3xl mx-auto px-6 py-12">
        <AnimatedSection variant="fadeUp"><h1 className="text-3xl font-semibold">{post.title}</h1></AnimatedSection>
        <AnimatedSection variant="fadeLeft"><div className="text-sm text-gray-500 mt-2">{post.date}</div></AnimatedSection>
        <AnimatedSection variant="fadeRight"><article className="mt-6 bg-white p-6 rounded shadow"><div dangerouslySetInnerHTML={{__html: post.content}} /></article></AnimatedSection>
      </main>
    </div>
  )
}

export async function getStaticPaths(){
  const dataPath = path.join(process.cwd(),'data','posts.json')
  const raw = await fs.readFile(dataPath,'utf8')
  const posts = JSON.parse(raw)
  return {paths: posts.map(p=>({params:{slug:p.slug}})), fallback:false}
}

export async function getStaticProps({params}){
  const dataPath = path.join(process.cwd(),'data','posts.json')
  const raw = await fs.readFile(dataPath,'utf8')
  const posts = JSON.parse(raw)
  const post = posts.find(p=>p.slug===params.slug) || null
  return {props:{post}}
}
