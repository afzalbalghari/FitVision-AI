"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormField } from "@/components/forms/FormField";
import { PasswordStrength } from "@/components/forms/PasswordStrength";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signupSchema, type SignupValues } from "@/lib/validators";
import { getActionErrorMessage } from "@/services/api";
import { register as registerUser } from "@/services/auth";

export function SignupForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  const password = watch("password");

  async function onSubmit(values: SignupValues) {
    setServerError(null);
    try {
      await registerUser({ name: values.name, email: values.email, password: values.password });
      router.push("/onboarding");
    } catch (error) {
      setServerError(getActionErrorMessage(error, "Account creation"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <FormField id="name" label="Full name" error={errors.name?.message}>
        <Input
          id="name"
          autoComplete="name"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
          {...register("name")}
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
          {...register("email")}
        />
      </FormField>

      <FormField
        id="password"
        label="Password"
        error={errors.password?.message}
        hint="At least 8 characters, with a letter and a number."
      >
        <Input
          id="password"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? "password-error" : undefined}
          {...register("password")}
        />
      </FormField>
      <PasswordStrength password={password} />

      <FormField id="confirmPassword" label="Confirm password" error={errors.confirmPassword?.message}>
        <Input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          aria-invalid={!!errors.confirmPassword}
          aria-describedby={errors.confirmPassword ? "confirmPassword-error" : undefined}
          {...register("confirmPassword")}
        />
      </FormField>

      {serverError && (
        <p role="alert" className="rounded-xl border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">
          {serverError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
