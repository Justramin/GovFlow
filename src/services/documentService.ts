import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { StorageService } from "./storageService";
import { HierarchyScope } from "@/types/enterprise";

export class DocumentService {
  /**
   * Uploads and registers a new document for a member
   */
  static async uploadAndRegisterDocument(params: {
    memberId: string;
    documentType: "ID_PROOF" | "MEMBERSHIP" | "TRANSFER" | "PROMOTION" | "RETIREMENT" | "RECEIPT";
    uploadedBy: string;
    approvalRequestId?: string;
    hierarchyScope: HierarchyScope;
    filename: string;
    fileBody: Buffer | Blob | ArrayBuffer;
    contentType: string;
  }) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. Upload to Supabase Storage securely via scoped path
    const storageResponse = await StorageService.uploadDocument({
      ...params.hierarchyScope,
      memberId: params.memberId,
      docType: params.documentType === "RECEIPT" ? "MEMBER" : params.documentType as any,
      filename: params.filename,
      fileBody: params.fileBody,
      contentType: params.contentType
    });

    // 2. Register metadata entry in db
    const { data: document, error } = await supabase
      .from("member_documents")
      .insert({
        member_id: params.memberId,
        document_type: params.documentType,
        uploaded_by: params.uploadedBy,
        approval_request_id: params.approvalRequestId || null,
        state_id: params.hierarchyScope.state_id || null,
        district_id: params.hierarchyScope.district_id || null,
        division_id: params.hierarchyScope.division_id || null,
        unit_id: params.hierarchyScope.unit_id || null,
        storage_path: storageResponse.path,
        verification_status: "PENDING_VERIFICATION"
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return document;
  }

  /**
   * Updates document verification status (verified/rejected)
   */
  static async verifyDocument(params: {
    documentId: string;
    status: "VERIFIED" | "REJECTED";
    comments?: string;
  }) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("member_documents")
      .update({
        verification_status: params.status,
        verification_comments: params.comments || null,
        updated_at: new Date().toISOString()
      })
      .eq("id", params.documentId)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  /**
   * Retrieves secure signed URL for preview/download
   */
  static async getSecureDownloadUrl(documentId: string) {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: doc, error: fetchError } = await supabase
      .from("member_documents")
      .select("storage_path")
      .eq("id", documentId)
      .single();

    if (fetchError || !doc) throw new Error("Document metadata not found");

    return await StorageService.getDocumentSignedUrl(doc.storage_path);
  }
}
