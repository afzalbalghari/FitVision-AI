import { api } from "@/services/api";
import type {
  OverviewResponse,
  WeeklyResponse,
  WorkoutListResponse,
} from "@/types/analytics";

export async function fetchOverview(): Promise<OverviewResponse> {
  const { data } = await api.get<OverviewResponse>("/analytics/overview");
  return data;
}

export async function fetchWeekly(): Promise<WeeklyResponse> {
  const { data } = await api.get<WeeklyResponse>("/analytics/weekly");
  return data;
}

export async function fetchRecentWorkouts(limit = 5): Promise<WorkoutListResponse> {
  const { data } = await api.get<WorkoutListResponse>("/workouts", {
    params: { page: 1, page_size: limit },
  });
  return data;
}
