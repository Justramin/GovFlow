"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, Shield, ChevronRight, AlertCircle, Info } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface LoginPortalProps {
  allowedRole: "SUPER_ADMIN" | "STATE_ADMIN" | "DISTRICT_ADMIN" | "DIVISION_ADMIN" | "UNIT_ADMIN" | "ANY";
  portalName: string;
  redirectPath: string;
}

export function LoginPortal({ allowedRole, portalName, redirectPath }: LoginPortalProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(true); // Default to demo mode for easy testing

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isDemoMode) {
        // Mock Login Bypass Mode
        // We set a mock cookie that the middleware will recognize
        const mockUser = {
          id: `mock-${allowedRole.toLowerCase()}-id`,
          email: email || `${allowedRole.toLowerCase()}@govflow.com`,
          role: allowedRole === "ANY" ? "STATE_ADMIN" : allowedRole,
          name: getDemoName(allowedRole),
          scope: {
            state_id: " Kerala-state-uuid",
            district_id: allowedRole === "DISTRICT_ADMIN" ? "TVM-district-uuid" : undefined,
            division_id: allowedRole === "DIVISION_ADMIN" ? "CD-division-uuid" : undefined,
            unit_id: allowedRole === "UNIT_ADMIN" ? "CU-unit-uuid" : undefined,
          }
        };

        // Set mock cookies
        document.cookie = `govflow-mock-role=${mockUser.role}; path=/; max-age=86400`;
        document.cookie = `govflow-mock-user=${JSON.stringify(mockUser)}; path=/; max-age=86400`;
        
        // Redirect to target path
        const targetPath = allowedRole === "ANY" ? getDashboardByRole(mockUser.role) : redirectPath;
        router.push(targetPath);
        router.refresh();
        return;
      }

      // Real Supabase Authentication
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        throw new Error(authError.message);
      }

      if (data?.user) {
        // Fetch user's role from user_access_scope
        const { data: scopes, error: scopeError } = await supabase
          .from("user_access_scope")
          .select(`
            role_id,
            roles:role_id ( name )
          `)
          .eq("user_id", data.user.id);

        if (scopeError || !scopes || scopes.length === 0) {
          // If no access scope found, check user_roles
          const { data: userRoles } = await supabase
            .from("user_roles")
            .select("roles(name)")
            .eq("user_id", data.user.id);
            
          const roleName = (userRoles?.[0]?.roles as any)?.name || "MEMBER";
          
          if (allowedRole !== "ANY" && roleName !== allowedRole) {
            await supabase.auth.signOut();
            throw new Error(`Unauthorized. This portal requires the ${allowedRole} role.`);
          }

          const target = allowedRole === "ANY" ? getDashboardByRole(roleName) : redirectPath;
          router.push(target);
          router.refresh();
          return;
        }

        const roleName = (scopes[0] as any).roles?.name;

        if (allowedRole !== "ANY" && roleName !== allowedRole) {
          await supabase.auth.signOut();
          throw new Error(`Unauthorized. This portal requires the ${allowedRole} role.`);
        }

        const target = allowedRole === "ANY" ? getDashboardByRole(roleName) : redirectPath;
        router.push(target);
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message || "Something went wrong during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const getDemoName = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN": return "Super Admin (System)";
      case "STATE_ADMIN": return "Rajesh Kumar (State Secretary)";
      case "DISTRICT_ADMIN": return "Biju Varghese (District Admin)";
      case "DIVISION_ADMIN": return "Sajeev M. (Division Secretary)";
      case "UNIT_ADMIN": return "Anilkumar P. (Unit Secretary)";
      default: return "Demo User";
    }
  };

  const getDashboardByRole = (role: string) => {
    switch (role) {
      case "SUPER_ADMIN": return "/admin";
      case "STATE_ADMIN": return "/state";
      case "DISTRICT_ADMIN": return "/district";
      case "DIVISION_ADMIN": return "/division";
      case "UNIT_ADMIN": return "/unit";
      default: return "/login";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="bg-primary p-8 text-white text-center relative">
          <div className="w-16 h-16 bg-white/20 rounded-2xl mx-auto mb-4 flex items-center justify-center backdrop-blur-md">
            <Shield size={32} />
          </div>
          <h1 className="text-2xl font-bold">{portalName}</h1>
          <p className="text-white/70 text-sm mt-2">
            {allowedRole === "ANY" 
              ? "Access your dashboard" 
              : `Authorized ${allowedRole.replace("_", " ")} access`}
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm flex items-center gap-2 border border-red-100">
              <AlertCircle size={18} className="shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="text-sm font-bold text-gray-700 mb-2 block">
                {isDemoMode ? "Demo Email / Username" : "Email Address"}
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={isDemoMode ? `${allowedRole.toLowerCase() || 'admin'}@govflow.com` : "name@example.com"}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* Toggle demo bypass mode */}
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 flex items-start gap-2.5">
              <Info size={16} className="text-primary shrink-0 mt-0.5" />
              <div className="text-xs text-gray-600">
                <p className="font-bold mb-1 text-gray-700">Developer Demo Mode</p>
                <p className="mb-2">Uses client-side simulated auth session. Recommended for initial testing.</p>
                <label className="flex items-center gap-2 cursor-pointer mt-1">
                  <input 
                    type="checkbox" 
                    checked={isDemoMode}
                    onChange={(e) => setIsDemoMode(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary/20"
                  />
                  <span className="font-semibold text-primary">Enable Local Demo Bypass</span>
                </label>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? "Signing in..." : "Sign In"}
              <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm">
            <button type="button" className="text-gray-500 hover:text-primary transition-colors font-medium">Forgot Password?</button>
            <button type="button" className="text-primary font-bold hover:underline">Support Portal</button>
          </div>
        </form>
      </motion.div>

      <p className="mt-8 text-gray-400 text-xs text-center max-w-sm">
        GovFlow Governance ERP • Security Level: Scoped Administrative Access
      </p>
    </div>
  );
}
