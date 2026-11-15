import { z } from "zod";

export interface Option<T extends string | number> {
  value: T;
  label: string;
  description?: string;
}

export const GOAL_VALUES = [
  "general_fitness",
  "strength",
  "muscle_building",
  "endurance",
  "weight_management",
] as const;
export const EXPERIENCE_VALUES = ["beginner", "intermediate", "advanced"] as const;
export const EQUIPMENT_VALUES = [
  "bodyweight",
  "dumbbells",
  "resistance_bands",
  "pull_up_bar",
  "yoga_mat",
] as const;
export const EXERCISE_VALUES = ["squat", "pushup", "lunge", "plank"] as const;
export const DURATION_VALUES = [15, 30, 45, 60] as const;
export const FREQUENCY_VALUES = [1, 2, 3, 4, 5, 6, 7] as const;

export type GoalValue = (typeof GOAL_VALUES)[number];
export type ExperienceValue = (typeof EXPERIENCE_VALUES)[number];
export type EquipmentValue = (typeof EQUIPMENT_VALUES)[number];
export type ExerciseValue = (typeof EXERCISE_VALUES)[number];

export const GOAL_OPTIONS: Option<GoalValue>[] = [
  { value: "general_fitness", label: "General fitness", description: "Feel better and move well." },
  { value: "strength", label: "Strength", description: "Get stronger over time." },
  { value: "muscle_building", label: "Muscle building", description: "Add muscle with steady training." },
  { value: "endurance", label: "Endurance", description: "Last longer before tiring." },
  { value: "weight_management", label: "Weight management", description: "Stay active and consistent." },
];

export const EXPERIENCE_OPTIONS: Option<ExperienceValue>[] = [
  { value: "beginner", label: "Beginner", description: "New to training or returning after a break." },
  { value: "intermediate", label: "Intermediate", description: "Train regularly and know the basics." },
  { value: "advanced", label: "Advanced", description: "Years of consistent training." },
];

export const DURATION_OPTIONS: Option<number>[] = DURATION_VALUES.map((v) => ({
  value: v,
  label: `${v} min`,
}));

export const FREQUENCY_OPTIONS: Option<number>[] = FREQUENCY_VALUES.map((v) => ({
  value: v,
  label: v === 1 ? "1 day" : `${v} days`,
}));

export const EQUIPMENT_OPTIONS: Option<EquipmentValue>[] = [
  { value: "bodyweight", label: "Bodyweight only" },
  { value: "dumbbells", label: "Dumbbells" },
  { value: "resistance_bands", label: "Resistance bands" },
  { value: "pull_up_bar", label: "Pull-up bar" },
  { value: "yoga_mat", label: "Exercise mat" },
];

export const EXERCISE_LABELS: Record<ExerciseValue, string> = {
  squat: "Squat",
  pushup: "Push-up",
  lunge: "Lunge",
  plank: "Plank",
};

export const EXERCISE_OPTIONS: Option<ExerciseValue>[] = EXERCISE_VALUES.map((v) => ({
  value: v,
  label: EXERCISE_LABELS[v],
}));

export const onboardingSchema = z.object({
  fitness_goal: z.enum(GOAL_VALUES),
  experience_level: z.enum(EXPERIENCE_VALUES),
  workout_duration: z.number().refine((v) => (DURATION_VALUES as readonly number[]).includes(v), "Pick a duration."),
  weekly_frequency: z.number().int().min(1, "Pick at least 1 day.").max(7),
  equipment: z.array(z.enum(EQUIPMENT_VALUES)),
  exercises: z.array(z.enum(EXERCISE_VALUES)),
  notes: z.string().trim().max(300, "Keep notes under 300 characters."),
});

export type OnboardingValues = z.infer<typeof onboardingSchema>;

export const onboardingDefaults: OnboardingValues = {
  fitness_goal: "general_fitness",
  experience_level: "beginner",
  workout_duration: 30,
  weekly_frequency: 3,
  equipment: ["bodyweight"],
  exercises: [...EXERCISE_VALUES],
  notes: "",
};
