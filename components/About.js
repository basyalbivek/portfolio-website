export default function About(){
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-semibold">About Me</h2>
        <p className="mt-4">Who I am: Multidisciplinary engineer with experience in web, IoT and structural design.</p>
        <p className="mt-2">What I do: Build full-stack apps, hardware prototypes and scalable systems.</p>
        <p className="mt-2">Goals: Deliver practical engineering solutions that create measurable impact.</p>
        <p className="mt-2">Specialties: Web development, IoT, CAD, robotics, SEO and digital marketing.</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded shadow">Timeline (optional)</div>
          <div className="p-4 bg-white rounded shadow">Personal story & fun facts</div>
          <div className="p-4 bg-white rounded shadow">Languages & location</div>
        </div>
      </div>
    </section>
  )
}
