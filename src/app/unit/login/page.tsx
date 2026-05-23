import { LoginPortal } from "@/components/auth/LoginPortal";

export default function UnitLoginPage() {
  return (
    <LoginPortal 
      allowedRole="UNIT_ADMIN" 
      portalName="Unit Portal Login" 
      redirectPath="/unit" 
    />
  );
}
