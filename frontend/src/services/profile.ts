import { api } from "@/services/api";
import type { OnboardingValues } from "@/lib/onboarding";
import type { ProfilePayload } from "@/types/profile";

export function toProfilePayload(values: OnboardingValues): ProfilePayload {
  return {
    fitness_goal: values.fitness_goal,
    experience_level: values.experience_level,
    workout_duration: values.workout_duration,
    weekly_frequency: values.weekly_frequency,
    equipment: values.equipment,
    preferences: {
      exercises: values.exercises,
      ...(values.notes ? { notes: values.notes } : {}),
    },
  };
}

export async function saveProfile(values: OnboardingValues): Promise<void> {
  await api.put("/profile", toProfilePayload(values));
}
