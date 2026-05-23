"use client";

import { useState } from "react";
import { Search, Filter, Layers, Users, Calendar } from "lucide-react";

export function EnterpriseSearch() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("ALL");

  // In a real application, this would dispatch to a server action that leverages RLS
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center">
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input 
          type="text" 
          placeholder="Search members, approvals, subscriptions..." 
          className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <select 
          className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm font-medium outline-none text-gray-600 focus:ring-2 focus:ring-primary/20 cursor-pointer"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="ALL">All Categories</option>
          <option value="MEMBERS">Members</option>
          <option value="WORKFLOWS">Workflows</option>
          <option value="SUBSCRIPTIONS">Subscriptions</option>
        </select>
        
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-md shadow-primary/20 hover:bg-primary-dark transition-colors whitespace-nowrap">
          <Filter size={16} />
          Filters
        </button>
      </div>
    </div>
  );
}
