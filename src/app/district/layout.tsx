import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function DistrictPortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout 
      portalName="District Portal" 
      roleName="DISTRICT_ADMIN" 
      basePath="/district"
    >
      {children}
    </DashboardLayout>
  );
}
