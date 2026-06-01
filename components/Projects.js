const sample = [
  {id:1,title:'Project One',desc:'A web + IoT integration',tech:['Next.js','React','Node'],live:'#',github:'#'},
  {id:2,title:'Project Two',desc:'Structural design case study',tech:['CAD','FEM'],live:'#',github:'#'}
]

export default function Projects(){
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Projects</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {sample.map((p, i)=> (
            <div key={p.id} className="bg-white rounded shadow p-4 hover:shadow-lg transition">
              <div className="h-40 bg-gray-200 rounded mb-3">Thumbnail</div>
              <h3 className="text-xl font-medium">{p.title}</h3>
              <p className="mt-2 text-sm">{p.desc}</p>
              <div className="mt-3 flex gap-2 flex-wrap">
                {p.tech.map(t=><span key={t} className="text-xs bg-brand-blue-100 px-2 py-1 rounded text-brand-blue">{t}</span>)}
              </div>
              <div className="mt-3 flex gap-3">
                <a href={p.live} className="text-brand-blue">Live</a>
                <a href={p.github} className="text-gray-600">GitHub</a>
                <button className="ml-auto text-sm btn-brand bg-brand-blue text-white">Case study</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
