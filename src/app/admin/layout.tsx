"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  FileText, 
  Calendar, 
  CheckSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu,
  X,
  Search,
  UserCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NotificationBell } from "@/components/admin/NotificationBell";

const SIDEBAR_ITEMS = [
  { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/admin" },
  { name: "Members", icon: <Users size={20} />, href: "/admin/members" },
  { name: "Notices", icon: <Bell size={20} />, href: "/admin/notices" },
  { name: "Circulars", icon: <FileText size={20} />, href: "/admin/circulars" },
  { name: "Meetings", icon: <Calendar size={20} />, href: "/admin/meetings" },
  { name: "Attendance", icon: <CheckSquare size={20} />, href: "/admin/attendance" },
  { name: "Reports", icon: <BarChart3 size={20} />, href: "/admin/reports" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-72 bg-white border-r border-gray-100 z-50 transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="p-6 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">K</div>
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight">KSEBWA</span>
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Admin Portal</span>
            </div>
          </div>

          <nav className="flex-1 space-y-1">
            {SIDEBAR_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${isActive ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-gray-600 hover:bg-gray-50 hover:text-primary"}`}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-gray-100 space-y-1">
            <Link href="/admin/settings" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-gray-600 hover:bg-gray-50 transition-all font-medium">
              <Settings size={20} />
              Settings
            </Link>
            <Link href="/login" className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-500 hover:bg-red-50/50 transition-all font-medium">
              <LogOut size={20} />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-30 px-6 flex items-center justify-between">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg text-gray-600"
          >
            <Menu size={24} />
          </button>

          <div className="hidden md:flex items-center bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 w-96 group focus-within:border-primary transition-all">
            <Search size={18} className="text-gray-400 group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search members, notices, etc..." 
              className="bg-transparent border-none outline-none pl-3 text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-sm font-bold text-gray-900">Rajesh Kumar</span>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">State Admin</span>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-primary border border-gray-200 cursor-pointer hover:bg-gray-200 transition-all">
              <UserCircle size={24} />
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="p-6 md:p-8 flex-1">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (Task requirement: Mobile-first bottom nav) */}
      <nav className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 py-3 px-6 flex justify-between items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        {SIDEBAR_ITEMS.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.name} 
              href={item.href}
              className={`flex flex-col items-center gap-1 ${isActive ? "text-primary" : "text-gray-400"}`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
