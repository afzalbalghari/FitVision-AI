"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, type FieldPath } from "react-hook-form";

import { ChoiceGroup } from "@/components/forms/ChoiceGroup";
import { Button } from "@/components/ui/Button";
import {
  DURATION_OPTIONS,
  EQUIPMENT_OPTIONS,
  EXERCISE_OPTIONS,
  EXPERIENCE_OPTIONS,
  FREQUENCY_OPTIONS,
  GOAL_OPTIONS,
  onboardingDefaults,
  onboardingSchema,
  type OnboardingValues,
} from "@/lib/onboarding";
import { getActionErrorMessage } from "@/services/api";
import { saveProfile } from "@/services/profile";

const STEPS: { title: string; fields: FieldPath<OnboardingValues>[] }[] = [
  { title: "Your goal", fields: ["fitness_goal", "experience_level"] },
  { title: "Your schedule", fields: ["workout_duration", "weekly_frequency"] },
  { title: "Your setup", fields: ["equipment", "exercises", "notes"] },
];

export function OnboardingForm() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    watch,
    setValue,
    register,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OnboardingValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: onboardingDefaults,
  });

  const values = watch();
  const isLast = step === STEPS.length - 1;

  function update<K extends FieldPath<OnboardingValues>>(name: K, value: OnboardingValues[K & keyof OnboardingValues]) {
    setValue(name, value as never, { shouldValidate: true, shouldDirty: true });
  }

  async function next() {
    const valid = await trigger(STEPS[step].fields);
    if (valid) setStep((s) => s + 1);
  }

  async function onSubmit(data: OnboardingValues) {
    setServerError(null);
    try {
      await saveProfile(data);
      router.push("/dashboard");
    } catch (error) {
      setServerError(getActionErrorMessage(error, "Saving your profile"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      <div>
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium">{STEPS[step].title}</span>
          <span className="text-muted">
            Step {step + 1} of {STEPS.length}
          </span>
        </div>
        <div
          className="mt-3 h-1.5 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={STEPS.length}
          aria-valuenow={step + 1}
          aria-label="Onboarding progress"
        >
          <div className="h-full rounded-full bg-accent transition-all" style={{ width: `${((step + 1) / STEPS.length) * 100}%` }} />
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-8">
          <ChoiceGroup
            legend="What is your main goal?"
            options={GOAL_OPTIONS}
            value={values.fitness_goal}
            onChange={(v) => update("fitness_goal", v)}
            error={errors.fitness_goal?.message}
          />
          <ChoiceGroup
            legend="How would you describe your experience?"
            options={EXPERIENCE_OPTIONS}
            columns="3"
            value={values.experience_level}
            onChange={(v) => update("experience_level", v)}
            error={errors.experience_level?.message}
          />
        </div>
      )}

      {step === 1 && (
        <div className="space-y-8">
          <ChoiceGroup
            legend="How long should each workout be?"
            options={DURATION_OPTIONS}
            columns="5"
            value={values.workout_duration}
            onChange={(v) => update("workout_duration", v)}
            error={errors.workout_duration?.message}
          />
          <ChoiceGroup
            legend="How many days per week can you train?"
            hint="Pick a number you can keep up. You can change it later."
            options={FREQUENCY_OPTIONS}
            columns="5"
            value={values.weekly_frequency}
            onChange={(v) => update("weekly_frequency", v)}
            error={errors.weekly_frequency?.message}
          />
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <ChoiceGroup
            multiple
            legend="What equipment do you have?"
            hint="Optional. Leave as is if you only have your bodyweight."
            options={EQUIPMENT_OPTIONS}
            value={values.equipment}
            onChange={(v) => update("equipment", v)}
          />
          <ChoiceGroup
            multiple
            legend="Which exercises do you want to practice?"
            hint="Optional. FitVision currently tracks these four."
            options={EXERCISE_OPTIONS}
            value={values.exercises}
            onChange={(v) => update("exercises", v)}
          />
          <div className="space-y-1.5">
            <label htmlFor="notes" className="block text-sm font-medium">
              Anything else we should know?
            </label>
            <textarea
              id="notes"
              rows={3}
              maxLength={300}
              placeholder="Optional. Please do not include medical information."
              className="w-full rounded-xl border border-line bg-surface-2 px-4 py-3 text-sm placeholder:text-muted focus:border-accent-dim"
              {...register("notes")}
            />
            {errors.notes && (
              <p role="alert" className="text-xs text-danger">
                {errors.notes.message}
              </p>
            )}
          </div>
        </div>
      )}

      {serverError && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      )}

      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {step > 0 && (
            <Button variant="secondary" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={16} aria-hidden /> Back
            </Button>
          )}
          <Link href="/dashboard" className="px-2 text-sm text-muted hover:text-ink">
            Skip for now
          </Link>
        </div>

        {isLast ? (
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save and continue"}
          </Button>
        ) : (
          <Button onClick={next}>
            Next <ArrowRight size={16} aria-hidden />
          </Button>
        )}
      </div>
    </form>
  );
}
