import { LoginPortal } from "@/components/auth/LoginPortal";

export default function DivisionLoginPage() {
  return (
    <LoginPortal 
      allowedRole="DIVISION_ADMIN" 
      portalName="Division Portal Login" 
      redirectPath="/division" 
    />
  );
}
