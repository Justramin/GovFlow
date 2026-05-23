import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DivisionPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout 
      portalName="Division Portal" 
      roleName="DIVISION_ADMIN" 
      basePath="/division"
    >
      {children}
    </DashboardLayout>
  );
}
