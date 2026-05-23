import { Navbar } from "@/components/layout/Navbar";
import { FileText, Download, Search, Filter } from "lucide-react";

export default function CircularsPage() {
  const CIRCULARS = [
    { id: "c1", title: "State Committee Circular No. 05/2026", date: "2026-05-10", category: "STATE" },
    { id: "c2", title: "Wage Revision Guidelines - May 2026", date: "2026-05-05", category: "WAGE" },
    { id: "c3", title: "District Convention Schedule - Kollam", date: "2026-05-02", category: "DISTRICT" },
    { id: "c4", title: "Membership Renewal Policy 2026", date: "2026-04-28", category: "POLICY" },
    { id: "c5", title: "Anti-Privatization Protest Guide", date: "2026-04-15", category: "ACTION" },
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Official Circulars</h1>
              <p className="text-gray-600 max-w-2xl">
                Access official documents, policy guidelines, and state-level circulars of the association.
              </p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Search circulars..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <button className="p-2.5 bg-white border border-gray-200 rounded-xl text-gray-400">
                <Filter size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-4">
            {CIRCULARS.map((c) => (
              <div key={c.id} className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all flex items-center gap-6 group">
                <div className="w-12 h-12 bg-primary/5 rounded-xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                  <FileText size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-1">{c.title}</h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>{c.date}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="font-bold text-primary/60 uppercase">{c.category}</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 bg-gray-50 text-gray-700 px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary hover:text-white transition-all">
                  <Download size={16} />
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p>© 2026 KSEB Workers Association. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
