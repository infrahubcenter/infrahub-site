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
      <div className="page-container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
          <img src="/logo-icon.svg" alt="" className="h-8 w-8" />
          <span className="whitespace-nowrap font-semibold tracking-tight">{PRODUCT_NAME}</span>
          <span className="hidden md:inline-flex">
            <VersionBadge className="whitespace-nowrap" />
          </span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm font-medium text-slate-600 lg:flex dark:text-slate-300">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-md px-3 py-1.5 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <a href={`${APP_URL}/login`} className="hidden rounded-md px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 sm:inline-block dark:text-slate-200 dark:hover:bg-slate-800">
            Sign in
          </a>
          <Link href="/install" className="whitespace-nowrap rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-3 py-2 text-sm font-semibold sm:px-4 text-white shadow-sm shadow-sky-500/30 hover:from-sky-400 hover:to-indigo-400">
            Get started
          </Link>
        </div>
      </div>
      <nav className="page-container flex gap-5 overflow-x-auto border-t border-slate-200/70 py-2.5 text-sm font-medium text-slate-600 lg:hidden dark:border-slate-800/70 dark:text-slate-300">
        {LINKS.map((l) => (
          <Link key={l.href} href={l.href} className="shrink-0">
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
