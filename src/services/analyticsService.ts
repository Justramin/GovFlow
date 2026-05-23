import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { HierarchyScope } from '@/types/enterprise';

export class AnalyticsService {
  /**
   * Fetches high-level workflow analytics filtered by the user's hierarchy scope
   */
  static async getWorkflowAnalytics(scope: HierarchyScope) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // Using the secure view which handles aggregations
    let query = supabase.from('workflow_analytics').select('*');

    // Scoped filtering (If they are a division admin, they only see division stats)
    if (scope.unit_id) query = query.eq('target_unit_id', scope.unit_id);
    else if (scope.division_id) query = query.eq('target_division_id', scope.division_id);
    else if (scope.district_id) query = query.eq('target_district_id', scope.district_id);
    else if (scope.state_id) query = query.eq('target_state_id', scope.state_id);

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    const summary = {
      pendingApprovals: 0,
      totalTransfers: 0,
      totalPromotions: 0,
      avgTurnaroundTimeSeconds: 0,
      totalProcessed: 0
    };

    if (data) {
      let totalTime = 0;
      data.forEach((row: any) => {
        if (row.status === 'PENDING') summary.pendingApprovals += Number(row.total_requests);
        if (row.action_type === 'TRANSFER' && row.status === 'APPROVED') summary.totalTransfers += Number(row.total_requests);
        if (row.action_type === 'PROMOTION' && row.status === 'APPROVED') summary.totalPromotions += Number(row.total_requests);
        
        if (row.status !== 'PENDING') {
          summary.totalProcessed += Number(row.total_requests);
          totalTime += (Number(row.avg_turnaround_seconds) * Number(row.total_requests));
        }
      });
      if (summary.totalProcessed > 0) {
        summary.avgTurnaroundTimeSeconds = totalTime / summary.totalProcessed;
      }
    }

    return summary;
  }

  /**
   * Fetches real-time member distribution across the hierarchy
   */
  static async getMemberDistribution(scope: HierarchyScope) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Leverage RLS. By querying members natively, the DB enforces scope automatically.
    const { data: members, error } = await supabase
      .from('members')
      .select('member_status, membership_type');

    if (error) throw new Error(error.message);

    const distribution = {
      active: 0, pending: 0, retired: 0, suspended: 0,
      regular: 0, life: 0, honorary: 0
    };

    members.forEach((m: any) => {
      if (m.member_status === 'ACTIVE') distribution.active++;
      else if (m.member_status === 'PENDING_APPROVAL') distribution.pending++;
      else if (m.member_status === 'RETIRED') distribution.retired++;
      else if (m.member_status === 'SUSPENDED') distribution.suspended++;

      if (m.membership_type === 'REGULAR') distribution.regular++;
      else if (m.membership_type === 'LIFE') distribution.life++;
      else if (m.membership_type === 'HONORARY') distribution.honorary++;
    });

    return distribution;
  }
}
