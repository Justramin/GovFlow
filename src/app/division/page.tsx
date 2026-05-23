"use client";

import { Users, FileText, Calendar, Shield, MapPin, Grid, Layers } from "lucide-react";

export default function DivisionDashboard() {
  const stats = [
    { label: "Active Units", value: "6 Units", change: "In this Division", icon: <Grid className="text-orange-600" />, color: "bg-orange-50" },
    { label: "Division Members", value: "1,200", change: "+2.1% Growth", icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
    { label: "Pending Approvals", value: "4 Requests", change: "Requires review", icon: <Shield className="text-red-600" />, color: "bg-red-50" },
    { label: "Active Circulars", value: "8 Active", change: "Released", icon: <FileText className="text-purple-600" />, color: "bg-purple-50" },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Division Committee Portal</h1>
        <p className="text-gray-500 text-sm">Managing units and coordinating operations at the division level.</p>
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
        {/* Division Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Pending Division Reviews</h3>
          <div className="space-y-4">
            {[
              { id: "AR-202", requester: "Central Unit", type: "Unit Transfer", desc: "Transfer of Vinod Kumar to North Unit", date: "6h ago" },
              { id: "AR-201", requester: "South Unit", type: "Member Promotion", desc: "Promotion of Sunitha K. to Unit Organizer", date: "2d ago" },
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

        {/* Division Committee Box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Division Details</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">Division Name:</span>
                <span className="font-bold text-gray-900">City Division</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">Division Code:</span>
                <span className="font-bold text-gray-900">CD</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Total Units:</span>
                <span className="font-bold text-gray-900">6 Active Units</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
            Issue New Circular
          </button>
        </div>
      </div>
    </div>
  );
}
