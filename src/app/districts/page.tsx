import { Navbar } from "@/components/layout/Navbar";
import { DISTRICTS } from "@/lib/mockData";
import { MapPin, Users, Phone, ArrowRight } from "lucide-react";

export default function DistrictsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-primary text-white overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <h1 className="text-4xl font-bold mb-4">Our Presence Across Kerala</h1>
          <p className="text-white/80 max-w-2xl">
            The KSEB Workers Association operates through 14 district committees, managing thousands of units and members.
          </p>
        </div>
        {/* Decorative circle */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DISTRICTS.map((district) => (
              <div key={district} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900">{Math.floor(Math.random() * 5000) + 1000}</div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Members</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{district}</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Users size={16} className="text-primary/40" />
                    {Math.floor(Math.random() * 100) + 20} Active Units
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-500">
                    <Phone size={16} className="text-primary/40" />
                    Contact: +91 94470 00XXX
                  </div>
                </div>
                <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl text-sm font-bold group-hover:bg-primary group-hover:text-white transition-all flex items-center justify-center gap-2">
                  View District Committee
                  <ArrowRight size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>© 2026 KSEB Workers Association. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
