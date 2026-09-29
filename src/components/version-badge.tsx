import { PRODUCT_VERSION, RELEASE_CHANNEL } from "@/lib/product";

export function VersionBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:border-slate-800 dark:text-slate-400 ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />v{PRODUCT_VERSION} · {RELEASE_CHANNEL}
    </span>
  );
}
