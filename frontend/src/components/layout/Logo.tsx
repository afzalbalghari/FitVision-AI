import { Activity } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-bg">
        <Activity size={20} strokeWidth={2.5} aria-hidden />
      </span>
      <span className="text-lg font-bold tracking-tight">FitVision AI</span>
    </div>
  );
}
