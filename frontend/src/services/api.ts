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
