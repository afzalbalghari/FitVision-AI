import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { OnboardingForm } from "@/components/onboarding/OnboardingForm";

export const metadata: Metadata = { title: "Set up your profile · FitVision AI" };

export default function OnboardingPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-2xl px-6 py-8">
      <Link href="/" aria-label="FitVision AI home" className="inline-block">
        <Logo />
      </Link>

      <div className="py-10">
        <h1 className="text-3xl font-bold tracking-tight">Set up your training profile</h1>
        <p className="mt-2 max-w-lg text-muted">
          A few quick questions so your plan fits your goal and schedule. No health information is required, and you
          can change any answer later.
        </p>
        <div className="mt-10">
          <OnboardingForm />
        </div>
      </div>
    </main>
  );
}
