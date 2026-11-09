import Link from "next/link";

import { PoseIllustration } from "@/components/landing/PoseIllustration";
import { buttonClasses } from "@/components/ui/Button";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.15fr_1fr]">
      <div>
        <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your Personal AI Fitness Coach
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">
          Train smarter with real-time exercise tracking, intelligent form feedback, personalized workouts, and
          performance analytics.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/signup" className={buttonClasses("primary", "lg")}>
            Get Started
          </Link>
          <a href="#features" className={buttonClasses("secondary", "lg")}>
            Explore Features
          </a>
        </div>
      </div>

      <figure className="mx-auto w-full max-w-sm rounded-3xl border border-line bg-surface p-6">
        <PoseIllustration />
        <figcaption className="mt-2 text-center text-sm text-muted">
          Body landmarks and joint angles drive every rep count and form score.
        </figcaption>
      </figure>
    </section>
  );
}
