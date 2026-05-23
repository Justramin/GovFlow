import { Navbar } from "@/components/layout/Navbar";
import { MOCK_PROGRAMS } from "@/lib/mockData";
import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

export default function ProgramsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Organizational Programs</h1>
          <p className="text-gray-600 max-w-2xl">
            View all upcoming and past activities, conventions, and protest marches organized by the KSEB Workers Association.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {MOCK_PROGRAMS.map((program) => (
              <div key={program.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group">
                <div className="relative h-56 w-full overflow-hidden">
                  <img 
                    src={program.image} 
                    alt={program.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={16} />
                      {program.date}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={16} />
                      {program.location}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{program.title}</h3>
                  <p className="text-primary font-malayalam mb-4">{program.malayalamTitle}</p>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                    Detailed report and attendance highlights of the {program.title} conducted at {program.location}.
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        {[1,2,3].map(i => (
                          <div key={i} className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {i}
                          </div>
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-400">{program.attendanceCount}+</span>
                    </div>
                    <button className="text-primary font-bold text-sm flex items-center gap-1">
                      Read More <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
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
