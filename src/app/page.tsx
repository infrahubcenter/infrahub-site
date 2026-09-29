import Link from "next/link";
import { ArrowRight, BookOpen, Check } from "lucide-react";
import { ComparisonTable } from "@/components/comparison-table";
import { Icon } from "@/components/icons";
import { Pricing } from "@/components/pricing";
import { VersionBadge } from "@/components/version-badge";
import {
  APP_URL,
  DEVOPS_BENEFITS,
  FAQ,
  FEATURES,
  PRODUCT_DESCRIPTION,
  PRODUCT_VERSION,
  RELEASE_NOTES,
} from "@/lib/product";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Coverage />
      <MonitoringAndLogging />
      <Section id="features" eyebrow="Platform" title="Everything a DevOps engineer reaches for, in one place">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Icon name={f.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-slate-500">{f.body}</p>
              <ul className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                {f.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section
        id="why-devops"
        eyebrow="Why DevOps teams choose it"
        title="A one-stop solution instead of a tool sprawl"
        subtitle="Most teams stitch together a metrics tool, a log tool, an SSH bastion, a patching script and a spreadsheet of who has access. Infra Hub Center puts them behind one inventory and one permission model."
        muted
      >
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DEVOPS_BENEFITS.map((b) => (
            <div key={b.title} className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <Icon name={b.icon} className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">{b.body}</p>
            </div>
          ))}
        </div>
        <BeforeAfter />
      </Section>

      <Section
        id="compare"
        eyebrow="Compare"
        title="How it stacks up"
        subtitle="Monitoring suites are great at metrics and logs. Infra Hub Center adds the day-to-day operations work -- patching, SSH, storage, access -- on the same platform."
      >
        <ComparisonTable />
      </Section>

      <Section
        id="pricing"
        eyebrow="Pricing"
        title="Simple, fleet-based pricing"
        subtitle="Priced by what you manage, not by how many gigabytes of logs you ingest. Start free, upgrade when your fleet grows."
        muted
      >
        <Pricing />
      </Section>

      <Section id="releases" eyebrow="Release notes" title={`What's new in v${PRODUCT_VERSION}`}>
        {RELEASE_NOTES.map((r) => (
          <div key={r.version} className="mx-auto max-w-3xl rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <VersionBadge />
              <span className="text-sm text-slate-500">{r.date}</span>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {r.items.map((i) => (
                <li key={i} className="flex gap-2">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-300">{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>

      <Section id="faq" eyebrow="FAQ" title="Questions DevOps engineers ask" muted>
        <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/40">
          {FAQ.map((f) => (
            <details key={f.q} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                {f.q}
                <span className="text-slate-400 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-slate-500">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <section className="px-4 py-20 sm:px-6">
        <div className="mx-auto max-w-4xl rounded-3xl bg-slate-900 px-6 py-14 text-center text-white dark:bg-slate-900 dark:ring-1 dark:ring-slate-800">
          <h2 className="text-3xl font-semibold tracking-tight">Run your whole fleet from one console</h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">Start on Community for free. No credit card, no ingest meter, no inbound ports.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/install" className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-400">
              Install now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`${APP_URL}/login`} className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium hover:bg-slate-800">
              Sign in to console
            </a>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-md border border-slate-700 px-5 py-2.5 text-sm font-medium hover:bg-slate-800">
              <BookOpen className="h-4 w-4" /> Read the docs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  muted,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  muted?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`px-4 py-20 sm:px-6 ${muted ? "bg-slate-50 dark:bg-slate-900/30" : ""}`}>
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">{eyebrow}</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-slate-500">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  return (
    <section className="grid-bg relative overflow-hidden px-4 pb-16 pt-16 sm:px-6 sm:pt-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <a href="#releases" className="inline-flex">
            <VersionBadge />
          </a>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
            Monitoring, logging and operations.{" "}
            <span className="bg-gradient-to-r from-sky-500 to-sky-700 bg-clip-text text-transparent">One console.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500">{PRODUCT_DESCRIPTION}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/install" className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-sky-500">
              Install free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-900">
              <BookOpen className="h-4 w-4" /> Documentation
            </Link>
          </div>
        </div>
        <ConsolePreview />
      </div>
    </section>
  );
}

// A static, illustrative rendering of the console -- mirrors the real
// sidebar's labels so the site and the product read the same way.
function ConsolePreview() {
  const nav = [
    "Operations Overview",
    "Workspaces",
    "Compute",
    "Database Observability",
    "Object Storage (S3)",
    "Infrastructure Monitoring",
    "Log Management",
    "Alerting & Incidents",
    "Access Control (RBAC)",
    "Audit Trail",
  ];
  const logs: [string, string, string][] = [
    ["12:04:31", "INFO", "api-gateway  GET /v1/orders 200 18ms"],
    ["12:04:32", "WARN", "payments     retrying upstream (attempt 2/3)"],
    ["12:04:33", "ERROR", "payments     upstream timeout after 5000ms"],
    ["12:04:33", "INFO", "worker-7     job 81422 completed"],
    ["12:04:35", "INFO", "api-gateway  GET /v1/cart 200 11ms"],
  ];
  const bars = [32, 41, 38, 52, 47, 63, 58, 71, 66, 88, 74, 61, 55, 49];
  return (
    <div className="mx-auto mt-16 max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex">
        <aside className="hidden w-56 shrink-0 flex-col bg-slate-900 p-3 text-xs text-slate-400 md:flex">
          <div className="mb-3 flex items-center gap-2 px-2 py-1.5 font-semibold text-white">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
            <img src="/logo-icon.svg" alt="" className="h-5 w-5" /> Infra Hub Center
          </div>
          {nav.map((n, i) => (
            <div key={n} className={`rounded px-2 py-1.5 ${i === 5 ? "bg-slate-800 text-white" : ""}`}>
              {n}
            </div>
          ))}
          <div className="mt-auto flex justify-between border-t border-slate-800/60 px-2 pt-2 text-[10px] text-slate-600">
            <span>v{PRODUCT_VERSION}</span>
            <span className="text-slate-700">Team</span>
          </div>
        </aside>
        <div className="min-w-0 flex-1 p-4 sm:p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Docker Monitoring · prod-cluster-01</div>
            <div className="flex gap-1 text-[11px]">
              {["Live", "30s", "1m", "5m"].map((r, i) => (
                <span key={r} className={`rounded px-2 py-0.5 ${i === 0 ? "bg-sky-600 text-white" : "border border-slate-200 text-slate-500 dark:border-slate-800"}`}>
                  {r}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["Containers", "48 running"],
              ["CPU", "61%"],
              ["Memory", "12.4 / 32 GB"],
              ["Active alerts", "1 critical"],
            ].map(([k, v]) => (
              <div key={k} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <div className="text-[11px] text-slate-500">{k}</div>
                <div className={`mt-1 text-sm font-semibold ${k === "Active alerts" ? "text-red-500" : ""}`}>{v}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-2">
            <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
              <div className="text-[11px] text-slate-500">CPU · payments</div>
              <div className="mt-3 flex h-28 items-end gap-1">
                {bars.map((h, i) => (
                  <div key={i} className={`flex-1 rounded-t ${h > 80 ? "bg-red-400" : "bg-sky-500/80"}`} style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>
            <div className="rounded-lg bg-slate-950 p-3 font-mono text-[11px] leading-5 text-slate-300 ring-1 ring-slate-800">
              <div className="mb-1 text-slate-500">Docker Log Explorer · payments</div>
              {logs.map(([t, lvl, msg]) => (
                <div key={t + msg} className="truncate">
                  <span className="text-slate-600">{t}</span>{" "}
                  <span className={lvl === "ERROR" ? "text-red-400" : lvl === "WARN" ? "text-amber-400" : "text-emerald-400"}>{lvl.padEnd(5)}</span>{" "}
                  {msg}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Coverage() {
  const items = ["Linux VMs", "Docker", "Kubernetes", "PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "Valkey", "AWS S3", "MinIO", "DigitalOcean Spaces"];
  return (
    <section className="border-y border-slate-200 px-4 py-8 sm:px-6 dark:border-slate-800">
      <div className="mx-auto max-w-7xl text-center">
        <div className="text-xs font-medium uppercase tracking-wider text-slate-400">Covers your whole stack</div>
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-slate-500">
          {items.map((i) => (
            <span key={i}>{i}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MonitoringAndLogging() {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">Monitoring + Logging</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">See the spike. Read the log. Fix it. Same screen.</h2>
          <p className="mt-4 text-slate-500">
            Most outages are diagnosed by jumping between a metrics tool and a log tool, re-typing the same host and container names.
            Infra Hub Center binds both to the same inventory, so every dashboard already knows where its logs live.
          </p>
          <ul className="mt-6 space-y-3 text-sm">
            {[
              "Live Docker & Kubernetes dashboards, organized into folders per team",
              "Real-time container, pod and systemd journal logs with severity highlighting",
              "Threshold alerts with in-app, email and webhook delivery",
              "Grant developers read-only Monitoring or Logs -- one dashboard at a time",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                <span className="text-slate-600 dark:text-slate-300">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["3", "agents, one outbound WebSocket each"],
            ["0", "inbound ports opened on monitored hosts"],
            ["6", "database engines monitored natively"],
            ["1", "permission model across metrics, logs and ops"],
          ].map(([n, l]) => (
            <div key={l} className="rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
              <div className="text-4xl font-semibold tracking-tight text-sky-600 dark:text-sky-400">{n}</div>
              <div className="mt-2 text-sm text-slate-500">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  const before = ["Metrics tool", "Log aggregation tool", "SSH bastion / jump host", "Patching scripts & cron", "DB monitoring add-on", "Access spreadsheet"];
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-dashed border-slate-300 p-6 dark:border-slate-700">
        <div className="text-sm font-semibold text-slate-500">Without Infra Hub Center</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {before.map((b) => (
            <span key={b} className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              {b}
            </span>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-500">6 logins, 6 permission models, 6 bills -- and no shared view of the fleet.</p>
      </div>
      <div className="rounded-2xl border border-sky-300 bg-sky-50 p-6 dark:border-sky-900 dark:bg-sky-950/30">
        <div className="text-sm font-semibold text-sky-700 dark:text-sky-300">With Infra Hub Center</div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-sky-600 px-3 py-1.5 text-sm font-medium text-white">
          {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
          <img src="/logo-icon.svg" alt="" className="h-4 w-4" /> One console
        </div>
        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
          One inventory, one RBAC model, one audit trail, one predictable plan -- covering monitoring, logging and operations.
        </p>
      </div>
    </div>
  );
}
