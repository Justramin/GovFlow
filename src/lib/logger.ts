import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export class Logger {
  /**
   * Logs runtime details or security violations securely to audit frameworks
   */
  static async logEvent(params: {
    level: "INFO" | "WARNING" | "CRITICAL";
    category: "AUTH" | "WORKFLOW" | "PERMISSIONS" | "API";
    message: string;
    metadata?: any;
  }) {
    const timestamp = new Date().toISOString();
    const logOutput = `[${timestamp}] [${params.level}] [${params.category}] ${params.message}`;
    
    console.log(logOutput, params.metadata || "");

    // In a production environment, write these directly to an unexposed security table
    // (e.g. sys_audit_logs) which has RLS policies disabled for anonymous read
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);

      await supabase.from("approval_logs").insert({
        reviewer_id: "00000000-0000-0000-0000-000000000000", // System UUID
        action: params.level,
        comments: `${params.category}: ${params.message} | Meta: ${JSON.stringify(params.metadata || {})}`
      });
    } catch (e) {
      console.error("Failed to write persistent security audit log", e);
    }
  }
}
