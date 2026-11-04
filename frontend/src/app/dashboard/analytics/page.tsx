import type { Metadata } from "next";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Analytics · FitVision AI" };

export default function Page() {
  return <ComingSoon title="Analytics" description="Charts and personal records built from your saved workouts." phase={7} />;
}
