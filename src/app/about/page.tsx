import { Navbar } from "@/components/layout/Navbar";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Our Association</h1>
          <p className="text-xl opacity-80 max-w-2xl mx-auto">
            A legacy of struggle, unity, and progress in the power sector of Kerala.
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our History</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The KSEB Workers Association was formed with the vision of uniting all power sector employees under one banner to protect their rights and ensure a fair working environment.
                </p>
                <p>
                  Over the decades, we have stood at the forefront of numerous struggles against privatization and for the betterment of Kerala's power infrastructure. Affiliated with the CITU, we carry forward the values of social justice and worker empowerment.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-3xl h-80 flex items-center justify-center text-gray-400 italic">
              [History Image Placeholder]
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To advocate for the rights, safety, and welfare of every KSEB employee while ensuring the public receives reliable and affordable electricity as a fundamental right.
              </p>
            </div>
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-600">
                To be the most trusted and powerful voice for power sector workers in India, driving excellence through unity and democratic organizational values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">State Leadership</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Com. Rajesh Kumar", pos: "General Secretary", location: "TVM" },
              { name: "Com. Sunitha P.", pos: "President", location: "Kozhikode" },
              { name: "Com. Anil Das", pos: "Treasurer", location: "EKM" },
              { name: "Com. Venu Gopal", pos: "Vice President", location: "Thrissur" },
            ].map((leader, i) => (
              <div key={i} className="text-center group">
                <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 border-4 border-gray-50 group-hover:border-primary/20 transition-all overflow-hidden flex items-center justify-center text-primary font-bold text-2xl">
                  {leader.name.split(' ')[1][0]}
                </div>
                <h4 className="font-bold text-gray-900">{leader.name}</h4>
                <p className="text-sm text-primary font-medium">{leader.pos}</p>
                <p className="text-xs text-gray-400 mt-1">{leader.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>© 2026 KSEB Workers Association. All Rights Reserved.</p>
          <p className="text-gray-500 text-sm mt-2">Affiliated to CITU</p>
        </div>
      </footer>
    </main>
  );
}
