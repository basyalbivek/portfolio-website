import Navbar from '../components/Navbar'
import SEO from '../components/SEO'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Education from '../components/Education'
import Testimonials from '../components/Testimonials'
import Services from '../components/Services'
import BlogList from '../components/BlogList'
import AnimatedSection from '../components/AnimatedSection'
import { promises as fs } from 'fs'
import path from 'path'

export default function Home({posts}){
  return (
    <div>
      <SEO title="Home" description="Multidisciplinary engineer & developer — portfolio." />
      <Navbar />
      <main>
        <AnimatedSection variant="slideDown"><Hero /></AnimatedSection>
        <AnimatedSection variant="fadeUp"><About /></AnimatedSection>
        <AnimatedSection variant="fadeLeft"><Skills /></AnimatedSection>
        <AnimatedSection variant="fadeRight"><Projects /></AnimatedSection>
        <AnimatedSection variant="zoomIn"><Experience /></AnimatedSection>
        <AnimatedSection variant="rotateIn"><Education /></AnimatedSection>
        <AnimatedSection variant="fadeUp"><Testimonials /></AnimatedSection>
        <AnimatedSection variant="fadeLeft"><Services /></AnimatedSection>
        <AnimatedSection variant="fadeRight"><BlogList posts={posts} /></AnimatedSection>
        <AnimatedSection variant="rotateIn">
          <section id="contact" className="py-20 bg-gray-800 text-white text-center">
            <div className="max-w-3xl mx-auto px-6">
              <h2 className="text-2xl">Contact</h2>
              <p className="mt-3">Email: you@example.com · Location: City, Country</p>
            </div>
          </section>
        </AnimatedSection>
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
