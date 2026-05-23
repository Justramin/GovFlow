"use client";

import { useState } from "react";
import { Settings, Shield, GitMerge, Clock, Save, ShieldCheck } from "lucide-react";

export default function ConfigPanel() {
  const [escalationDays, setEscalationDays] = useState(7);
  const [defaultApprovalLevel, setDefaultApprovalLevel] = useState("DIVISION");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    setSuccess(false);
    // Simulate updating system rules
    setTimeout(() => {
      setSaving(false);
      setSuccess(true);
    }, 1000);
  };

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Governance Settings</h1>
        <p className="text-gray-500 text-sm">Configure dynamic approval routings, escalation timers, and core RBAC scopes.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Workflow Routing Engine */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <GitMerge className="text-primary" size={20} />
              <h2 className="text-md font-bold text-gray-900">Dynamic Routing Parameters</h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Default Approval Level</label>
                <select 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer"
                  value={defaultApprovalLevel}
                  onChange={(e) => setDefaultApprovalLevel(e.target.value)}
                >
                  <option value="UNIT">Unit Level (On-ground validation)</option>
                  <option value="DIVISION">Division Level (Standard governance)</option>
                  <option value="DISTRICT">District Level (Complex structural checks)</option>
                  <option value="STATE">State Level (Global oversight)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Escalation Timer (Days)</label>
                <input 
                  type="number" 
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                  value={escalationDays}
                  onChange={(e) => setEscalationDays(Number(e.target.value))}
                />
                <span className="text-[10px] text-gray-400 mt-1 block">Requests pending longer than this threshold trigger auto-escalation alerts to State Admins.</span>
              </div>
            </div>
          </div>

          {/* Role Governance & Policies */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
              <Shield className="text-primary" size={20} />
              <h2 className="text-md font-bold text-gray-900">Active Governance Rules</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-gray-900">Enforce Signed Upload Verification</div>
                  <div className="text-[10px] text-gray-400">All supporting workflow documents must be verified prior to approval.</div>
                </div>
                <input type="checkbox" defaultChecked className="w-4 h-4 accent-primary" />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="text-xs font-bold text-gray-900">Intra-Division Auto-Approval</div>
                  <div className="text-[10px] text-gray-400">Bypass state routing if the transfer scope remains local to the division.</div>
                </div>
                <input type="checkbox" className="w-4 h-4 accent-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Status Control */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-gray-900">Control Actions</h3>
            
            <button 
              onClick={handleSave}
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-primary text-white py-3 rounded-xl font-bold hover:bg-primary-dark disabled:opacity-50 transition-all shadow-md shadow-primary/20 cursor-pointer"
            >
              <Save size={18} />
              {saving ? "Saving configurations..." : "Save Policy Rules"}
            </button>

            {success && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-xs font-bold flex items-center gap-2">
                <ShieldCheck size={16} />
                Governance policies updated successfully!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
