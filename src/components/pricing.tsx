"use client";

import Link from "next/link";
import { useState } from "react";
import { Check } from "lucide-react";
import { LIMIT_LABELS, PLANS, formatINR, type PlanLimits } from "@/lib/product";

const LIMIT_KEYS = Object.keys(LIMIT_LABELS) as (keyof PlanLimits)[];

function fmt(n: number | null) {
  return n === null ? "Unlimited" : String(n);
}

export function Pricing() {
  const [annual, setAnnual] = useState(true);

  return (
    <div>
      <div className="flex justify-center">
        <div className="inline-flex rounded-full border border-slate-200 p-1 text-sm dark:border-slate-800">
          {[false, true].map((a) => (
            <button
              key={String(a)}
              type="button"
              onClick={() => setAnnual(a)}
              className={`rounded-full px-4 py-1.5 font-medium transition-colors ${
                annual === a ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "text-slate-500"
              }`}
            >
              {a ? "Annual (save 20%)" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {PLANS.map((plan) => {
          const price = annual ? plan.priceAnnual : plan.priceMonthly;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-2xl border p-6 ${
                plan.highlighted
                  ? "border-sky-500 bg-sky-50/50 ring-1 ring-sky-500 dark:bg-sky-950/20"
                  : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900/40"
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-6 rounded-full bg-sky-600 px-2.5 py-0.5 text-xs font-medium text-white">Most popular</span>
              )}
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-slate-500">{plan.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-4xl font-semibold tracking-tight">
                  {price === null ? "Custom" : price === 0 ? "Free" : formatINR(price)}
                </span>
                {price ? <span className="text-sm text-slate-500">/ month</span> : null}
              </div>
              <p className="mt-1 h-4 text-xs text-slate-400">{price ? (annual ? "billed annually, + GST" : "+ GST") : ""}</p>

              <Link
                href={plan.priceMonthly === 0 ? "/install" : `/contact?plan=${plan.id}`}
                className={`mt-6 rounded-md px-4 py-2 text-center text-sm font-medium ${
                  plan.highlighted
                    ? "bg-sky-600 text-white hover:bg-sky-500"
                    : "border border-slate-300 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                }`}
              >
                {plan.priceMonthly === null ? "Contact sales" : plan.priceMonthly === 0 ? "Install free" : `Choose ${plan.name}`}
              </Link>

              <dl className="mt-6 space-y-2 border-t border-slate-200 pt-6 text-sm dark:border-slate-800">
                {LIMIT_KEYS.map((k) => (
                  <div key={k} className="flex justify-between gap-2">
                    <dt className="text-slate-500">{LIMIT_LABELS[k]}</dt>
                    <dd className="font-medium">{fmt(plan.limits[k])}</dd>
                  </div>
                ))}
                <div className="flex justify-between gap-2">
                  <dt className="text-slate-500">Metrics / log retention</dt>
                  <dd className="font-medium">
                    {plan.metricsRetentionDays === null ? "Custom" : `${plan.metricsRetentionDays}d / ${plan.logRetentionDays}d`}
                  </dd>
                </div>
              </dl>

              <ul className="mt-6 space-y-2 text-sm">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    <span className="text-slate-600 dark:text-slate-300">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
