"use client";

import { useState } from "react";
import { Eye, Download, ShieldCheck, ShieldAlert, X } from "lucide-react";

interface DocumentItem {
  id: string;
  document_type: string;
  storage_path: string;
  verification_status: string;
  verification_comments?: string;
  created_at: string;
}

export function DocumentViewer({ 
  document, 
  onVerify 
}: { 
  document: DocumentItem; 
  onVerify?: (status: "VERIFIED" | "REJECTED", comments?: string) => Promise<void>; 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);

  const triggerPreview = async () => {
    setLoading(true);
    try {
      // Fetch signed URL via secure API handler or client action
      const res = await fetch(`/api/documents/${document.id}/url`);
      const { signedUrl } = await res.json();
      if (signedUrl) {
        setPreviewUrl(signedUrl);
        setIsOpen(true);
      }
    } catch (e) {
      console.error("Preview retrieval failed", e);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (status: "VERIFIED" | "REJECTED") => {
    if (onVerify) {
      setLoading(true);
      await onVerify(status, comments);
      setLoading(false);
      setIsOpen(false);
    }
  };

  const isPDF = document.storage_path.toLowerCase().endsWith(".pdf");

  return (
    <div>
      <button 
        onClick={triggerPreview}
        disabled={loading}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-100 disabled:opacity-50 transition-all cursor-pointer"
      >
        <Eye size={14} />
        {loading ? "Syncing..." : "View Document"}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 md:p-8 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900">{document.document_type.replace("_", " ")}</h3>
                <p className="text-[10px] text-gray-400 font-medium">Uploaded on {new Date(document.created_at).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content Preview Frame */}
            <div className="flex-1 min-h-[40vh] max-h-[60vh] bg-gray-900 flex items-center justify-center relative overflow-hidden">
              {previewUrl && (
                isPDF ? (
                  <iframe src={`${previewUrl}#toolbar=0`} className="w-full h-full border-none" />
                ) : (
                  <img src={previewUrl} alt="Preview" className="max-w-full max-h-full object-contain" />
                )
              )}
            </div>

            {/* Verification Controls Footer */}
            <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Review comments / rejection reason..." 
                  className="w-full px-4 py-2 border border-gray-200 bg-white rounded-xl text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>

              <div className="flex gap-2 w-full md:w-auto shrink-0 justify-end">
                {previewUrl && (
                  <a 
                    href={previewUrl} 
                    download
                    className="p-2 border border-gray-200 hover:bg-gray-100 rounded-xl text-gray-600 transition-colors"
                  >
                    <Download size={18} />
                  </a>
                )}
                {onVerify && (
                  <>
                    <button 
                      onClick={() => handleStatusChange("REJECTED")}
                      className="px-4 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-100 transition-colors flex items-center gap-1.5"
                    >
                      <ShieldAlert size={16} /> Reject
                    </button>
                    <button 
                      onClick={() => handleStatusChange("VERIFIED")}
                      className="px-4 py-2.5 bg-green-50 text-green-600 border border-green-200 rounded-xl text-xs font-bold hover:bg-green-100 transition-colors flex items-center gap-1.5"
                    >
                      <ShieldCheck size={16} /> Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
