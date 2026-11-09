import { CalendarCheck, Clock, Dumbbell, Flame, Gauge, Repeat, Trophy } from "lucide-react";

const METRICS = [
  { icon: Dumbbell, label: "Total workouts" },
  { icon: Repeat, label: "Total repetitions" },
  { icon: Clock, label: "Workout duration" },
  { icon: Gauge, label: "Average form score" },
  { icon: CalendarCheck, label: "Weekly activity and consistency" },
  { icon: Trophy, label: "Personal records" },
  { icon: Flame, label: "Streaks and achievements" },
];

export function AnalyticsPreview() {
  return (
    <section id="analytics" className="scroll-mt-20 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Progress you can verify</h2>
          <p className="mt-3 max-w-md text-muted">
            Charts are built only from workouts you have completed. A new account starts empty, with no sample
            numbers.
          </p>
        </div>
        <ul className="divide-y divide-line rounded-2xl border border-line bg-bg">
          {METRICS.map(({ icon: Icon, label }) => (
            <li key={label} className="flex items-center gap-4 px-5 py-4">
              <Icon size={18} className="text-accent" aria-hidden />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
