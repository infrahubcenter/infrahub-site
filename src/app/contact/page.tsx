import type { Metadata } from "next";
import Link from "next/link";
import { Check, Mail } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PRODUCT_NAME, SALES_EMAIL } from "@/lib/product";

export const metadata: Metadata = {
  title: "Contact sales",
  description: `Talk to the ${PRODUCT_NAME} team about Team, Business and Enterprise plans.`,
};

export default function ContactPage() {
  return (
    <div className="page-container grid gap-12 py-16 lg:grid-cols-2 lg:gap-20">
      <div>
        <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">Contact sales</div>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">Let&apos;s size {PRODUCT_NAME} for your fleet</h1>
        <p className="mt-4 text-slate-500">
          Tell us what you run and we&apos;ll help you choose a plan, plan the rollout and get your first dashboards live.
        </p>
        <ul className="mt-8 space-y-3 text-sm">
          {[
            "Plan recommendation based on your VMs, clusters and databases",
            "Guided installation (Docker Compose or native Linux)",
            "Annual billing, invoicing and volume pricing",
            "Enterprise: custom limits, retention and SLA",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
              <span className="text-slate-600 dark:text-slate-300">{t}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">
          <Mail className="h-4 w-4" />
          <a href={`mailto:${SALES_EMAIL}`} className="font-medium text-slate-700 hover:underline dark:text-slate-200">
            {SALES_EMAIL}
          </a>
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Want to try it first?{" "}
          <Link href="/install" className="font-medium text-sky-600 hover:underline">
            Install the free Community plan
          </Link>
          .
        </p>
      </div>
      <ContactForm />
    </div>
  );
}
