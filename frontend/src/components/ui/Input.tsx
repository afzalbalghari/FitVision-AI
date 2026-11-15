import type { ComponentProps } from "react";

import { cn } from "@/lib/cn";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm text-ink placeholder:text-muted",
        "transition focus:border-accent-dim aria-[invalid=true]:border-danger",
        className,
      )}
      {...props}
    />
  );
}
