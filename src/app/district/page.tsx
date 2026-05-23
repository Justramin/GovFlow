"use client";

import { Users, FileText, Calendar, Shield, MapPin, Layers, Award } from "lucide-react";

export default function DistrictDashboard() {
  const stats = [
    { label: "Active Divisions", value: "8 Divisions", change: "In this District", icon: <Layers className="text-blue-600" />, color: "bg-blue-50" },
    { label: "District Members", value: "6,200", change: "+4.2% Growth", icon: <Users className="text-green-600" />, color: "bg-green-50" },
    { label: "District Approvals", value: "14 Pending", change: "Requires review", icon: <Shield className="text-orange-600" />, color: "bg-orange-50" },
    { label: "Local Meetings", value: "5 Scheduled", change: "This week", icon: <Calendar className="text-purple-600" />, color: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">District Committee Portal</h1>
        <p className="text-gray-500 text-sm">Managing divisions and members under your district jurisdiction.</p>
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
        {/* District Action Center */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Pending District Approvals</h3>
          <div className="space-y-4">
            {[
              { id: "AR-302", requester: "City Division", type: "Division Transfer", desc: "Transfer of 3 members to Rural Division", date: "4h ago" },
              { id: "AR-301", requester: "West Division", type: "Member Creation", desc: "Create new member file for Hari Prasad", date: "1d ago" },
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
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* District Committee Box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-6">District Comm. Info</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">District Name:</span>
                <span className="font-bold text-gray-900">Thiruvananthapuram</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">District Code:</span>
                <span className="font-bold text-gray-900">TVM</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">Total Divisions:</span>
                <span className="font-bold text-gray-900">8 Divisions</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Units:</span>
                <span className="font-bold text-gray-900">45 Units</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
            Schedule District Meet
          </button>
        </div>
      </div>
    </div>
  );
}
