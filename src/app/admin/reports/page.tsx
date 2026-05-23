"use client";

import { 
  BarChart3, 
  Download, 
  FilePieChart, 
  TrendingUp, 
  Users, 
  Map, 
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function ReportsPage() {
  const REPORT_TYPES = [
    { title: "Membership Statistics", desc: "Detailed breakdown of members by district and unit.", icon: <Users className="text-blue-500" />, color: "bg-blue-50" },
    { title: "Attendance Analysis", desc: "Track participation rates in meetings and programs.", icon: <Calendar className="text-green-500" />, color: "bg-green-50" },
    { title: "Financial Contributions", desc: "Monthly collection and contribution reports.", icon: <TrendingUp className="text-primary" />, color: "bg-primary/5" },
    { title: "Geographical Distribution", desc: "Map view of union density across Kerala.", icon: <Map className="text-purple-500" />, color: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
          <p className="text-gray-500 text-sm">Generate and export detailed organizational data.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2">
            <Calendar size={18} />
            May 2026
          </button>
          <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all flex items-center gap-2">
            <Download size={18} />
            Export All
          </button>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {REPORT_TYPES.map((report, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${report.color}`}>
              {report.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{report.title}</h3>
            <p className="text-xs text-gray-500 mb-6 leading-relaxed">{report.desc}</p>
            <div className="flex items-center text-primary font-bold text-xs">
              Generate Report
              <ChevronRight size={14} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics Sections */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <BarChart3 size={20} className="text-primary" />
              Key Performance Indicators
            </h3>
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Monthly Target: 95%</span>
          </div>
          
          <div className="space-y-8">
            {[
              { label: "New Member Onboarding", value: "88%", trend: "+5.2%", status: "UP", color: "bg-green-500" },
              { label: "Meeting Attendance Rate", value: "72%", trend: "-2.4%", status: "DOWN", color: "bg-orange-500" },
              { label: "Circular Engagement", value: "94%", trend: "+12.1%", status: "UP", color: "bg-blue-500" },
              { label: "Unit Secretary Reporting", value: "65%", trend: "+1.5%", status: "UP", color: "bg-primary" },
            ].map((kpi, i) => (
              <div key={i}>
                <div className="flex justify-between items-end mb-2">
                  <div>
                    <div className="text-sm font-bold text-gray-900">{kpi.label}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {kpi.status === 'UP' ? <ArrowUpRight size={12} className="text-green-600" /> : <ArrowDownRight size={12} className="text-red-600" />}
                      <span className={`text-[10px] font-bold ${kpi.status === 'UP' ? 'text-green-600' : 'text-red-600'}`}>{kpi.trend} vs last month</span>
                    </div>
                  </div>
                  <div className="text-xl font-bold text-gray-900">{kpi.value}</div>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${kpi.color}`} style={{ width: kpi.value }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <FilePieChart size={40} className="text-accent mb-6" />
            <h3 className="text-2xl font-bold mb-4">Quarterly Executive Summary</h3>
            <p className="text-white/60 text-sm mb-8 leading-relaxed">
              Overall growth has increased by 15% this quarter. The most active district remains Ernakulam, followed by Thiruvananthapuram.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="text-sm font-medium">1,250 New members in Q1</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <span className="text-sm font-medium">85% Digital adoption rate</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span className="text-sm font-medium">24 State-level conventions</span>
              </div>
            </div>
            <button className="w-full py-4 bg-white text-gray-900 rounded-2xl font-bold hover:bg-gray-100 transition-all">
              Download Full PDF
            </button>
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
}
