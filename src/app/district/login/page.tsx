import { LoginPortal } from "@/components/auth/LoginPortal";

export default function DistrictLoginPage() {
  return (
    <LoginPortal 
      allowedRole="DISTRICT_ADMIN" 
      portalName="District Portal Login" 
      redirectPath="/district" 
    />
  );
}
