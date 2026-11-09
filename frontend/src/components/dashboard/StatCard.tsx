import type { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/Card";

export interface StatCardProps {
  label: string;
  /** null renders an em dash: there is no data to show. */
  value: string | null;
  icon: LucideIcon;
}

export function StatCard({ label, value, icon: Icon }: StatCardProps) {
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between text-muted">
        <span className="text-sm">{label}</span>
        <Icon size={18} aria-hidden />
      </div>
      <p className="mt-3 text-3xl font-bold tabular-nums tracking-tight">{value ?? "—"}</p>
    </Card>
  );
}
