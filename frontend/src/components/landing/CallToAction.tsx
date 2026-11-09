import Link from "next/link";

import { buttonClasses } from "@/components/ui/Button";

export function CallToAction() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="rounded-3xl border border-accent-dim/60 bg-accent/5 px-8 py-14 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Start your first tracked workout</h2>
        <p className="mx-auto mt-3 max-w-md text-muted">Create an account, answer a few questions, and train in front of your camera.</p>
        <Link href="/signup" className={buttonClasses("primary", "lg", "mt-8")}>
          Create your account
        </Link>
      </div>
    </section>
  );
}
