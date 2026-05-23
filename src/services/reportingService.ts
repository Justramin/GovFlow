import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { HierarchyScope } from "@/types/enterprise";

export class ReportingService {
  /**
   * Generates a CSV export of members matched to a hierarchy scope
   */
  static async generateHierarchyWiseMemberCSV(scope: HierarchyScope): Promise<string> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    let query = supabase
      .from("members")
      .select("id, name, member_status, organizational_position, membership_type, created_at");

    if (scope.unit_id) query = query.eq("unit_id", scope.unit_id);
    else if (scope.division_id) query = query.eq("division_id", scope.division_id);
    else if (scope.district_id) query = query.eq("district_id", scope.district_id);
    else if (scope.state_id) query = query.eq("state_id", scope.state_id);

    const { data: members, error } = await query;
    if (error || !members) throw new Error("Failed to fetch report data");

    const csvRows = [
      ["ID", "Name", "Status", "Position", "Type", "Joined Date"].join(",")
    ];

    members.forEach((m) => {
      csvRows.push(
        [
          m.id,
          `"${m.name || ""}"`,
          m.member_status,
          `"${m.organizational_position || ""}"`,
          m.membership_type,
          new Date(m.created_at).toLocaleDateString()
        ].join(",")
      );
    });

    return csvRows.join("\n");
  }

  /**
   * Generates an operational summary report for dashboard export
   */
  static async generateOperationalReport(scope: HierarchyScope) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: approvals } = await supabase.from("approval_requests").select("*");
    const { data: subscriptions } = await supabase.from("subscriptions").select("*");

    return {
      reportDate: new Date().toISOString(),
      scope,
      totalApprovals: approvals?.length || 0,
      totalSubscriptions: subscriptions?.length || 0,
      turnaroundDetails: approvals?.map((a) => ({
        id: a.id,
        action: a.action_type,
        status: a.status,
        durationSeconds: a.status !== "PENDING" 
          ? (new Date(a.updated_at).getTime() - new Date(a.created_at).getTime()) / 1000 
          : null
      }))
    };
  }
}
