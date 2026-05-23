import { LoginPortal } from "@/components/auth/LoginPortal";

export default function AdminLoginPage() {
  return (
    <LoginPortal 
      allowedRole="SUPER_ADMIN" 
      portalName="Super Admin Login" 
      redirectPath="/admin" 
    />
  );
}
