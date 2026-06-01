import Navbar from '../../components/Navbar'
import BlogList from '../../components/BlogList'
import AnimatedSection from '../../components/AnimatedSection'
import { promises as fs } from 'fs'
import path from 'path'

export default function BlogIndex({posts}){
  return (
    <div>
      <Navbar />
      <main className="pt-16">
        <AnimatedSection variant="fadeUp"><BlogList posts={posts} /></AnimatedSection>
      </main>
    </div>
  )
}

export async function getStaticProps(){
  const dataPath = path.join(process.cwd(),'data','posts.json')
  let posts = []
  try{ const raw = await fs.readFile(dataPath,'utf8'); posts = JSON.parse(raw) }catch(e){}
  return {props:{posts}}
}
