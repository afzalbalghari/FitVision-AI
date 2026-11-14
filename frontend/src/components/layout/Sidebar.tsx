"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Logo } from "@/components/layout/Logo";
import { cn } from "@/lib/cn";
import { DASHBOARD_NAV } from "@/lib/navigation";

export function isActive(pathname: string, href: string): boolean {
  return href === "/dashboard" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col gap-8 px-4 py-6">
      <Link href="/" className="px-2" aria-label="FitVision AI home">
        <Logo />
      </Link>

      <nav aria-label="Dashboard" className="flex flex-col gap-1">
        {DASHBOARD_NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active ? "bg-accent/10 text-accent" : "text-muted hover:bg-surface-2 hover:text-ink",
              )}
            >
              <Icon size={18} aria-hidden />
              {label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
