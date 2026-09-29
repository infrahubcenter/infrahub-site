import { Check, Minus, X } from "lucide-react";
import { COMPARISON, COMPETITORS, type Support } from "@/lib/product";

function Cell({ v }: { v: Support }) {
  if (v === "yes") return <Check aria-label="Yes" className="mx-auto h-5 w-5 text-emerald-500" />;
  if (v === "partial") return <Minus aria-label="Partial" className="mx-auto h-5 w-5 text-amber-500" />;
  return <X aria-label="No" className="mx-auto h-5 w-5 text-slate-300 dark:text-slate-700" />;
}

export function ComparisonTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
              <th className="px-4 py-3 text-left font-medium text-slate-500">Capability</th>
              {COMPETITORS.map((c, i) => (
                <th key={c} className={`px-3 py-3 text-center font-semibold ${i === 0 ? "bg-sky-50 text-sky-700 dark:bg-sky-950/40 dark:text-sky-300" : ""}`}>
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={row.capability} className="border-b border-slate-100 last:border-0 dark:border-slate-800/60">
                <td className="px-4 py-3">
                  <div className="font-medium">{row.capability}</div>
                  {row.note && <div className="mt-0.5 text-xs text-slate-500">{row.note}</div>}
                </td>
                {row.values.map((v, i) => (
                  <td key={i} className={`px-3 py-3 ${i === 0 ? "bg-sky-50/60 dark:bg-sky-950/20" : ""}`}>
                    <Cell v={v} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-slate-500">
        <Check className="inline h-3.5 w-3.5 text-emerald-500" /> built in · <Minus className="inline h-3.5 w-3.5 text-amber-500" /> possible with add-ons,
        extra components or configuration · <X className="inline h-3.5 w-3.5 text-slate-400" /> not offered. Based on publicly documented core
        capabilities; editions, integrations and add-ons of other products vary. Trademarks belong to their respective owners.
      </p>
    </div>
  );
}
