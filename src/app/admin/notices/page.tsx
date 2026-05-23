"use client";

import { useState } from "react";
import { MOCK_NOTICES } from "@/lib/mockData";
import { 
  Bell, 
  Search, 
  Plus, 
  Calendar, 
  Clock, 
  Trash2, 
  Edit3, 
  Share2,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

export default function NoticesPage() {
  const [activeTab, setActiveTab] = useState("ALL");

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
          <p className="text-gray-500 text-sm">Manage official announcements and organizational notices.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} />
          Create New Notice
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
        {["ALL", "GENERAL", "URGENT", "MEETING"].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === tab ? "bg-white text-primary shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Notices List */}
        <div className="lg:col-span-2 space-y-4">
          {MOCK_NOTICES.map((notice) => (
            <div key={notice.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full ${notice.priority === 'HIGH' ? 'bg-red-500' : 'bg-blue-500'}`} />
              
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${notice.priority === 'HIGH' ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <Bell size={18} className={notice.priority === 'HIGH' ? 'text-red-500' : 'text-blue-500'} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{notice.category}</span>
                      {notice.priority === 'HIGH' && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded uppercase">
                          <AlertCircle size={10} />
                          Urgent
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-primary transition-all">
                    <Edit3 size={18} />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-1">{notice.title}</h3>
              <p className="text-primary font-malayalam font-medium mb-3">{notice.malayalamTitle}</p>
              <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                {notice.content}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Calendar size={14} />
                    {notice.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Clock size={14} />
                    Published
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-primary transition-colors">
                    <Share2 size={14} />
                    Share
                  </button>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary">
                    View Details
                    <ExternalLink size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-8">
          {/* Quick Stats */}
          <div className="bg-primary rounded-2xl p-6 text-white shadow-xl shadow-primary/20">
            <h4 className="font-bold mb-4 opacity-80 text-sm uppercase tracking-widest">Notice Stats</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Published</span>
                <span className="text-xl font-bold">142</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Drafts</span>
                <span className="text-xl font-bold">5</span>
              </div>
              <div className="flex justify-between items-center text-accent">
                <span className="text-sm font-medium">Priority Alerts</span>
                <span className="text-xl font-bold">12</span>
              </div>
            </div>
          </div>

          {/* Recently Published */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
            <h4 className="font-bold text-gray-900 mb-6 flex items-center justify-between">
              Recent Broadcasts
              <button className="text-[10px] text-primary uppercase tracking-widest">History</button>
            </h4>
            <div className="space-y-6">
              {[
                { title: "District Level Circular", date: "2 mins ago", channel: "WhatsApp" },
                { title: "Meeting Minutes - TVM", date: "1 hour ago", channel: "Push" },
                { title: "Wage Revision Update", date: "3 hours ago", channel: "Email" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-primary border border-gray-100 shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-gray-900 mb-0.5">{item.title}</h5>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400">{item.date}</span>
                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="text-[10px] font-bold text-primary uppercase">{item.channel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
