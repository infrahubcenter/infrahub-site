// Single source of truth for everything the marketing site says about the
// product. Version and plans mirror infrahub-ui (src/lib/branding.ts and
// src/lib/plans.ts) -- bump/edit both together on each release.

export const PRODUCT_NAME = "Infra Hub Center";
export const PRODUCT_TAGLINE = "The one-stop operations platform for DevOps engineers";
export const PRODUCT_DESCRIPTION =
  "Monitoring, log management, patching and access control for VMs, Docker, Kubernetes, databases and object storage -- self-hosted, in one console.";

export const PRODUCT_VERSION = "1.0.0";
export const RELEASE_CHANNEL = "Stable";
export const RELEASE_DATE = "September 2026";

// Local dev default is the dev proxy (dev-proxy.mjs), which serves the
// console and API on one origin. Set NEXT_PUBLIC_APP_URL in production.
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:4000";

export const SALES_EMAIL = "infrahubcenter@gmail.com";

export type Feature = {
  icon: string;
  title: string;
  body: string;
  points: string[];
};

// `icon` is a lucide-react icon name, resolved in components/icons.tsx.
export const FEATURES: Feature[] = [
  {
    icon: "Activity",
    title: "Infrastructure Monitoring",
    body: "Live dashboards for Docker hosts and Kubernetes clusters, organized into folders and scoped per team.",
    points: ["Containers, images, volumes, networks", "Nodes, pods, namespaces, cluster totals", "Live / 10s / 30s / 1m / 5m refresh"],
  },
  {
    icon: "FileText",
    title: "Log Management",
    body: "Stream container, pod and systemd journal logs in real time -- colorized and badged by severity.",
    points: ["Docker & Kubernetes Log Explorer", "VM journal logs via the VM Agent", "Full-screen, resizable, reconnect-safe"],
  },
  {
    icon: "Cpu",
    title: "Compute & Patch Management",
    body: "Register VMs over SSH, open a browser terminal, scan packages and roll out OS updates with controlled reboots.",
    points: ["Web SSH console (xterm.js)", "Update plans & reboot orchestration", "Installed-since-onboarding drift view"],
  },
  {
    icon: "Database",
    title: "Database Observability",
    body: "Health, performance and query insight for PostgreSQL, MySQL, MariaDB, MongoDB, Redis and Valkey.",
    points: ["Connection health & performance", "Table browser & logs", "Admin-only templated remediation"],
  },
  {
    icon: "Archive",
    title: "Object Storage (S3)",
    body: "Connect AWS S3, DigitalOcean Spaces, MinIO or any S3-compatible bucket to monitor and browse it.",
    points: ["Health & growth projection", "Security posture checks", "Folder/object browser with previews"],
  },
  {
    icon: "Bell",
    title: "Alerting & Incidents",
    body: "Threshold rules on any collected metric with recovery thresholds, acknowledgement and suppression.",
    points: ["In-app, email (SMTP) & webhook channels", "Anti-flapping recovery thresholds", "Per-user notification muting"],
  },
  {
    icon: "ShieldCheck",
    title: "Access Control (RBAC)",
    body: "Owner / Admin / Member roles with Workspace, resource, folder and dashboard-level grants.",
    points: ["GitHub & Google sign-in", "Least-privilege Monitoring/Logs grants", "Backend-enforced on every request"],
  },
  {
    icon: "ScrollText",
    title: "Audit Trail",
    body: "An append-only record of logins, role changes, grants, configuration edits and operations.",
    points: ["Console sessions logged open/close only", "Filter by actor, action, resource", "Built for compliance reviews"],
  },
];

export const DEVOPS_BENEFITS = [
  {
    icon: "Layers",
    title: "Replace 5+ tools with one",
    body: "Metrics, logs, SSH access, patching, database insight and alerting normally live in separate products with separate logins. Here they share one inventory, one permission model and one UI.",
  },
  {
    icon: "Zap",
    title: "Minutes to first dashboard",
    body: "Agents connect out over a WebSocket -- no inbound ports, no exporters to wire up. Copy one docker run or kubectl apply command and data starts flowing.",
  },
  {
    icon: "Search",
    title: "Metrics and logs side by side",
    body: "When a container spikes, the logs for that exact container are one click away -- no context switch, no query language to remember during an incident.",
  },
  {
    icon: "Lock",
    title: "Your data stays on your network",
    body: "Fully self-hosted. Secrets are AES-256-GCM encrypted at rest, and every API call is authorized server-side regardless of what the UI shows.",
  },
  {
    icon: "Wallet",
    title: "Predictable, flat pricing",
    body: "No per-GB ingest bills that explode during an outage. Plans are priced by fleet size, so a noisy week never becomes a surprise invoice.",
  },
  {
    icon: "Users",
    title: "Safe to hand to the whole team",
    body: "Give developers read-only Monitoring or Logs on just their dashboards, while Admins keep patching, reboots and remediation.",
  },
];

export type Support = "yes" | "partial" | "no";

export const COMPETITORS = ["Infra Hub Center", "Datadog", "New Relic", "Grafana + Prometheus + Loki", "ELK Stack", "Zabbix"] as const;

export const COMPARISON: { capability: string; values: Support[]; note?: string }[] = [
  { capability: "Self-hosted / data stays in your network", values: ["yes", "no", "no", "yes", "yes", "yes"] },
  { capability: "Metrics and logs in one UI", values: ["yes", "yes", "yes", "partial", "partial", "partial"], note: "Grafana needs Prometheus + Loki wired together; ELK and Zabbix center on one of the two." },
  { capability: "Docker & Kubernetes monitoring", values: ["yes", "yes", "yes", "partial", "partial", "partial"], note: "Partial = requires separately deployed exporters/beats or templates." },
  { capability: "Built-in database monitoring", values: ["yes", "yes", "yes", "partial", "partial", "yes"] },
  { capability: "OS patch management & controlled reboots", values: ["yes", "no", "no", "no", "no", "no"] },
  { capability: "Browser SSH console", values: ["yes", "no", "no", "no", "no", "no"] },
  { capability: "S3 object storage browser", values: ["yes", "no", "no", "no", "no", "no"] },
  { capability: "Folder/dashboard-level RBAC", values: ["yes", "yes", "yes", "partial", "partial", "partial"] },
  { capability: "Single agent-per-target setup", values: ["yes", "yes", "yes", "no", "no", "partial"] },
  { capability: "Flat pricing (no per-GB ingest)", values: ["yes", "no", "no", "yes", "yes", "yes"], note: "Open-source stacks have no license fee but carry their own operating cost." },
];

export type PlanLimits = {
  vms: number | null;
  databases: number | null;
  objectStorage: number | null;
  dockerHosts: number | null;
  k8sClusters: number | null;
  users: number | null;
};

export type Plan = {
  id: string;
  name: string;
  priceMonthly: number | null;
  priceAnnual: number | null;
  tagline: string;
  limits: PlanLimits;
  metricsRetentionDays: number | null;
  logRetentionDays: number | null;
  features: string[];
  highlighted?: boolean;
};

export const LIMIT_LABELS: Record<keyof PlanLimits, string> = {
  vms: "Virtual Machines",
  databases: "Databases",
  objectStorage: "Object Storage Buckets",
  dockerHosts: "Docker Hosts",
  k8sClusters: "Kubernetes Clusters",
  users: "Users",
};

export const PLANS: Plan[] = [
  {
    id: "community",
    name: "Community",
    priceMonthly: 0,
    priceAnnual: 0,
    tagline: "For individuals and small labs getting started.",
    limits: { vms: 5, databases: 2, objectStorage: 1, dockerHosts: 2, k8sClusters: 1, users: 3 },
    metricsRetentionDays: 7,
    logRetentionDays: 3,
    features: ["VM inventory & web SSH console", "Docker & Kubernetes monitoring", "Live log tailing", "Threshold alerts", "Community support"],
  },
  {
    id: "team",
    name: "Team",
    priceMonthly: 49,
    priceAnnual: 39,
    tagline: "For growing DevOps teams running production workloads.",
    limits: { vms: 25, databases: 10, objectStorage: 5, dockerHosts: 10, k8sClusters: 3, users: 15 },
    metricsRetentionDays: 30,
    logRetentionDays: 14,
    features: ["Everything in Community", "Patch management & controlled reboots", "Database performance insights", "Email (SMTP) notifications", "Email support"],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    priceMonthly: 199,
    priceAnnual: 159,
    tagline: "For organizations standardizing on one ops platform.",
    limits: { vms: 100, databases: 50, objectStorage: 25, dockerHosts: 50, k8sClusters: 15, users: null },
    metricsRetentionDays: 90,
    logRetentionDays: 30,
    features: ["Everything in Team", "GitHub & Google sign-in (SSO)", "Audit trail & access-grant scopes", "Database remediation operations", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    priceMonthly: null,
    priceAnnual: null,
    tagline: "For large fleets with compliance and custom needs.",
    limits: { vms: null, databases: null, objectStorage: null, dockerHosts: null, k8sClusters: null, users: null },
    metricsRetentionDays: null,
    logRetentionDays: null,
    features: ["Everything in Business", "Unlimited resources", "Custom retention", "Dedicated success engineer", "SLA & onboarding assistance"],
  },
];

export const RELEASE_NOTES: { version: string; date: string; items: string[] }[] = [
  {
    version: "1.0.0",
    date: RELEASE_DATE,
    items: [
      "Plans & Billing with live usage meters against plan limits",
      "Industry-standard navigation: Compute, Infrastructure Monitoring, Log Management, Access Control (RBAC)",
      "Docker & Kubernetes Log Explorer with severity badges",
      "Database remediation operations (Admin-only, templated)",
      "Audit Trail across every security-relevant action",
    ],
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is Infra Hub Center SaaS or self-hosted?",
    a: "Self-hosted. It runs as a Go API, a Next.js console and PostgreSQL -- via Docker Compose or your own orchestration. Your metrics, logs and credentials never leave your network.",
  },
  {
    q: "Do I need to open inbound ports on monitored hosts?",
    a: "No. The Docker, Kubernetes and VM agents connect out to the backend over a WebSocket with a per-resource token. SSH-based features (console, patching) use the SSH credential you register.",
  },
  {
    q: "Which Linux distributions are supported?",
    a: "The platform runs anywhere Docker runs, or natively on Ubuntu/Debian (apt), RHEL, Rocky, AlmaLinux, Fedora and Amazon Linux 2023 (dnf). The VM Agent also installs natively on CentOS 7 / Amazon Linux 2 (yum) and SUSE (zypper). See the installation guide.",
  },
  {
    q: "What counts toward plan limits?",
    a: "Registered Virtual Machines, Databases, Object Storage buckets, Docker Hosts, Kubernetes clusters, and user accounts. Containers, pods, dashboards and log volume are not metered.",
  },
  {
    q: "Can I give developers access without giving them admin?",
    a: "Yes. Members only see what is explicitly granted -- a Workspace, a single resource, or read-only Monitoring/Logs on specific folders or dashboards.",
  },
  {
    q: "How do upgrades work?",
    a: "Change plan at any time; limits apply immediately. Annual billing saves roughly 20%. Enterprise includes custom limits and retention.",
  },
];
