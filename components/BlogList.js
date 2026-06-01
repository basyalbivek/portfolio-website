import Link from 'next/link'
import AnimatedSection from './AnimatedSection'

export default function BlogList({posts}){
  // ensure no animation variant repeats more than twice per page
  const variants = ['fadeUp','fadeLeft','fadeRight','zoomIn','rotateIn','slideDown']
  const counts = {}
  function pickVariant(i){
    for(let offset=0; offset<variants.length; offset++){
      const v = variants[(i+offset) % variants.length]
      counts[v] = counts[v] || 0
      if(counts[v] < 2){ counts[v]++; return v }
    }
    // fallback
    return 'fadeUp'
  }

  return (
    <section id="blog" className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">Blog</h2>
        <div className="mt-6 space-y-4">
          {posts.map((p,i)=> (
            <AnimatedSection key={p.id} variant={pickVariant(i)} className="bg-white p-4 rounded shadow">
              <h3 className="text-xl font-medium"><Link href={'/blog/'+p.slug}>{p.title}</Link></h3>
              <p className="mt-2 text-sm text-gray-600">{p.excerpt || p.content.slice(0,120) + '...'}</p>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}
