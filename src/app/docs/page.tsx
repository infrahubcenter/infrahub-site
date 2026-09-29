import type { Metadata } from "next";
import { VersionBadge } from "@/components/version-badge";
import { PRODUCT_NAME, PRODUCT_VERSION } from "@/lib/product";

export const metadata: Metadata = {
  title: "Documentation",
  description: `How to install, configure and use ${PRODUCT_NAME}.`,
};

const TOC = [
  ["overview", "Overview"],
  ["quick-start", "Quick start"],
  ["architecture", "Architecture"],
  ["agents", "Agents"],
  ["modules", "Modules"],
  ["rbac", "Roles & access control"],
  ["alerting", "Alerting & notifications"],
  ["security", "Security"],
  ["plans", "Plans & limits"],
  ["versioning", "Versioning"],
] as const;

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-14 scroll-mt-24 border-b border-slate-200 pb-2 text-2xl font-semibold tracking-tight first:mt-0 dark:border-slate-800">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-8 font-semibold">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">{children}</p>;
}
function Ul({ children }: { children: React.ReactNode }) {
  return <ul className="mt-3 ml-5 list-disc space-y-1.5 leading-7 text-slate-600 dark:text-slate-300">{children}</ul>;
}
function Code({ children }: { children: string }) {
  return (
    <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-950 p-4 font-mono text-[13px] leading-6 text-slate-200 ring-1 ring-slate-800">
      <code>{children}</code>
    </pre>
  );
}
function C({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[13px] dark:bg-slate-800">{children}</code>;
}

export default function DocsPage() {
  return (
    <div className="page-container flex gap-10 py-12 lg:gap-16">
      <aside className="sticky top-24 hidden h-fit w-56 shrink-0 lg:block">
        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">On this page</div>
        <nav className="mt-3 flex flex-col gap-1 text-sm">
          {TOC.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="rounded px-2 py-1 text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white">
              {label}
            </a>
          ))}
        </nav>
      </aside>

      <article className="min-w-0 max-w-4xl flex-1">
        <VersionBadge />
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">{PRODUCT_NAME} documentation</h1>
        <p className="mt-4 text-lg text-slate-500">
          Install, connect your infrastructure and start monitoring in minutes. This guide covers v{PRODUCT_VERSION}.
        </p>

        <H2 id="overview">Overview</H2>
        <P>
          {PRODUCT_NAME} is a self-hosted infrastructure monitoring and operations platform. It manages Virtual Machines (SSH discovery,
          OS/kernel, packages, controlled reboot), Docker (containers, images, metrics, logs), Kubernetes (nodes, pods, logs), standalone
          databases and S3-compatible object storage — all under a Workspace → resource authorization model with an append-only audit log.
        </P>

        <H2 id="quick-start">Quick start</H2>
        <P>
          This is the local development setup. For production — Docker Compose, or a native install on Ubuntu/Debian (apt), RHEL/Rocky/Alma
          (dnf) and more — see the{" "}
          <a href="/install" className="text-sky-600 underline">
            installation guide
          </a>
          .
        </P>
        <P>
          Requirements: <strong>Go 1.26+</strong>, <strong>Node.js 20+</strong> and <strong>Docker with Docker Compose</strong>.
        </P>
        <H3>1. Start PostgreSQL</H3>
        <Code>{`docker compose up -d`}</Code>
        <H3>2. Start the API</H3>
        <Code>{`cd infrahub-api
go run ./cmd/gen-encryption-key > .master.key   # local dev only
go run ./cmd/migrate up             # apply database migrations
go run ./cmd/seed                   # seed roles + permissions
go run ./cmd/bootstrap-admin        # create the first ADMIN
go run ./cmd/server                 # http://localhost:8080`}</Code>
        <H3>3. Start the console</H3>
        <Code>{`cd infrahub-ui
cp .env.example .env.local
npm install
npm run dev                         # http://localhost:3000`}</Code>
        <H3>4. Verify</H3>
        <Code>{`curl http://localhost:8080/api/health
# {"status":"ok","database":"ok"}`}</Code>
        <P>
          For production, run the published images from docker.io/infrahubcenter with Docker Compose or Kubernetes — no build needed. See the{" "}
          <a href="/install" className="text-sky-600 underline">
            installation guide
          </a>
          .
        </P>

        <H2 id="architecture">Architecture</H2>
        <Ul>
          <li>
            <strong>Console</strong> (<C>infrahub-ui</C>) — Next.js web app. Every screen is UX only; the API authorizes every request.
          </li>
          <li>
            <strong>API</strong> (<C>infrahub-api</C>) — Go service: REST + WebSocket endpoints, schedulers for monitoring, alert
            evaluation and retention cleanup.
          </li>
          <li>
            <strong>PostgreSQL</strong> — inventory, metrics history, alerts, audit log. Migrations run with <C>cmd/migrate</C>.
          </li>
          <li>
            <strong>Agents</strong> (<C>infrahub-docker-agent</C>, <C>infrahub-k8s-agent</C>, <C>infrahub-vm-agent</C>) — small Go programs on the monitored machines that connect <em>out</em> to the API.
          </li>
        </Ul>
        <P>
          Secret configuration lives in <C>development.ini.enc</C>/<C>production.ini.enc</C>, where every value is AES-256-GCM encrypted;
          only the single master key needs to stay out of git.
        </P>

        <H2 id="agents">Agents</H2>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-left dark:bg-slate-900">
              <tr>
                <th className="px-4 py-2 font-medium">Agent</th>
                <th className="px-4 py-2 font-medium">Runs on</th>
                <th className="px-4 py-2 font-medium">Collects</th>
              </tr>
            </thead>
            <tbody className="text-slate-600 dark:text-slate-300">
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">docker-agent</td>
                <td className="px-4 py-2">A Docker host</td>
                <td className="px-4 py-2">Containers, images, networks, volumes, host metrics, container logs</td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">k8s-agent</td>
                <td className="px-4 py-2">Inside a Kubernetes cluster</td>
                <td className="px-4 py-2">Pods, nodes, namespaces, pod logs</td>
              </tr>
              <tr className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">vm-agent</td>
                <td className="px-4 py-2">A Linux VM</td>
                <td className="px-4 py-2">OS-level metrics, systemd journal logs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <P>
          You never build agents yourself. The console generates a per-resource token and the exact install command: a{" "}
          <C>docker run</C> command from <strong>Agents &amp; Integrations → Docker Host Onboarding</strong> or the VM&apos;s Configure tab,
          and a <C>kubectl apply -f -</C> manifest from <strong>Kubernetes Cluster Onboarding</strong>. No inbound port is needed on the
          monitored host.
        </P>
        <P>
          VMs without Docker can run the VM Agent natively as a systemd service on apt, dnf, yum and zypper based distributions — see{" "}
          <a href="/install#agents" className="text-sky-600 underline">
            Installation → Agents
          </a>
          .
        </P>

        <H2 id="modules">Modules</H2>
        <P>The console sidebar is organized by capability:</P>
        <Ul>
          <li><strong>Operations Overview</strong> — fleet-wide health at a glance.</li>
          <li><strong>Workspaces</strong> — the access boundary every resource belongs to.</li>
          <li><strong>Compute</strong> — Compute Inventory (VMs, web SSH console), Patch Management (update plans, controlled reboots), Host Metrics &amp; Logs.</li>
          <li><strong>Database Observability</strong> — PostgreSQL, MySQL, MariaDB, MongoDB, Redis and Valkey health, performance, browser and logs.</li>
          <li><strong>Object Storage (S3)</strong> — bucket health, security posture, growth projection and object browser.</li>
          <li><strong>Agents &amp; Integrations</strong> — onboard Docker hosts and Kubernetes clusters.</li>
          <li><strong>Infrastructure Monitoring</strong> — Docker and Kubernetes dashboards, organized in folders.</li>
          <li><strong>Log Management</strong> — Docker and Kubernetes Log Explorer with live tailing.</li>
          <li><strong>Alerting &amp; Incidents</strong> — rules, active alerts, acknowledgement and suppression.</li>
          <li><strong>Identity &amp; Users</strong>, <strong>Access Control (RBAC)</strong>, <strong>Audit Trail</strong> — administration.</li>
          <li><strong>Plans &amp; Billing</strong> — current plan, usage against limits, upgrades.</li>
        </Ul>

        <H2 id="rbac">Roles &amp; access control</H2>
        <Ul>
          <li><strong>Owner</strong> — full control, including sign-in methods (GitHub, Google, SMTP) and inviting Owners/Admins.</li>
          <li><strong>Admin</strong> — full control over infrastructure, users and access grants.</li>
          <li><strong>Member</strong> — sees only what is explicitly granted.</li>
        </Ul>
        <P>
          Grants can be scoped to a Workspace, a single resource, a Monitoring/Logs folder, or a single dashboard. Monitoring and Logs are
          granted separately (<C>docker.monitor</C>, <C>docker.logs</C>, <C>k8s.monitor</C>, <C>k8s.logs</C>), so a developer can read
          logs without seeing anything else.
        </P>

        <H2 id="alerting">Alerting &amp; notifications</H2>
        <P>
          Create threshold rules on any collected metric, with an optional recovery threshold to prevent flapping. Alerts can be acknowledged
          or suppressed for a period. Notifications are delivered in-app, by email (SMTP) and by webhook, with a cooldown between repeats
          and bounded retries. Each user can mute non-critical categories for themselves; critical alerts can&apos;t be muted.
        </P>

        <H2 id="security">Security</H2>
        <Ul>
          <li>Every API request is authorized server-side, independent of what the UI shows.</li>
          <li>SSH credentials and configuration secrets are encrypted with AES-256-GCM at rest.</li>
          <li>Agents authenticate with per-resource bearer tokens over outbound WebSockets.</li>
          <li>The audit trail records logins, role changes, grants, config edits and operations; console sessions and log streams are logged as open/close events, never their content.</li>
          <li>Database remediation is Admin-only and limited to backend-templated operations — no free-form SQL.</li>
        </Ul>

        <H2 id="plans">Plans &amp; limits</H2>
        <P>
          Plans limit the number of registered Virtual Machines, Databases, Object Storage buckets, Docker Hosts, Kubernetes clusters and
          users. Containers, pods, dashboards and log volume are not metered. The active plan is set per deployment with{" "}
          <C>INFRAHUB_PLAN</C> (<C>community</C>, <C>team</C>, <C>business</C>, <C>enterprise</C>), and Admins can see usage
          under <strong>Plans &amp; Billing</strong>. See <a href="/#pricing" className="text-sky-600 underline">pricing</a> for each plan&apos;s limits.
        </P>

        <H2 id="versioning">Versioning</H2>
        <P>
          {PRODUCT_NAME} follows semantic versioning (<C>MAJOR.MINOR.PATCH</C>). The running version is shown at the bottom-left of the
          console sidebar and on the Plans &amp; Billing page. The current stable release is <strong>v{PRODUCT_VERSION}</strong>. Installed agents
          don&apos;t auto-update — reinstall an agent with a freshly generated command to pick up a new agent version.
        </P>
      </article>
    </div>
  );
}
