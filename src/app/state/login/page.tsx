import { LoginPortal } from "@/components/auth/LoginPortal";

export default function StateLoginPage() {
  return (
    <LoginPortal 
      allowedRole="STATE_ADMIN" 
      portalName="State Portal Login" 
      redirectPath="/state" 
    />
  );
}
