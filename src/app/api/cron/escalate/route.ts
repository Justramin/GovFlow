import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { ERPService } from "@/services/erpService";

export async function GET(req: NextRequest) {
  try {
    // Basic API Key validation for security (CRON_SECRET)
    const authHeader = req.headers.get("authorization");
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Overdue Workflow Escalation: Escalate approval requests pending > 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const { data: pendingRequests } = await supabase
      .from("approval_requests")
      .select("*")
      .eq("status", "PENDING")
      .lt("created_at", sevenDaysAgo.toISOString());

    if (pendingRequests) {
      for (const request of pendingRequests) {
        // Escalate level or trigger notification to State Admins
        const { data: stateAdmins } = await supabase
          .from("user_access_scope")
          .select("user_id")
          .eq("role_id", "STATE_ADMIN"); // Or lookup the role UUID for state_admin

        if (stateAdmins) {
          for (const admin of stateAdmins) {
            await ERPService.sendNotification(
              admin.user_id,
              "ESCALATION: Overdue Workflow Approval",
              `Request ${request.id} (${request.action_type} for ${request.entity_type}) has been pending for over 7 days. Action is required.`,
              "APPROVAL_ALERT",
              `/admin/approvals`
            );
          }
        }
      }
    }

    // 2. Subscription Expiry Reminders: Scan subscriptions expiring in 30 days
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const { data: expiringSubs } = await supabase
      .from("subscriptions")
      .select("*, members(id, name, state_id, district_id, division_id, unit_id)")
      .eq("status", "ACTIVE")
      .eq("end_date", thirtyDaysFromNow.toISOString().split("T")[0]);

    if (expiringSubs) {
      for (const sub of expiringSubs) {
        // Find matching Unit/Division Admins to notify or notify member if they have a user accounts
        // For demonstration, log the expiry and notify the requester / admin
        console.log(`Subscription for member ${sub.members?.name} is expiring soon.`);
      }
    }

    return NextResponse.json({ success: true, processedOverdue: pendingRequests?.length || 0 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
