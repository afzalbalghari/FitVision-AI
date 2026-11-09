import { cn } from "@/lib/cn";
import { getPasswordStrength } from "@/lib/password";

const SEGMENT_COLORS = ["bg-danger", "bg-warn", "bg-accent-dim", "bg-accent"] as const;

export function PasswordStrength({ password }: { password: string }) {
  const { score, label } = getPasswordStrength(password);
  if (score === 0) return null;

  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="flex flex-1 gap-1" aria-hidden>
        {SEGMENT_COLORS.map((color, index) => (
          <span
            key={color}
            className={cn("h-1.5 flex-1 rounded-full", index < score ? SEGMENT_COLORS[score - 1] : "bg-line")}
          />
        ))}
      </div>
      <span className="w-14 text-right text-xs text-muted">{label}</span>
    </div>
  );
}
