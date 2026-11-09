import { Construction } from "lucide-react";

import { Card } from "@/components/ui/Card";

export interface ComingSoonProps {
  title: string;
  description: string;
  phase: number;
}

/** Explicit placeholder for pages that are not built yet. */
export function ComingSoon({ title, description, phase }: ComingSoonProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <Card>
        <div className="flex items-start gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-muted">
            <Construction size={20} aria-hidden />
          </span>
          <div>
            <p className="font-semibold">Not built yet</p>
            <p className="mt-1 text-sm text-muted">{description}</p>
            <p className="mt-3 text-sm text-muted">Planned for Phase {phase}.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
