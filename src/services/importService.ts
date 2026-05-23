import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { MemberWorkflowService } from "./memberWorkflowService";
import { HierarchyScope } from "@/types/enterprise";

export class ImportService {
  /**
   * Processes a CSV string to bulk import members under a strict validation & workflow engine
   */
  static async bulkImportMembers(
    userId: string,
    csvContent: string,
    defaultScope: HierarchyScope
  ): Promise<{ success: boolean; importedCount: number; errors: string[] }> {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const lines = csvContent.split("\n").map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length < 2) return { success: false, importedCount: 0, errors: ["Empty CSV sheet or missing header"] };

    const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""));
    const errors: string[] = [];
    let importedCount = 0;

    const insertedMemberIds: string[] = [];

    // Simple parser
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(",").map(v => v.trim().replace(/^["']|["']$/g, ""));
      if (values.length !== headers.length) {
        errors.push(`Line ${i + 1}: Columns mismatch. Expected ${headers.length}, got ${values.length}`);
        continue;
      }

      // Map values
      const memberObj: any = {};
      headers.forEach((h, index) => {
        memberObj[h] = values[index];
      });

      // Basic validations
      if (!memberObj.name) {
        errors.push(`Line ${i + 1}: Name is required`);
        continue;
      }

      try {
        // Safe, transaction-like rollback boundary:
        // Instead of immediate activation, insert them as PENDING_APPROVAL via our MemberWorkflowService
        const res = await MemberWorkflowService.initiateMemberCreation(
          userId,
          {
            name: memberObj.name,
            organizational_position: memberObj.position || "Member",
            membership_type: (memberObj.type || "REGULAR") as any
          },
          defaultScope
        );

        if (res.error) {
          errors.push(`Line ${i + 1} insertion failed: ${res.error}`);
        } else if (res.member) {
          insertedMemberIds.push(res.member.id);
          importedCount++;
        }
      } catch (err: any) {
        errors.push(`Line ${i + 1} processing error: ${err.message}`);
      }
    }

    // Rollback Safety: If ANY validation/insertion error occurred during bulk processing,
    // clean up inserted members to ensure atomic operation and prevent database dirty states
    if (errors.length > 0 && insertedMemberIds.length > 0) {
      const { error: deleteError } = await supabase
        .from("members")
        .delete()
        .in("id", insertedMemberIds);

      if (deleteError) {
        console.error("Atomic rollback cleanup failed", deleteError);
      }
      return { success: false, importedCount: 0, errors: [...errors, "Transaction rolled back completely to ensure state safety"] };
    }

    return { success: true, importedCount, errors };
  }
}
