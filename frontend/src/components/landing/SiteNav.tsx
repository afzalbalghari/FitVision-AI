import Link from "next/link";

import { Logo } from "@/components/layout/Logo";
import { buttonClasses } from "@/components/ui/Button";

const LINKS = [
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How it works" },
  { href: "#exercises", label: "Exercises" },
  { href: "#analytics", label: "Analytics" },
];

export function SiteNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" aria-label="FitVision AI home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted transition hover:text-ink">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className={buttonClasses("ghost")}>
            Sign in
          </Link>
          <Link href="/signup" className={buttonClasses("primary")}>
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}
