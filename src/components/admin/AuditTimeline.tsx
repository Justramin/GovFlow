import { Check, X, Clock, Edit, ArrowRightLeft, TrendingUp } from 'lucide-react';

interface AuditLog {
  id: string;
  action: string;
  created_at: string;
  comments?: string;
  reviewer_id?: string;
}

export function AuditTimeline({ logs }: { logs: AuditLog[] }) {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-gray-900">Audit History & Lifecycle</h3>
      
      {(!logs || logs.length === 0) ? (
        <p className="text-sm text-gray-500 italic">No history available for this record.</p>
      ) : (
        <div className="relative border-l-2 border-gray-100 ml-3 space-y-8 py-2">
          {logs.map((log) => (
            <div key={log.id} className="relative pl-8">
              <div className={`absolute -left-[13px] top-0 p-1.5 rounded-full bg-white border-2 shadow-sm ${
                log.action === 'APPROVED' ? 'border-green-500 text-green-500' :
                log.action === 'REJECTED' ? 'border-red-500 text-red-500' :
                log.action === 'TRANSFER' ? 'border-blue-500 text-blue-500' :
                log.action === 'PROMOTION' ? 'border-purple-500 text-purple-500' :
                'border-gray-300 text-gray-400'
              }`}>
                {log.action === 'APPROVED' && <Check size={12} strokeWidth={3} />}
                {log.action === 'REJECTED' && <X size={12} strokeWidth={3} />}
                {log.action === 'TRANSFER' && <ArrowRightLeft size={12} strokeWidth={3} />}
                {log.action === 'PROMOTION' && <TrendingUp size={12} strokeWidth={3} />}
                {!['APPROVED', 'REJECTED', 'TRANSFER', 'PROMOTION'].includes(log.action) && <Edit size={12} strokeWidth={3} />}
              </div>
              
              <div className="bg-gray-50/50 border border-gray-100 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900">{log.action}</span>
                  <span className="text-xs font-medium text-gray-500 flex items-center gap-1.5">
                    <Clock size={12} />
                    {new Date(log.created_at).toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {log.comments || 'System action processed without additional comments.'}
                </p>
                {log.reviewer_id && (
                  <div className="mt-3 pt-3 border-t border-gray-100/50 flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400">Authority</span>
                    <span className="text-xs font-medium text-gray-700 bg-white px-2 py-1 rounded border border-gray-200">
                      ID: {log.reviewer_id.substring(0, 8)}...
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
