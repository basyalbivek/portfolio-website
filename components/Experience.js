export default function Experience(){
  const items = [
    {title:'Senior Engineer',org:'Company A',date:'2022 - Present',desc:'Lead projects and teams.'},
    {title:'Research Intern',org:'University B',date:'2020 - 2021',desc:'Research on robotics.'}
  ]
  return (
    <section id="experience" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Experience</h2>
        <div className="mt-6 border-l-2 border-gray-200 pl-6 space-y-6">
          {items.map((it,idx)=>(
            <div key={idx} className="relative">
              <div className="absolute -left-3 top-1 w-6 h-6 bg-indigo-600 rounded-full"></div>
              <h3 className="font-medium">{it.title} — {it.org}</h3>
              <div className="text-sm text-gray-500">{it.date}</div>
              <p className="mt-2">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
