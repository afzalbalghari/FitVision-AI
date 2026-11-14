"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

import { isActive } from "@/components/layout/Sidebar";
import { DASHBOARD_NAV } from "@/lib/navigation";

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const pathname = usePathname();
  const current = DASHBOARD_NAV.find((item) => isActive(pathname, item.href));

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/90 px-4 backdrop-blur lg:px-8">
      <button
        type="button"
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
        className="flex h-10 w-10 items-center justify-center rounded-xl text-muted hover:bg-surface-2 hover:text-ink lg:hidden"
      >
        <Menu size={20} aria-hidden />
      </button>
      <span className="font-semibold">{current?.label ?? "Dashboard"}</span>
    </header>
  );
}
