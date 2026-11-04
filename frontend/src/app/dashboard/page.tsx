import type { Metadata } from "next";

import { DashboardOverview } from "@/components/dashboard/DashboardOverview";

export const metadata: Metadata = { title: "Dashboard · FitVision AI" };

export default function DashboardPage() {
  return <DashboardOverview />;
}
