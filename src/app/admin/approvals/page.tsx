"use client";

import { useState, useEffect } from "react";
import { Check, X, Clock, ArrowRight, RefreshCw } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { approveWorkflowRequest, rejectWorkflowRequest } from "@/actions/memberActions";

interface RequestItem {
  id: string;
  action_type: string;
  entity_type: string;
  entity_id: string;
  target_hierarchy_level: string;
  status: string;
  created_at: string;
}

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  const fetchRequests = async () => {
    setLoading(true);
    // Secure query, filtered automatically by Supabase RLS based on the user's hierarchy scope
    const { data, error } = await supabase
      .from("approval_requests")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (data) setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();

    // Subscribe to realtime database changes for workflow approvals
    const channel = supabase
      .channel("realtime_approvals")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "approval_requests" },
        (payload) => {
          // If a new request is inserted or updated, re-fetch or merge
          fetchRequests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-500 text-sm">Review and manage workflow requests across your specific hierarchy scope.</p>
        </div>
        <button 
          onClick={fetchRequests} 
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-all flex items-center gap-2 border border-gray-200 bg-white"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span className="text-xs font-semibold">Sync</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th className="px-6 py-4">Request Type</th>
                <th className="px-6 py-4">Target Level</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Submitted</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-sm text-gray-400">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-primary" />
                    <span>Syncing with operational layer...</span>
                  </td>
                </tr>
              ) : requests?.map((req) => (
                <tr key={req.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-5">
                    <div className="font-bold text-gray-900">{req.action_type} - {req.entity_type}</div>
                    <div className="text-xs text-gray-500 mt-1">ID: {req.entity_id}</div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-full border border-gray-200">
                      {req.target_hierarchy_level}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1.5">
                      {req.status === 'PENDING' && <Clock size={14} className="text-orange-500" />}
                      {req.status === 'APPROVED' && <Check size={14} className="text-green-500" />}
                      {req.status === 'REJECTED' && <X size={14} className="text-red-500" />}
                      <span className={`text-xs font-bold ${
                        req.status === 'PENDING' ? 'text-orange-600' :
                        req.status === 'APPROVED' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 font-medium">
                    {new Date(req.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-5 text-right">
                    {req.status === 'PENDING' ? (
                      <div className="flex justify-end gap-2">
                        <form action={approveWorkflowRequest}>
                          <input type="hidden" name="requestId" value={req.id} />
                          <button className="p-2 bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 rounded-lg transition-colors shadow-sm">
                            <Check size={18} />
                          </button>
                        </form>
                        <form action={rejectWorkflowRequest}>
                          <input type="hidden" name="requestId" value={req.id} />
                          <button className="p-2 bg-red-50 text-red-600 hover:bg-red-100 border border-red-200 rounded-lg transition-colors shadow-sm">
                            <X size={18} />
                          </button>
                        </form>
                      </div>
                    ) : (
                      <button className="text-sm font-bold text-primary hover:text-primary-dark transition-colors flex items-center gap-1 justify-end w-full">
                        View Details <ArrowRight size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {(!loading && (!requests || requests.length === 0)) && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 mb-3">
                      <Check size={20} className="text-gray-400" />
                    </div>
                    <p className="text-gray-500 text-sm font-medium">No pending approvals in your scope.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
