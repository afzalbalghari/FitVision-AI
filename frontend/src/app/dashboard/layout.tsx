import { DashboardShell } from "@/components/layout/DashboardShell";

// Route protection is added in Phase 3 (authentication).
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
