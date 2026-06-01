import Link from 'next/link'
import { useState } from 'react'

export default function Navbar(){
  const [open, setOpen] = useState(false)
  const items = ['home','about','projects','skills','experience','blog','contact']
  return (
    <nav className="bg-brand-blue text-white fixed w-full z-40 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl font-semibold">
          <span className="text-white">My </span><span className="text-brand-maroon">Portfolio</span>
        </div>
        <div className="hidden md:flex gap-6">
          {items.map(i=>(
            <Link key={i} href={i==='home'?'/':'#'+i} className="capitalize text-white hover:text-brand-maroon">{i}</Link>
          ))}
        </div>
        <button className="md:hidden p-2" onClick={()=>setOpen(!open)} aria-label="toggle menu">
          <div className={`w-6 h-0.5 bg-white my-1 transition-transform ${open? 'rotate-45 translate-y-2':''}`}></div>
          <div className={`w-6 h-0.5 bg-white my-1 transition-opacity ${open? 'opacity-0':''}`}></div>
          <div className={`w-6 h-0.5 bg-white my-1 transition-transform ${open? '-rotate-45 -translate-y-2':''}`}></div>
        </button>
      </div>
      <div className={`md:hidden bg-brand-blue ${open? 'block':'hidden'}`}>
        <div className="flex flex-col p-4 gap-3">
          {items.map(i=>(
            <Link key={i} href={i==='home'?'/':'#'+i} className="capitalize py-2 border-b border-white/20 text-white" onClick={()=>setOpen(false)}>{i}</Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
