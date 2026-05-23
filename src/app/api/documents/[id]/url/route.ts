import { NextRequest, NextResponse } from "next/server";
import { DocumentService } from "@/services/documentService";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    
    // Validate session
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Securely pull a signed download URL using DocumentService (which honors RLS policies internally)
    const signedUrl = await DocumentService.getSecureDownloadUrl(id);

    return NextResponse.json({ signedUrl });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
