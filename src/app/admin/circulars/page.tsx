"use client";

import { useState } from "react";
import { 
  FileText, 
  Search, 
  Plus, 
  Download, 
  Trash2, 
  Eye, 
  Filter, 
  Archive,
  ArrowUpRight
} from "lucide-react";

export default function CircularsAdminPage() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const CIRCULARS = [
    { id: "c1", title: "Wage Revision Guidelines - Phase 2", category: "STATE", date: "May 12, 2026", size: "2.4 MB", downloads: 1250 },
    { id: "c2", title: "Unit Secretary Election Procedure", category: "POLICY", date: "May 08, 2026", size: "1.1 MB", downloads: 450 },
    { id: "c3", title: "Thiruvananthapuram District Convention", category: "DISTRICT", date: "May 05, 2026", size: "850 KB", downloads: 320 },
    { id: "c4", title: "Protest March Logistics", category: "ACTION", date: "May 02, 2026", size: "1.5 MB", downloads: 2100 },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Circular Archive</h1>
          <p className="text-gray-500 text-sm">Manage official documents and state-level circulars.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} />
          Upload Document
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Categories Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-widest">Categories</h4>
            <div className="space-y-1">
              {["ALL", "STATE", "DISTRICT", "POLICY", "ACTION", "ARCHIVE"].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                    activeCategory === cat ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-3xl text-white">
            <Archive size={32} className="text-accent mb-4" />
            <h4 className="font-bold text-lg mb-2">Bulk Actions</h4>
            <p className="text-xs text-white/60 mb-6 leading-relaxed">Archive old circulars to maintain a clean dashboard for units.</p>
            <button className="w-full py-3 border border-white/20 rounded-xl text-sm font-bold hover:bg-white/10 transition-all">
              Manage Archive
            </button>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full md:w-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search documents by title or keyword..." 
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
              />
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button className="flex-1 md:flex-none p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500"><Filter size={20} /></button>
              <button className="flex-1 md:flex-none p-3 bg-gray-50 border border-gray-100 rounded-xl text-gray-500"><Download size={20} /></button>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {CIRCULARS.map((doc) => (
              <div key={doc.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all group">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-primary/5 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                    <FileText size={24} />
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400"><Eye size={18} /></button>
                    <button className="p-2 hover:bg-red-50 rounded-lg text-red-400"><Trash2 size={18} /></button>
                  </div>
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2 truncate" title={doc.title}>{doc.title}</h3>
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[10px] font-bold text-primary/60 uppercase tracking-widest">{doc.category}</span>
                  <span className="w-1 h-1 bg-gray-200 rounded-full" />
                  <span className="text-[10px] text-gray-400 font-medium">{doc.date}</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Size</span>
                    <span className="text-xs font-bold text-gray-900">{doc.size}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase">Downloads</span>
                    <div className="flex items-center gap-1 text-xs font-bold text-primary">
                      {doc.downloads}
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-4 bg-white border-2 border-dashed border-gray-100 rounded-3xl text-gray-400 text-sm font-bold hover:border-primary/20 hover:text-primary transition-all">
            Show More Documents
          </button>
        </div>
      </div>
    </div>
  );
}
