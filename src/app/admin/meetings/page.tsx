"use client";

import { useState } from "react";
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  MoreVertical,
  Clock,
  Video,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";

export default function MeetingsPage() {
  const [view, setView] = useState("UPCOMING");

  const MEETINGS = [
    {
      id: "m1",
      title: "State Committee Monthly Review",
      malayalamTitle: "സംസ്ഥാന കമ്മിറ്റി മാസിക അവലോകനം",
      date: "2026-05-20",
      time: "10:30 AM",
      location: "Association HQ, Thiruvananthapuram",
      attendees: 45,
      status: "SCHEDULED",
      type: "OFFLINE"
    },
    {
      id: "m2",
      title: "Digital Portal Training for Unit Secretaries",
      malayalamTitle: "യൂണിറ്റ് സെക്രട്ടറിമാർക്കുള്ള ഡിജിറ്റൽ പരിശീലനം",
      date: "2026-05-22",
      time: "03:00 PM",
      location: "Zoom Video Conference",
      attendees: 120,
      status: "SCHEDULED",
      type: "ONLINE"
    },
    {
      id: "m3",
      title: "Urgent Meeting on Wage Revision",
      malayalamTitle: "ശമ്പള പരിഷ്കരണം - അടിയന്തര യോഗം",
      date: "2026-05-18",
      time: "05:30 PM",
      location: "Ernakulam District Office",
      attendees: 30,
      status: "COMPLETED",
      type: "OFFLINE"
    }
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Meetings & Attendance</h1>
          <p className="text-gray-500 text-sm">Schedule meetings, track attendance and manage minutes.</p>
        </div>
        <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} />
          Schedule Meeting
        </button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Calendar Sidebar (Simplified for UI) */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-gray-900">May 2026</h4>
              <div className="flex gap-1">
                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronLeft size={16} /></button>
                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400"><ChevronRight size={16} /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(d => (
                <span key={d} className="text-[10px] font-bold text-gray-400 uppercase">{d}</span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {Array.from({ length: 31 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 20;
                const hasEvent = [15, 18, 20, 22, 25].includes(day);
                return (
                  <button 
                    key={i}
                    className={`h-8 w-8 flex items-center justify-center text-xs rounded-lg relative transition-all ${
                      isSelected ? "bg-primary text-white font-bold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {day}
                    {hasEvent && !isSelected && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary/40 rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl p-6 text-white shadow-xl shadow-gray-200/50">
            <h4 className="font-bold mb-4 text-sm flex items-center gap-2">
              <Clock size={16} className="text-accent" />
              Next Up
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-xl border border-white/10">
                <div className="text-[10px] font-bold text-accent uppercase mb-1">In 2 Hours</div>
                <div className="font-bold text-sm">TVM Unit Committee</div>
                <div className="text-[10px] text-white/60 mt-1">Pattom Office • 05:00 PM</div>
              </div>
            </div>
          </div>
        </div>

        {/* Meetings List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex gap-4 border-b border-gray-100 pb-2">
            {["UPCOMING", "PAST", "DRAFTS"].map((t) => (
              <button 
                key={t}
                onClick={() => setView(t)}
                className={`pb-3 px-2 text-sm font-bold transition-all border-b-2 ${view === t ? "border-primary text-primary" : "border-transparent text-gray-400 hover:text-gray-600"}`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {MEETINGS.map((meeting) => (
              <div key={meeting.id} className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-6 group">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl px-4 py-3 border border-gray-100 shrink-0 w-20">
                  <span className="text-[10px] font-bold text-gray-400 uppercase">{meeting.date.split('-')[1]}</span>
                  <span className="text-2xl font-bold text-gray-900">{meeting.date.split('-')[2]}</span>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meeting.type === 'ONLINE' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                      {meeting.type}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meeting.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-primary/5 text-primary'}`}>
                      {meeting.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-0.5">{meeting.title}</h3>
                  <p className="text-primary font-malayalam text-sm font-medium mb-3">{meeting.malayalamTitle}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {meeting.time}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin size={14} />
                      {meeting.location}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users size={14} />
                      {meeting.attendees} Members
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-50">
                  {meeting.status === 'COMPLETED' ? (
                    <button className="flex-1 md:flex-none px-4 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-black transition-all">
                      View Minutes
                    </button>
                  ) : (
                    <button className="flex-1 md:flex-none px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:bg-primary-dark transition-all">
                      Mark Attendance
                    </button>
                  )}
                  <button className="p-2 hover:bg-gray-100 rounded-xl text-gray-400">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
