import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { BarChart3, Clock, Users, ArrowRightLeft, TrendingUp } from 'lucide-react';
import { AnalyticsService } from '@/services/analyticsService';
import { getUserScopes } from '@/lib/permissions';

export default async function AnalyticsDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: { user } } = await supabase.auth.getUser();
  
  // We need to fetch the scope. For safety, if user is not authenticated, fallback to an empty scope.
  const scopes = user ? await getUserScopes(user.id) : [];
  const activeScope = scopes[0] || {}; // Take first scope or global

  // Fetch the hierarchy-aware analytics directly from the backend service
  const workflowStats = await AnalyticsService.getWorkflowAnalytics(activeScope);
  const memberDistribution = await AnalyticsService.getMemberDistribution(activeScope);

  const turnaroundDays = (workflowStats.avgTurnaroundTimeSeconds / 86400).toFixed(1);

  return (
    <div className="space-y-8 pb-16 lg:pb-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operational Analytics</h1>
        <p className="text-gray-500 text-sm">Hierarchy-scoped ERP insights and workflow performance.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-orange-600">
            <div className="p-2 bg-orange-50 rounded-lg"><Clock size={20} /></div>
            <h3 className="font-bold text-sm">Pending Approvals</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{workflowStats.pendingApprovals}</p>
          <p className="text-xs text-gray-400 mt-2">Requires immediate action</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-blue-600">
            <div className="p-2 bg-blue-50 rounded-lg"><ArrowRightLeft size={20} /></div>
            <h3 className="font-bold text-sm">Processed Transfers</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{workflowStats.totalTransfers}</p>
          <p className="text-xs text-gray-400 mt-2">Across your hierarchy scope</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-purple-600">
            <div className="p-2 bg-purple-50 rounded-lg"><TrendingUp size={20} /></div>
            <h3 className="font-bold text-sm">Recent Promotions</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{workflowStats.totalPromotions}</p>
          <p className="text-xs text-gray-400 mt-2">Historically tracked</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-3 mb-4 text-green-600">
            <div className="p-2 bg-green-50 rounded-lg"><BarChart3 size={20} /></div>
            <h3 className="font-bold text-sm">Avg Turnaround Time</h3>
          </div>
          <p className="text-3xl font-bold text-gray-900">{turnaroundDays} <span className="text-lg font-medium text-gray-400">days</span></p>
          <p className="text-xs text-gray-400 mt-2">From request to approval</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Membership Distribution */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <Users size={20} className="text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Member Status Distribution</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-bold text-gray-700">Active Members</span>
              <span className="text-sm font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">{memberDistribution.active}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-bold text-gray-700">Pending Workflow Activation</span>
              <span className="text-sm font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">{memberDistribution.pending}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
              <span className="text-sm font-bold text-gray-700">Retired / Inactive</span>
              <span className="text-sm font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{memberDistribution.retired}</span>
            </div>
          </div>
        </div>

        {/* Subscription & Program Modules */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 size={20} className="text-gray-400" />
            <h2 className="text-lg font-bold text-gray-900">Subscriptions & Programs</h2>
          </div>
          <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400">
            <p className="text-sm">Connect graphical charting libraries (e.g., Recharts) here.</p>
            <p className="text-xs mt-2 max-w-xs">Data securely passed down via Server Components scoped perfectly to your hierarchy level.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
