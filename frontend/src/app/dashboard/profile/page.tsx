import type { Metadata } from "next";

import { ComingSoon } from "@/components/dashboard/ComingSoon";

export const metadata: Metadata = { title: "Profile · FitVision AI" };

export default function Page() {
  return <ComingSoon title="Profile" description="Update your name, goals and preferences, or delete your data." phase={3} />;
}
