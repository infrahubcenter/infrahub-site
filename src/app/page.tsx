import Link from "next/link";
import { ArrowRight, BookOpen, Check, X } from "lucide-react";
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
      <StatsBand />

      <Section id="features" eyebrow="Platform" title="Everything a DevOps engineer reaches for, in one place">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((f) => (
            <div key={f.title} className="card-lift rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-indigo-500 text-white shadow-md shadow-sky-500/20">
                <Icon name={f.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{f.body}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-slate-600 dark:text-slate-300">
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
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {DEVOPS_BENEFITS.map((b) => (
            <div key={b.title} className="card-lift rounded-2xl border border-slate-200 bg-white p-7 dark:border-slate-800 dark:bg-slate-900/60">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300">
                <Icon name={b.icon} className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-base font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">{b.body}</p>
            </div>
          ))}
        </div>
        <BeforeAfter />
      </Section>

      <Section
        id="compare"
        eyebrow="Compare"
        title="How it stacks up"
        subtitle="Monitoring suites are great at metrics and logs. Infra Hub Center adds the day-to-day operations work — patching, SSH, storage, access — on the same platform."
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

      <section className="py-20 sm:py-24">
        <div className="page-container grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div id="releases" className="scroll-mt-24">
            <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">Release notes</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">What&apos;s new in v{PRODUCT_VERSION}</h2>
            {RELEASE_NOTES.map((r) => (
              <div key={r.version} className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <VersionBadge />
                  <span className="text-sm text-slate-500">{r.date}</span>
                </div>
                <ul className="mt-4 space-y-2.5 text-sm">
                  {r.items.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                      <span className="text-slate-600 dark:text-slate-300">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div id="faq" className="scroll-mt-24">
            <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">FAQ</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Questions DevOps engineers ask</h2>
            <div className="mt-8 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900/40">
              {FAQ.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
                    {f.q}
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-transform group-open:rotate-45 dark:bg-slate-800">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="brand-band relative overflow-hidden text-white">
        <div className="grid-bg absolute inset-0 opacity-40" aria-hidden />
        <div className="page-container relative flex flex-col items-start justify-between gap-8 py-16 sm:py-20 lg:flex-row lg:items-center">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Run your whole fleet from one console</h2>
            <p className="mt-3 text-lg text-sky-100">Start on Community for free. No credit card, no ingest meter, no inbound ports.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/install" className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-sky-700 shadow-lg hover:bg-sky-50">
              Install now <ArrowRight className="h-4 w-4" />
            </Link>
            <a href={`${APP_URL}/login`} className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10">
              Sign in to console
            </a>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold hover:bg-white/10">
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
    <section id={id} className={`py-20 sm:py-24 ${muted ? "bg-slate-50 dark:bg-slate-900/30" : ""}`}>
      <div className="page-container">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">{eyebrow}</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400 sm:text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function Hero() {
  const trust = ["Self-hosted", "Docker & Kubernetes ready", "amd64 + arm64 images", "Free Community plan"];
  return (
    <section className="hero-bg relative overflow-hidden text-white">
      <div className="page-container grid grid-cols-[minmax(0,1fr)] items-center gap-12 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10 lg:pb-24 xl:gap-16">
        <div className="min-w-0 text-center lg:text-left">
          <a href="#releases" className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-sky-200 backdrop-blur hover:bg-white/10">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> v{PRODUCT_VERSION} is out — see what&apos;s new <ArrowRight className="h-3 w-3" />
          </a>
          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl xl:text-6xl 2xl:text-7xl">
            Monitoring, logging and operations. <span className="text-gradient">One console.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-300 lg:mx-0">{PRODUCT_DESCRIPTION}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Link
              href="/install"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:to-indigo-400"
            >
              Install free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/docs" className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
              <BookOpen className="h-4 w-4" /> Documentation
            </Link>
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-slate-300 lg:justify-start">
            {trust.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-400" /> {t}
              </li>
            ))}
          </ul>
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
  const bars = [32, 41, 38, 52, 47, 63, 58, 71, 66, 88, 74, 61, 55, 49, 44, 52];
  return (
    <div className="relative min-w-0">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-sky-500/30 to-indigo-500/30 blur-2xl" aria-hidden />
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white text-slate-900 shadow-2xl shadow-black/40 dark:bg-slate-950 dark:text-slate-100">
        <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-900">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <span className="ml-3 truncate rounded-md bg-white px-2 py-0.5 font-mono text-[11px] text-slate-400 dark:bg-slate-800">
            infrahub.example.com/monitoring/docker
          </span>
        </div>
        <div className="flex">
          <aside className="hidden w-48 shrink-0 flex-col bg-slate-900 p-3 text-xs text-slate-400 xl:flex">
            <div className="mb-3 flex items-center gap-2 px-2 py-1.5 font-semibold text-white">
              {/* eslint-disable-next-line @next/next/no-img-element — static SVG mark */}
              <img src="/logo-icon.svg" alt="" className="h-5 w-5" /> Infra Hub Center
            </div>
            {nav.map((n, i) => (
              <div key={n} className={`truncate rounded px-2 py-1.5 ${i === 5 ? "bg-slate-800 text-white" : ""}`}>
                {n}
              </div>
            ))}
            <div className="mt-auto flex justify-between border-t border-slate-800/60 px-2 pt-2 text-[10px] text-slate-600">
              <span>v{PRODUCT_VERSION}</span>
              <span className="text-slate-700">Team</span>
            </div>
          </aside>
          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
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
                ["Containers", "48 running", ""],
                ["CPU", "61%", ""],
                ["Memory", "12.4 / 32 GB", ""],
                ["Active alerts", "1 critical", "text-red-500"],
              ].map(([k, v, c]) => (
                <div key={k} className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                  <div className="text-[11px] text-slate-500">{k}</div>
                  <div className={`mt-1 text-sm font-semibold ${c}`}>{v}</div>
                </div>
              ))}
            </div>
            <div className="mt-4 grid grid-cols-[minmax(0,1fr)] gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3 dark:border-slate-800">
                <div className="text-[11px] text-slate-500">CPU · payments</div>
                <div className="mt-3 flex h-28 items-end gap-1">
                  {bars.map((h, i) => (
                    <div key={i} className={`flex-1 rounded-t ${h > 80 ? "bg-red-400" : "bg-gradient-to-t from-sky-600 to-sky-400"}`} style={{ height: `${h}%` }} />
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
    </div>
  );
}

function Coverage() {
  const items = ["Linux VMs", "Docker", "Kubernetes", "PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Redis", "Valkey", "AWS S3", "MinIO", "DigitalOcean Spaces"];
  return (
    <section className="border-b border-slate-200 bg-white py-10 dark:border-slate-800 dark:bg-slate-950">
      <div className="page-container flex flex-col items-center gap-5 lg:flex-row lg:gap-10">
        <div className="shrink-0 text-xs font-semibold uppercase tracking-wider text-slate-400">Covers your whole stack</div>
        <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
          {items.map((i) => (
            <span key={i} className="rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-sm font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
              {i}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function MonitoringAndLogging() {
  return (
    <section className="py-20 sm:py-24">
      <div className="page-container grid gap-12 lg:grid-cols-2 lg:items-center xl:gap-20">
        <div>
          <div className="text-sm font-semibold text-sky-600 dark:text-sky-400">Monitoring + Logging</div>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl xl:text-5xl">See the spike. Read the log. Fix it. Same screen.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-500 dark:text-slate-400">
            Most outages are diagnosed by jumping between a metrics tool and a log tool, re-typing the same host and container names.
            Infra Hub Center binds both to the same inventory, so every dashboard already knows where its logs live.
          </p>
          <ul className="mt-7 space-y-3.5">
            {[
              "Live Docker & Kubernetes dashboards, organized into folders per team",
              "Real-time container, pod and systemd journal logs with severity highlighting",
              "Threshold alerts with in-app, email and webhook delivery",
              "Grant developers read-only Monitoring or Logs — one dashboard at a time",
            ].map((t) => (
              <li key={t} className="flex gap-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950">
                  <Check className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                </span>
                <span className="text-slate-600 dark:text-slate-300">{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["Metrics", "CPU, memory, disk, network, container and pod stats", "Activity"],
            ["Logs", "Docker, Kubernetes and systemd journal, live-tailed", "FileText"],
            ["Alerts", "Thresholds with recovery, ack and suppression", "Bell"],
            ["Access", "Workspace, resource, folder or dashboard scopes", "ShieldCheck"],
          ].map(([t, d, icon]) => (
            <div key={t} className="card-lift rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-sky-50 p-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/40">
              <Icon name={icon} className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              <div className="mt-4 text-lg font-semibold">{t}</div>
              <div className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  const stats = [
    ["3", "agents, one outbound WebSocket each"],
    ["0", "inbound ports opened on monitored hosts"],
    ["6", "database engines monitored natively"],
    ["1", "permission model across metrics, logs and ops"],
  ];
  return (
    <section className="brand-band text-white">
      <div className="page-container grid grid-cols-2 gap-8 py-14 lg:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="text-center lg:text-left">
            <div className="text-5xl font-semibold tracking-tight sm:text-6xl">{n}</div>
            <div className="mt-2 text-sm text-sky-100 sm:text-base">{l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function BeforeAfter() {
  const before = ["Metrics tool", "Log aggregation tool", "SSH bastion / jump host", "Patching scripts & cron", "DB monitoring add-on", "Access spreadsheet"];
  return (
    <div className="mt-12 grid gap-5 lg:grid-cols-2">
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-7 dark:border-slate-700 dark:bg-slate-900/40">
        <div className="text-sm font-semibold text-slate-500">Without Infra Hub Center</div>
        <div className="mt-4 flex flex-wrap gap-2">
          {before.map((b) => (
            <span key={b} className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900">
              <X className="h-3.5 w-3.5 text-red-400" /> {b}
            </span>
          ))}
        </div>
        <p className="mt-5 text-sm text-slate-500">6 logins, 6 permission models, 6 bills — and no shared view of the fleet.</p>
      </div>
      <div className="rounded-2xl bg-gradient-to-br from-sky-600 to-indigo-600 p-7 text-white shadow-lg shadow-sky-600/20">
        <div className="text-sm font-semibold text-sky-100">With Infra Hub Center</div>
        <div className="mt-4 inline-flex items-center gap-2 rounded-md bg-white/15 px-3 py-1.5 text-sm font-medium backdrop-blur">
          {/* eslint-disable-next-line @next/next/no-img-element — static SVG mark */}
          <img src="/logo-icon.svg" alt="" className="h-4 w-4" /> One console
        </div>
        <p className="mt-5 text-sm leading-6 text-sky-50">
          One inventory, one RBAC model, one audit trail, one predictable plan — covering monitoring, logging and operations.
        </p>
      </div>
    </div>
  );
}
