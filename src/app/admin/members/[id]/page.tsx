"use client";

import { use } from "react";
import { MOCK_MEMBERS } from "@/lib/mockData";
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Shield, 
  History, 
  FileText, 
  UserMinus,
  Edit2,
  CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const member = MOCK_MEMBERS.find(m => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex items-center gap-4">
        <Link href="/admin/members" className="p-2 hover:bg-gray-100 rounded-xl text-gray-500 transition-all">
          <ArrowLeft size={24} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Member Profile</h1>
          <p className="text-gray-500 text-sm">Managing records for {member.name}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="h-32 bg-primary relative">
              <div className="absolute -bottom-12 left-8 w-24 h-24 bg-white rounded-2xl p-1 shadow-lg">
                <div className="w-full h-full bg-primary/10 rounded-xl flex items-center justify-center text-primary text-3xl font-bold">
                  {member.name.charAt(0)}
                </div>
              </div>
            </div>
            <div className="pt-16 p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                  <p className="text-primary font-malayalam font-bold">{member.malayalamName}</p>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                  {member.status}
                </span>
              </div>
              
              <div className="space-y-4 pt-6 border-t border-gray-50">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield size={18} className="text-gray-400" />
                  <span className="font-bold text-gray-900">{member.role.replace('_', ' ')}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Phone size={18} className="text-gray-400" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <MapPin size={18} className="text-gray-400" />
                  <span>{member.unit}, {member.district}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Calendar size={18} className="text-gray-400" />
                  <span>Joined {member.joinedDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <button className="bg-gray-900 text-white py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                  <Edit2 size={16} />
                  Edit Profile
                </button>
                <button className="bg-red-50 text-red-600 py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2">
                  <UserMinus size={16} />
                  Deactivate
                </button>
              </div>
            </div>
          </div>

          <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10">
            <h4 className="font-bold text-primary mb-4 flex items-center gap-2">
              <CheckCircle2 size={18} />
              Quick Actions
            </h4>
            <div className="space-y-2">
              <button className="w-full text-left p-3 rounded-xl bg-white hover:bg-primary hover:text-white transition-all text-sm font-bold text-gray-700 shadow-sm">
                Request Transfer
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-white hover:bg-primary hover:text-white transition-all text-sm font-bold text-gray-700 shadow-sm">
                Update Committee Role
              </button>
              <button className="w-full text-left p-3 rounded-xl bg-white hover:bg-primary hover:text-white transition-all text-sm font-bold text-gray-700 shadow-sm">
                Issue ID Card
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Details & History */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm">
            <div className="p-8 border-b border-gray-50 flex gap-6">
              {["OVERVIEW", "TRANSFERS", "ATTENDANCE", "DOCUMENTS"].map(tab => (
                <button key={tab} className="text-xs font-bold text-gray-400 hover:text-primary tracking-widest transition-all">
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Employee ID</label>
                  <p className="font-bold text-gray-900">{member.employeeId}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">District</label>
                  <p className="font-bold text-gray-900">{member.district}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Division</label>
                  <p className="font-bold text-gray-900">{member.division}</p>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Unit</label>
                  <p className="font-bold text-gray-900">{member.unit}</p>
                </div>
              </div>

              <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <History size={18} className="text-primary" />
                Recent History
              </h4>
              <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
                {[
                  { title: "Member record updated", date: "May 10, 2026", desc: "Profile information updated by State Admin." },
                  { title: "Committee reassignment", date: "Apr 25, 2026", desc: "Assigned as Division Secretary for Aluva." },
                  { title: "Joined KSEBWA", date: member.joinedDate, desc: "Member registration completed." },
                ].map((item, i) => (
                  <div key={i} className="pl-8 relative">
                    <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-sm" />
                    <h5 className="text-sm font-bold text-gray-900">{item.title}</h5>
                    <p className="text-[10px] text-gray-400 mb-1">{item.date}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
            <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
              <FileText size={18} className="text-primary" />
              Uploaded Documents
            </h4>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: "Membership_Form.pdf", size: "1.2 MB" },
                { name: "Transfer_Request_2025.pdf", size: "850 KB" },
              ].map((doc, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-primary/20 transition-all cursor-pointer">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-primary shadow-sm">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-900 truncate w-32">{doc.name}</h5>
                    <p className="text-[10px] text-gray-400">{doc.size}</p>
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
