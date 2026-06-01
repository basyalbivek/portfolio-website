export default function Education(){
  const items = [
    {title:'M.Sc. Engineering',org:'University X',date:'2018 - 2020'},
    {title:'B.Sc. Engineering',org:'University Y',date:'2014 - 2018'}
  ]
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Education & Certifications</h2>
        <div className="mt-6 space-y-4">
          {items.map((it,idx)=> (
            <div key={idx} className="bg-white rounded shadow p-4">
              <div className="flex justify-between"><div>{it.title} — {it.org}</div><div className="text-sm text-gray-500">{it.date}</div></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
