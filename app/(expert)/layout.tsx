import { DashboardLayout } from "@/components/layout/DashboardLayout";

export default function ExpertLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      role="expert"
      userName="Meera Patel"
      userEmail="meera@healthbridge.in"
    >
      {children}
    </DashboardLayout>
  );
}
