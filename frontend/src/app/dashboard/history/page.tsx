import type { Metadata } from "next";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "History · FitVision AI" };

export default function Page() {
  return <ComingSoon title="History" description="Your saved workout sessions, with filters and details." phase={6} />;
}
