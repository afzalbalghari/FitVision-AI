/**
 * Response contracts the dashboard expects. The backend endpoints are added in
 * later phases (analytics: Phase 7, workouts: Phase 6) and must match these shapes.
 */

/** GET /api/analytics/overview */
export interface OverviewResponse {
  total_workouts: number;
  total_repetitions: number;
  total_duration_seconds: number;
  average_form_score: number | null;
}

/** GET /api/analytics/weekly */
export interface WeeklyPoint {
  date: string; // YYYY-MM-DD
  workouts: number;
  repetitions: number;
}

export interface WeeklyResponse {
  days: WeeklyPoint[];
}

/** Items of GET /api/workouts */
export interface WorkoutSummary {
  id: string;
  exercise: string;
  created_at: string; // ISO 8601
  duration_seconds: number;
  repetitions: number;
  average_score: number | null;
}

export interface WorkoutListResponse {
  items: WorkoutSummary[];
  total: number;
  page: number;
  page_size: number;
}
