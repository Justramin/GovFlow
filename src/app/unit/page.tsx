"use client";

import { Users, FileText, Calendar, Shield, MapPin, Award, CheckSquare } from "lucide-react";

export default function UnitDashboard() {
  const stats = [
    { label: "Unit Members", value: "185 Members", change: "In this Unit", icon: <Users className="text-purple-600" />, color: "bg-purple-50" },
    { label: "Active Subscriptions", value: "92% Paid", change: "Renewal due", icon: <Award className="text-green-600" />, color: "bg-green-50" },
    { label: "Unit Approvals", value: "2 Pending", change: "Member creations", icon: <Shield className="text-orange-600" />, color: "bg-orange-50" },
    { label: "Next Meeting", value: "May 25", change: "5:00 PM (Zoom)", icon: <Calendar className="text-blue-600" />, color: "bg-blue-50" },
  ];

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Unit Committee Portal</h1>
        <p className="text-gray-500 text-sm">On-ground operations, member directory management, and fee collection for your unit.</p>
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
        {/* Unit Actions */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Unit Tasks & Actions</h3>
          <div className="space-y-4">
            {[
              { task: "Collect subscriptions for May", status: "In Progress", type: "Finances", icon: <Award size={18} /> },
              { task: "Initiate creation request for 2 new members", status: "Pending", type: "Approvals", icon: <Shield size={18} /> },
              { task: "Prepare attendance sheet for next committee meet", status: "Not Started", type: "Meetings", icon: <Calendar size={18} /> },
            ].map((task, i) => (
              <div key={i} className="p-4 rounded-xl border border-gray-100 flex justify-between items-center hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-400">
                    {task.icon}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800 text-sm">{task.task}</div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{task.type}</span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-gray-500">{task.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Unit Committee Box */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 mb-6">Unit Details</h3>
            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">Unit Name:</span>
                <span className="font-bold text-gray-900">Central Unit</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span className="font-medium">Unit Code:</span>
                <span className="font-bold text-gray-900">CU</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Parent Division:</span>
                <span className="font-bold text-gray-900">City Division (CD)</span>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">
            Add New Member Request
          </button>
        </div>
      </div>
    </div>
  );
}
