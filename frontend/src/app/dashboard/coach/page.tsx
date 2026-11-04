import type { Metadata } from "next";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Coach · FitVision AI" };

export default function Page() {
  return <ComingSoon title="Coach" description="An AI fitness assistant that can explain your workout history." phase={9} />;
}
