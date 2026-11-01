import { ExternalLink } from "lucide-react";

import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { Logo } from "@/components/layout/Logo";
import { API_URL } from "@/lib/config";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
      <header>
        <Logo />
      </header>

      <section className="flex flex-1 flex-col items-start justify-center gap-8 py-16">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Foundation is running.</h1>
          <p className="mt-4 text-lg text-muted">
            Phase 1 sets up the frontend, the API and the database connection. The landing page, sign-up and
            dashboard arrive in Phase 2.
          </p>
        </div>

        <SystemStatus />

        <a
          href={`${API_URL}/docs`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink"
        >
          Open API documentation <ExternalLink size={14} aria-hidden />
        </a>
      </section>
    </main>
  );
}
