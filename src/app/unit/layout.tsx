import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function UnitPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout 
      portalName="Unit Portal" 
      roleName="UNIT_ADMIN" 
      basePath="/unit"
    >
      {children}
    </DashboardLayout>
  );
}
