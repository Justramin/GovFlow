import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export class StorageService {
  private static BUCKET_NAME = "enterprise-documents";

  /**
   * Uploads an operational document securely scoped by hierarchy path
   * Path pattern: [state_id]/[district_id]/[division_id]/[unit_id]/[member_id]/[doc_type]/[filename]
   */
  static async uploadDocument(params: {
    stateId?: string;
    districtId?: string;
    divisionId?: string;
    unitId?: string;
    memberId: string;
    docType: "MEMBER" | "APPROVAL" | "TRANSFER" | "RETIREMENT";
    filename: string;
    fileBody: Buffer | Blob | ArrayBuffer;
    contentType: string;
  }) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const pathParts = [
      params.stateId || "global",
      params.districtId || "global",
      params.divisionId || "global",
      params.unitId || "global",
      params.memberId,
      params.docType.toLowerCase(),
      params.filename
    ];

    const targetPath = pathParts.join("/");

    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .upload(targetPath, params.fileBody, {
        contentType: params.contentType,
        upsert: true
      });

    if (error) throw new Error(`Document upload failed: ${error.message}`);
    return data;
  }

  /**
   * Generates a secure, temporary signed URL for a document (bypasses direct public download)
   */
  static async getDocumentSignedUrl(path: string, expiresInSeconds: number = 300) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.storage
      .from(this.BUCKET_NAME)
      .createSignedUrl(path, expiresInSeconds);

    if (error) throw new Error(`Failed to generate secure URL: ${error.message}`);
    return data.signedUrl;
  }
}
