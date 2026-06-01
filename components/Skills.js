const skills = [
  {name:'Programming',level:90},
  {name:'Structural Design',level:75},
  {name:'SEO',level:70},
  {name:'IoT',level:80},
  {name:'CAD Software',level:78},
  {name:'Robotics',level:72},
  {name:'Digital Marketing',level:65}
]

export default function Skills(){
  return (
    <section id="skills" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Skills</h2>
        <div className="mt-6 space-y-4">
          {skills.map(s=> (
            <div key={s.name} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between mb-2"><div>{s.name}</div><div>{s.level}%</div></div>
              <div className="w-full bg-gray-200 h-2 rounded overflow-hidden">
                <div className="h-2 bg-brand-blue" style={{width: s.level + '%'}}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
