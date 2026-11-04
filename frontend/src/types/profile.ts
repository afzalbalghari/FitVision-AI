import type {
  EquipmentValue,
  ExerciseValue,
  ExperienceValue,
  GoalValue,
} from "@/lib/onboarding";

/** Matches the UserProfile fields planned for the backend (PUT /api/profile). */
export interface ProfilePayload {
  fitness_goal: GoalValue;
  experience_level: ExperienceValue;
  workout_duration: number;
  weekly_frequency: number;
  equipment: EquipmentValue[];
  preferences: {
    exercises: ExerciseValue[];
    notes?: string;
  };
}
