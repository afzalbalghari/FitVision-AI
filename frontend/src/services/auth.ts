import { api } from "@/services/api";
import type { LoginPayload, RegisterPayload } from "@/types/auth";

// Token handling is added in Phase 3 when the backend endpoints exist.
export async function register(payload: RegisterPayload): Promise<void> {
  await api.post("/auth/register", payload);
}

export async function login(payload: LoginPayload): Promise<void> {
  await api.post("/auth/login", payload);
}
