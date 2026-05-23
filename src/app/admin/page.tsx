"use client";

import { 
  Users, 
  UserCheck, 
  FileText, 
  Calendar, 
  TrendingUp,
  MapPin,
  MoreVertical
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell
} from "recharts";

const STATS = [
  { label: "Total Members", value: "48,250", change: "+2.5%", icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
  { label: "Active Today", value: "12,400", change: "+12%", icon: <UserCheck className="text-green-600" />, color: "bg-green-50" },
  { label: "Pending Circulars", value: "18", change: "4 Urgent", icon: <FileText className="text-orange-600" />, color: "bg-orange-50" },
  { label: "Scheduled Meetings", value: "24", change: "Next at 5PM", icon: <Calendar className="text-purple-600" />, color: "bg-purple-50" },
];

const DISTRICT_DATA = [
  { name: "TVM", members: 8500 },
  { name: "KLM", members: 6200 },
  { name: "PTA", members: 3400 },
  { name: "ALP", members: 4800 },
  { name: "KTM", members: 5100 },
  { name: "IDK", members: 2800 },
  { name: "EKM", members: 9200 },
];

const GROWTH_DATA = [
  { month: "Jan", count: 40000 },
  { month: "Feb", count: 42000 },
  { month: "Mar", count: 41500 },
  { month: "Apr", count: 45000 },
  { month: "May", count: 48250 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 text-sm">Welcome back, State Secretary. Here is what's happening today.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50">Generate Report</button>
          <button className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary-dark shadow-lg shadow-primary/20 transition-all">+ New Program</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATS.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl ${stat.color}`}>
                {stat.icon}
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreVertical size={18} />
              </button>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
            <div className="text-sm font-medium text-gray-500 mb-2">{stat.label}</div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
              <TrendingUp size={12} />
              {stat.change}
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* District Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <MapPin size={18} className="text-primary" />
              District-wise Membership
            </h3>
            <select className="text-xs font-bold border-none bg-gray-50 rounded-lg px-2 py-1 outline-none">
              <option>All Districts</option>
              <option>North Zone</option>
              <option>South Zone</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISTRICT_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} />
                <Tooltip 
                  cursor={{ fill: '#f8f9fa' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="members" radius={[6, 6, 0, 0]}>
                  {DISTRICT_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#8B0000' : '#E5E7EB'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Growth Chart */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-primary" />
              Membership Growth
            </h3>
            <span className="text-[10px] font-bold uppercase text-gray-400">Past 5 Months</span>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={GROWTH_DATA}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9CA3AF' }} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#8B0000" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity / Pending Tasks */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900">Recent Member Transfers</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Member</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">From / To</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {[
                  { name: "Suresh Babu", from: "TVM", to: "KLM", status: "PENDING", date: "2h ago" },
                  { name: "Meera Nair", from: "EKM", to: "THR", status: "APPROVED", date: "5h ago" },
                  { name: "Vipin Das", from: "KZD", to: "WYD", status: "PENDING", date: "1d ago" },
                ].map((item, i) => (
                  <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900 text-sm">{item.name}</div>
                      <div className="text-[10px] text-gray-400 font-medium">{item.date}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-xs font-medium">
                        <span className="text-gray-400">{item.from}</span>
                        <ArrowRight size={12} className="text-gray-300" />
                        <span className="text-gray-900">{item.to}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${item.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-orange-100 text-orange-600'}`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary text-xs font-bold hover:bg-primary/5 px-3 py-1 rounded-lg transition-all">Review</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h3 className="font-bold text-gray-900 mb-6">Upcoming Events</h3>
          <div className="space-y-6">
            {[
              { title: "District Committee Meet", time: "10:30 AM", loc: "EKM Office", color: "bg-blue-500" },
              { title: "Wage Revision Seminar", time: "02:00 PM", loc: "TVM Hall", color: "bg-primary" },
              { title: "Unit Secretary Training", time: "05:00 PM", loc: "Zoom", color: "bg-purple-500" },
            ].map((event, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${event.color}`} />
                  <div className="w-0.5 h-12 bg-gray-100 mt-2" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 mb-1">{event.time}</div>
                  <h4 className="font-bold text-gray-900 text-sm mb-1">{event.title}</h4>
                  <div className="text-[10px] text-gray-500 flex items-center gap-1">
                    <MapPin size={10} />
                    {event.loc}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm font-bold hover:border-primary/30 hover:text-primary transition-all">
            + Schedule Event
          </button>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size, className }: { size?: number, className?: string }) {
  return (
    <svg 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
    </svg>
  );
}
