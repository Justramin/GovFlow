import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function StatePortalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout 
      portalName="State Portal" 
      roleName="STATE_ADMIN" 
      basePath="/state"
    >
      {children}
    </DashboardLayout>
  );
}
