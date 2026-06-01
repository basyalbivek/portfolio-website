export default function Services(){
  const s = [
    {title:'Website Development',price:'$1k - $5k',time:'2-6 weeks'},
    {title:'IoT Solutions',price:'$2k - $10k',time:'4-12 weeks'}
  ]
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Services</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {s.map((it,idx)=> (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <h3 className="font-medium">{it.title}</h3>
              <div className="text-sm text-gray-500">{it.price} · {it.time}</div>
              <button className="mt-3 btn-maroon bg-brand-maroon text-white">Contact</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
