import Link from "next/link";
import { APP_URL, PRODUCT_NAME } from "@/lib/product";
import { VersionBadge } from "./version-badge";

const LINKS = [
  { href: "/#features", label: "Features" },
  { href: "/#why-devops", label: "Why DevOps" },
  { href: "/#compare", label: "Compare" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/install", label: "Install" },
  { href: "/docs", label: "Docs" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-800/70 dark:bg-slate-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
          <img src="/logo-icon.svg" alt="" className="h-8 w-8" />
          <span className="font-semibold tracking-tight">{PRODUCT_NAME}</span>
          <VersionBadge className="hidden sm:inline-flex" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex dark:text-slate-300">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-slate-900 dark:hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={`${APP_URL}/login`} className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline-block dark:text-slate-200 dark:hover:bg-slate-800">
            Sign in
          </a>
          <Link href="/install" className="rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-500">
            Get started
          </Link>
        </div>
      </div>
      <nav className="flex gap-4 overflow-x-auto border-t border-slate-200/70 px-4 py-2 text-sm text-slate-600 md:hidden dark:border-slate-800/70 dark:text-slate-300">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
