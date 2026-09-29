"use client";

import { useState, type ReactNode } from "react";

export type Tab = { id: string; label: string; hint?: string; content: ReactNode };

export function Tabs({ tabs, variant = "pill" }: { tabs: Tab[]; variant?: "pill" | "underline" }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <div>
      <div
        role="tablist"
        className={
          variant === "pill"
            ? "flex flex-wrap gap-2"
            : "flex gap-1 overflow-x-auto border-b border-slate-200 dark:border-slate-800"
        }
      >
        {tabs.map((t) => {
          const on = t.id === current?.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => setActive(t.id)}
              className={
                variant === "pill"
                  ? `rounded-lg border px-3 py-2 text-left text-sm transition-colors ${
                      on
                        ? "border-sky-500 bg-sky-50 text-sky-800 dark:bg-sky-950/40 dark:text-sky-200"
                        : "border-slate-200 text-slate-600 hover:border-slate-300 dark:border-slate-800 dark:text-slate-300"
                    }`
                  : `-mb-px shrink-0 border-b-2 px-3 py-2 text-sm font-medium ${
                      on ? "border-sky-500 text-sky-700 dark:text-sky-300" : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                    }`
              }
            >
              <span className="block font-medium">{t.label}</span>
              {t.hint && variant === "pill" && <span className="block text-[11px] text-slate-500">{t.hint}</span>}
            </button>
          );
        })}
      </div>
      <div role="tabpanel" className="mt-4">
        {current?.content}
      </div>
    </div>
  );
}
