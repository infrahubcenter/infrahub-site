"use client";

import { useEffect, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { CodeBlock } from "./code-block";
import { PLANS, PRODUCT_NAME, SALES_EMAIL } from "@/lib/product";

type Form = {
  name: string;
  email: string;
  company: string;
  plan: string;
  fleet: string;
  message: string;
};

const EMPTY: Form = { name: "", email: "", company: "", plan: "team", fleet: "1-25", message: "" };
const FLEET_SIZES = ["1-25", "26-100", "101-500", "500+"];

// A static site has no server to post to, so a submission opens the
// visitor's mail client with everything pre-filled, and always shows the
// same text on screen to copy -- it still works with no mail client set up.
export function ContactForm() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [sent, setSent] = useState<string | null>(null);

  useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get("plan");
    if (plan && PLANS.some((p) => p.id === plan)) setForm((f) => ({ ...f, plan }));
  }, []);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = "Please enter a valid work email.";
    if (!form.company.trim()) e.company = "Please enter your company.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;
    const planName = PLANS.find((p) => p.id === form.plan)?.name ?? form.plan;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Company: ${form.company}`,
      `Plan: ${planName}`,
      `Fleet size: ${form.fleet} hosts`,
      "",
      form.message || "(no message)",
    ].join("\n");
    const subject = `${PRODUCT_NAME} - ${planName} plan inquiry from ${form.company}`;
    window.location.href = `mailto:${SALES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(`To: ${SALES_EMAIL}\nSubject: ${subject}\n\n${body}`);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/30">
        <div className="flex items-center gap-2 font-semibold text-emerald-900 dark:text-emerald-200">
          <CheckCircle2 className="h-5 w-5" /> Your email is ready to send
        </div>
        <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-200/80">
          We opened your mail app with the details below. If nothing opened, copy this and send it to{" "}
          <a className="font-medium underline" href={`mailto:${SALES_EMAIL}`}>
            {SALES_EMAIL}
          </a>
          .
        </p>
        <CodeBlock code={sent} title="message" />
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setForm(EMPTY);
          }}
          className="mt-4 text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  const input =
    "mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-slate-700 dark:bg-slate-900";

  return (
    <form onSubmit={submit} noValidate className="space-y-4 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name" error={errors.name}>
          <input className={input} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </Field>
        <Field label="Work email" error={errors.email}>
          <input className={input} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        </Field>
      </div>
      <Field label="Company" error={errors.company}>
        <input className={input} value={form.company} onChange={(e) => set("company", e.target.value)} autoComplete="organization" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Plan">
          <select className={input} value={form.plan} onChange={(e) => set("plan", e.target.value)}>
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Fleet size (hosts)">
          <select className={input} value={form.fleet} onChange={(e) => set("fleet", e.target.value)}>
            {FLEET_SIZES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="What do you want to monitor? (optional)">
        <textarea className={`${input} min-h-28`} value={form.message} onChange={(e) => set("message", e.target.value)} />
      </Field>
      <button type="submit" className="w-full rounded-md bg-sky-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-sky-500">
        Contact sales
      </button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium">
      {label}
      {children}
      {error && <span className="mt-1 block text-xs font-normal text-red-600">{error}</span>}
    </label>
  );
}
