"use client";

import { useEffect, useState } from "react";

import { fetchOverview, fetchRecentWorkouts, fetchWeekly } from "@/services/analytics";
import type { OverviewResponse, WeeklyPoint, WorkoutSummary } from "@/types/analytics";

export type DashboardState =
  | { phase: "loading" }
  | {
      phase: "ready";
      overview: OverviewResponse | null;
      weekly: WeeklyPoint[] | null;
      recent: WorkoutSummary[] | null;
      /** True when at least one request failed (e.g. endpoint not built yet). */
      partial: boolean;
    };

export function useDashboardData(): DashboardState {
  const [state, setState] = useState<DashboardState>({ phase: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [overview, weekly, recent] = await Promise.allSettled([
        fetchOverview(),
        fetchWeekly(),
        fetchRecentWorkouts(5),
      ]);
      if (cancelled) return;
      setState({
        phase: "ready",
        overview: overview.status === "fulfilled" ? overview.value : null,
        weekly: weekly.status === "fulfilled" ? weekly.value.days : null,
        recent: recent.status === "fulfilled" ? recent.value.items : null,
        partial: [overview, weekly, recent].some((r) => r.status === "rejected"),
      });
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
