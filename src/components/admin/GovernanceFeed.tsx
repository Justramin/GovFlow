import { ShieldCheck, ArrowRightLeft, TrendingUp, AlertTriangle } from "lucide-react";

interface ActivityItem {
  id: string;
  action_type: string;
  entity_type: string;
  status: string;
  created_at: string;
  requester_id: string;
}

export function GovernanceFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Governance Activity Feed</h3>
        <span className="text-[10px] bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Live System</span>
      </div>

      <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {(!activities || activities.length === 0) ? (
          <p className="text-xs text-gray-400 py-6 text-center">No governance operations registered in this block.</p>
        ) : (
          activities.map((item) => (
            <div key={item.id} className="py-4 flex gap-4 items-start first:pt-0 last:pb-0 hover:bg-gray-50/50 transition-colors px-2 rounded-xl">
              <div className={`p-2 rounded-xl border ${
                item.action_type === "TRANSFER" ? "bg-blue-50 border-blue-100 text-blue-600" :
                item.action_type === "PROMOTION" ? "bg-purple-50 border-purple-100 text-purple-600" :
                item.status === "REJECTED" ? "bg-red-50 border-red-100 text-red-600" :
                "bg-green-50 border-green-100 text-green-600"
              }`}>
                {item.action_type === "TRANSFER" && <ArrowRightLeft size={16} />}
                {item.action_type === "PROMOTION" && <TrendingUp size={16} />}
                {item.status === "REJECTED" && <AlertTriangle size={16} />}
                {item.action_type === "CREATE" && <ShieldCheck size={16} />}
              </div>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-gray-900 truncate">
                  {item.action_type} Request Processed
                </div>
                <p className="text-[10px] text-gray-500 mt-0.5">
                  Entity: {item.entity_type} | Operator: {item.requester_id.substring(0, 8)}
                </p>
                <span className="text-[9px] text-gray-400 font-semibold mt-2 block">
                  {new Date(item.created_at).toLocaleString()}
                </span>
              </div>

              <div className="shrink-0 text-right">
                <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${
                  item.status === "APPROVED" ? "bg-green-100 text-green-700 border-green-200" :
                  item.status === "PENDING" ? "bg-orange-100 text-orange-700 border-orange-200" :
                  "bg-red-100 text-red-700 border-red-200"
                }`}>
                  {item.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
