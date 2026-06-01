export default function Testimonials(){
  const t = [
    {name:'Client A',text:'Excellent work delivered on time.'},
    {name:'Manager B',text:'Strong technical leadership.'}
  ]
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Testimonials</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {t.map((tt,idx)=> (
            <div key={idx} className="bg-white p-4 rounded shadow">"{tt.text}" — <strong>{tt.name}</strong></div>
          ))}
        </div>
      </div>
    </section>
  )
}
