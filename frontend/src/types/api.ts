export type HealthStatus = "ok" | "degraded";

export interface HealthResponse {
  status: HealthStatus;
  app: string;
  environment: string;
  database: "connected" | "unreachable";
}

export interface ApiErrorBody {
  error: {
    code: string;
    message: string;
    details?: { field: string; message: string }[];
  };
}
