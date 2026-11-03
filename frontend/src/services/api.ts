import axios, { AxiosError } from "axios";

import { API_URL } from "@/lib/config";
import type { ApiErrorBody } from "@/types/api";

/** Shared Axios instance. Auth headers are added in Phase 3. */
export const api = axios.create({
  baseURL: `${API_URL}/api`,
  timeout: 8000,
});

/** Turn any thrown value into a message that is safe to show to the user. */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const body = error.response?.data as ApiErrorBody | undefined;
    if (body?.error?.message) return body.error.message;
    if (!error.response) return `Cannot reach the backend at ${API_URL}.`;
  }
  return "Something went wrong. Please try again.";
}

/** True when the endpoint does not exist yet (features added in later phases). */
export function isNotImplemented(error: unknown): boolean {
  return error instanceof AxiosError && (error.response?.status === 404 || error.response?.status === 405);
}

/** Like getErrorMessage, but explains clearly when a backend feature is not built yet. */
export function getActionErrorMessage(error: unknown, feature: string): string {
  if (isNotImplemented(error)) {
    return `${feature} is not available yet. The backend endpoint for it has not been built.`;
  }
  return getErrorMessage(error);
}