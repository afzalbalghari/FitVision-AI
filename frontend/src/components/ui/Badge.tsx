import type { HTMLAttributes } from "react";

import { cn } from "@/lib/cn";

type Tone = "success" | "warning" | "danger" | "neutral";

const tones: Record<Tone, string> = {
  success: "bg-accent/10 text-accent",
  warning: "bg-warn/10 text-warn",
  danger: "bg-danger/10 text-danger",
  neutral: "bg-surface-2 text-muted",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
}

export function Badge({ tone = "neutral", className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
