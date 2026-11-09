import { EXERCISE_LABELS, type ExerciseValue } from "@/lib/onboarding";
import { formatDate, formatDuration } from "@/lib/format";
import type { WorkoutSummary } from "@/types/analytics";

function exerciseLabel(exercise: string): string {
  return EXERCISE_LABELS[exercise as ExerciseValue] ?? exercise;
}

export function RecentWorkouts({ workouts }: { workouts: WorkoutSummary[] }) {
  return (
    <ul className="divide-y divide-line">
      {workouts.map((w) => (
        <li key={w.id} className="flex items-center justify-between gap-4 py-3">
          <div>
            <p className="font-medium">{exerciseLabel(w.exercise)}</p>
            <p className="text-xs text-muted">
              {formatDate(w.created_at)} · {formatDuration(w.duration_seconds)}
            </p>
          </div>
          <div className="text-right text-sm tabular-nums">
            <p>{w.repetitions} reps</p>
            <p className="text-xs text-muted">{w.average_score === null ? "No score" : `Form ${Math.round(w.average_score)}/100`}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
