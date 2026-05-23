"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Shield, ChevronRight } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState("STATE_ADMIN");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd validate credentials
    // For this demo, we'll just redirect to the dashboard
    router.push("/admin");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-primary p-8 text-white text-center">
          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-md">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold">Union Portal Login</h1>
          <p className="text-white/70 text-sm mt-2">Access your administrative dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="p-8">
          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Employee ID / Username</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  placeholder="Enter ID"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">Login As (Demo Role)</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="STATE_ADMIN">State Administrator</option>
                <option value="DISTRICT_ADMIN">District Secretary</option>
                <option value="DIVISION_SECRETARY">Division Secretary</option>
                <option value="UNIT_SECRETARY">Unit Secretary</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-primary hover:bg-primary-dark text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group"
            >
              Sign In
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm">
            <button type="button" className="text-gray-500 hover:text-primary transition-colors font-medium">Forgot Password?</button>
            <button type="button" className="text-primary font-bold hover:underline">New Member?</button>
          </div>
        </form>
      </motion.div>

      <p className="mt-8 text-gray-500 text-sm">
        KSEB Workers Association Management System v1.0
      </p>
    </div>
  );
}
