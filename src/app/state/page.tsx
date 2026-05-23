"use client";

import { Users, FileText, Calendar, Shield, MapPin, Award, ArrowUpRight } from "lucide-react";

export default function StateDashboard() {
  const stats = [
    { label: "Active Districts", value: "14 Districts", change: "100% Coverage", icon: <MapPin className="text-red-600" />, color: "bg-red-50" },
    { label: "Total Members (State)", value: "48,250", change: "+12% this quarter", icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Pending Approvals", value: "32 Requests", change: "8 Urgent", icon: <Shield className="text-orange-600" />, color: "bg-orange-50" },
    { label: "State Campaigns", value: "6 Active", change: "Next: Wage revision", icon: <Award className="text-purple-600" />, color: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">State Committee Portal</h1>
        <p className="text-gray-500 text-sm">Overview of union organization across Kerala State.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500 mb-2">{stat.label}</div>
            <div className="text-xs font-bold text-gray-500 bg-gray-50 w-fit px-2 py-0.5 rounded-full">
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* State Action Center */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Pending State Approvals</h3>
          <div className="space-y-4">
            {[
              { id: "AR-410", requester: "TVM District", type: "District Transfer", desc: "Transfer of 12 members to EKM", date: "2h ago" },
              { id: "AR-409", requester: "KLM District", type: "Promotion Request", desc: "Promotion of S. Kumar to State Committee", date: "1d ago" },
              { id: "AR-408", requester: "EKM District", type: "Circular Release", desc: "Approve state-wide circular draft", date: "2d ago" },
            ].map((req, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:border-primary/20 transition-all">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400">{req.id}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/5 text-primary">{req.type}</span>
                  </div>
                  <div className="font-bold text-gray-800 text-sm">{req.desc}</div>
                  <div className="text-[10px] text-gray-400 mt-1">Requested by {req.requester} • {req.date}</div>
                </div>
                <button className="text-primary font-bold text-xs hover:bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/20 transition-all">
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* State Bulletins */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Active State Directives</h3>
            <div className="space-y-4">
              {[
                { title: "Wage Revision Campaign 2026", date: "May 20, 2026" },
                { title: "Membership Renewal Drive", date: "May 15, 2026" },
                { title: "Kerala Power Sector Protection Seminar", date: "May 10, 2026" },
              ].map((bulletin, i) => (
                <div key={i} className="flex justify-between items-start border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm hover:text-primary transition-colors cursor-pointer">{bulletin.title}</h4>
                    <span className="text-[10px] text-gray-400">{bulletin.date}</span>
                  </div>
                  <ArrowUpRight size={16} className="text-gray-400 hover:text-primary cursor-pointer" />
                </div>
              ))}
            </div>
          </div>
          <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
            Publish New Directive
          </button>
        </div>
      </div>
    </div>
  );
}
