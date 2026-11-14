import Link from "next/link";

import { Logo } from "@/components/layout/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-sm text-muted">
            Form scores and feedback are training guidance, not medical advice. Talk to a qualified professional about
            health concerns.
          </p>
        </div>
        <nav aria-label="Footer" className="flex gap-6 text-sm text-muted">
          <a href="#features" className="hover:text-ink">
            Features
          </a>
          <a href="#exercises" className="hover:text-ink">
            Exercises
          </a>
          <Link href="/login" className="hover:text-ink">
            Sign in
          </Link>
          <Link href="/signup" className="hover:text-ink">
            Sign up
          </Link>
        </nav>
      </div>
      <p className="border-t border-line py-4 text-center text-xs text-muted">© 2026 FitVision AI</p>
    </footer>
  );
}
