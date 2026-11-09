import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/layout/Logo";

export interface AuthShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-6 py-8">
      <Link href="/" aria-label="FitVision AI home" className="w-fit">
        <Logo />
      </Link>

      <div className="flex flex-1 flex-col justify-center py-10">
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        <p className="mt-2 text-muted">{subtitle}</p>
        <div className="mt-8">{children}</div>
        <p className="mt-6 text-sm text-muted">{footer}</p>
      </div>
    </main>
  );
}
