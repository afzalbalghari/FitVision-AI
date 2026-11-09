"use client";

import { Camera, CalendarCheck, Clock, Dumbbell, Gauge, History, Repeat, Target } from "lucide-react";
import Link from "next/link";

import { RecentWorkouts } from "@/components/dashboard/RecentWorkouts";
import { StatCard } from "@/components/dashboard/StatCard";
import { WeeklyActivityChart } from "@/components/dashboard/WeeklyActivityChart";
import { Card } from "@/components/ui/Card";
import { buttonClasses } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { useDashboardData } from "@/hooks/useDashboardData";
import { formatDuration, formatNumber } from "@/lib/format";

export function DashboardOverview() {
  const state = useDashboardData();

  if (state.phase === "loading") {
    return <p className="text-sm text-muted">Loading your dashboard…</p>;
  }

  const { overview, weekly, recent, partial } = state;
  const hasWorkouts = (overview?.total_workouts ?? 0) > 0;
  const hasWeeklyActivity = (weekly ?? []).some((d) => d.workouts > 0);

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-muted">
          {hasWorkouts ? "Here is how your training is going." : "Your numbers appear here after your first workout."}
        </p>
      </div>

      {partial && (
        <p className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-muted">
          Some workout data could not be loaded. The history and analytics services are added in later phases, so
          empty states are shown for now.
        </p>
      )}

      <section aria-label="Totals" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total workouts" icon={Dumbbell} value={overview ? formatNumber(overview.total_workouts) : null} />
        <StatCard label="Total repetitions" icon={Repeat} value={overview ? formatNumber(overview.total_repetitions) : null} />
        <StatCard label="Time trained" icon={Clock} value={overview ? formatDuration(overview.total_duration_seconds) : null} />
        <StatCard
          label="Average form score"
          icon={Gauge}
          value={overview?.average_form_score != null ? `${Math.round(overview.average_form_score)}/100` : null}
        />
      </section>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="font-semibold">Weekly activity</h2>
          {hasWeeklyActivity && weekly ? (
            <div className="mt-4">
              <WeeklyActivityChart days={weekly} />
            </div>
          ) : (
            <EmptyState
              icon={CalendarCheck}
              title="No activity this week"
              description="Complete a workout and your daily activity will be charted here."
              action={
                <Link href="/dashboard/workout" className={buttonClasses("secondary")}>
                  <Camera size={16} aria-hidden /> Go to workout
                </Link>
              }
            />
          )}
        </Card>

        <Card>
          <h2 className="font-semibold">Recent workouts</h2>
          {recent && recent.length > 0 ? (
            <div className="mt-2">
              <RecentWorkouts workouts={recent} />
            </div>
          ) : (
            <EmptyState
              icon={History}
              title="No workouts yet"
              description="Saved sessions will show up here with reps and form scores."
            />
          )}
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <h2 className="font-semibold">Today&apos;s workout</h2>
          <EmptyState
            icon={Dumbbell}
            title="No plan yet"
            description="Personalized workout plans are added in Phase 8. Finish onboarding so your preferences are ready."
            action={
              <Link href="/onboarding" className={buttonClasses("secondary")}>
                Open onboarding
              </Link>
            }
          />
        </Card>
        <Card>
          <h2 className="font-semibold">Upcoming workout</h2>
          <EmptyState
            icon={CalendarCheck}
            title="Nothing scheduled"
            description="Your next planned session appears here once you have a plan."
          />
        </Card>
        <Card>
          <h2 className="font-semibold">Goal progress</h2>
          <EmptyState
            icon={Target}
            title="No goal progress yet"
            description="Goal tracking is added in Phase 10, once workouts are being saved."
          />
        </Card>
      </div>
    </div>
  );
}
