import { useEffect, useState } from 'react'
import Link from 'next/link'
import AnimatedSection from './AnimatedSection'

export default function Hero(){
  // Local hero images (saved to public/images/)
  const slides = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg'
  ]
  const [idx,setIdx] = useState(0)
  useEffect(()=>{
    const t = setInterval(()=> setIdx(i=> (i+1)%slides.length),4000)
    return ()=>clearInterval(t)
  },[])
  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden pt-16">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black/30"></div>
        <img src={slides[idx]} alt="hero" className="w-full h-full object-cover"/>
      </div>
      <div className="relative z-10 text-center text-white max-w-3xl px-6">
        <h1 className="text-4xl md:text-6xl font-bold">Hello — I'm a multidisciplinary engineer & developer</h1>
        <p className="mt-4 text-lg md:text-xl">I design solutions at the intersection of engineering, IoT and web development.</p>
        <div className="mt-6 flex gap-4 justify-center">
          <AnimatedSection variant="fadeRight" className="inline-block">
            <Link href="#about" className="btn-brand shadow bg-brand-blue text-white hover:opacity-95">About</Link>
          </AnimatedSection>
          <AnimatedSection variant="fadeLeft" className="inline-block">
            <Link href="#projects" className="btn-brand-outline border-brand-blue text-brand-blue hover:bg-brand-blue-100">Projects</Link>
          </AnimatedSection>
        </div>
        <div className="mt-8 text-sm opacity-90">
          <p>Quick links: <a href="#about" className="underline">About</a> · <a href="#skills" className="underline">Skills</a> · <a href="#blog" className="underline">Blog</a></p>
        </div>
      </div>
    </section>
  )
}
