import type { Metadata } from "next";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Live workout · FitVision AI" };

export default function Page() {
  return <ComingSoon title="Live workout" description="Webcam exercise tracking with rep counting and form feedback." phase={5} />;
}
