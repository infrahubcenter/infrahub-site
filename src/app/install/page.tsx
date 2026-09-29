import type { Metadata } from "next";
import { Boxes, Container, Database, Layers, Network, Server, ShieldCheck } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Tabs } from "@/components/tabs";
import { VersionBadge } from "@/components/version-badge";
import {
  AGENT_DOCKER_HOST,
  AGENT_K8S,
  AGENT_VM_DOCKER,
  AGENT_VM_NATIVE,
  COMPONENTS,
  COMPOSE_STEPS,
  DB_OPTIONS,
  DOCKER_ENGINE,
  DOCKER_POSTINSTALL,
  HOST_COMMON,
  HOST_PREREQS,
  IMAGES,
  K8S_STEPS,
  VERSION,
  type Distro,
} from "@/lib/install";
import { PRODUCT_NAME, PRODUCT_VERSION } from "@/lib/product";

export const metadata: Metadata = {
  title: "Installation",
  description: `Install ${PRODUCT_NAME} with Docker Compose, on Kubernetes, or directly on Ubuntu, Debian, RHEL, Rocky, AlmaLinux, Fedora, Amazon Linux or SUSE.`,
};

function Step({ n, title, body, children }: { n: number; title: string; body?: string; children: React.ReactNode }) {
  return (
    <li className="relative pl-10">
      <span className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-sky-600 text-xs font-semibold text-white">{n}</span>
      <h4 className="pt-0.5 font-semibold">{title}</h4>
      {body && <p className="mt-1 text-sm leading-6 text-slate-500">{body}</p>}
      {children}
    </li>
  );
}

function DistroTabs({ distros }: { distros: Distro[] }) {
  return (
    <Tabs
      tabs={distros.map((d) => ({
        id: d.id,
        label: d.label,
        hint: d.hint,
        content: (
          <>
            <CodeBlock code={d.code} title={d.hint} />
            {d.note && <p className="mt-2 text-xs text-amber-700 dark:text-amber-400">{d.note}</p>}
          </>
        ),
      }))}
    />
  );
}

function DbTabs({ mode }: { mode: "compose" | "k8s" }) {
  return (
    <div className="mt-4">
      <Tabs
        tabs={DB_OPTIONS.map((o) => ({
          id: o.id,
          label: o.label,
          hint: o.hint,
          content: (
            <>
              <p className="text-sm leading-6 text-slate-500">{o.body}</p>
              <CodeBlock code={mode === "compose" ? o.compose : o.k8s} title={mode === "compose" ? ".env" : "secret keys"} />
            </>
          ),
        }))}
      />
    </div>
  );
}

function SectionTitle({ id, icon: Icon, title, subtitle }: { id: string; icon: typeof Server; title: string; subtitle: string }) {
  return (
    <div id={id} className="scroll-mt-24 border-b border-slate-200 pb-4 dark:border-slate-800">
      <div className="flex items-center gap-2">
        <Icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      </div>
      <p className="mt-2 text-slate-500">{subtitle}</p>
    </div>
  );
}

const METHODS = [
  { href: "#docker", icon: Container, title: "Docker Compose", body: "Recommended. Pulls the published images -- one compose file, running in minutes.", tag: "Recommended" },
  { href: "#kubernetes", icon: Network, title: "Kubernetes", body: "PostgreSQL, API, console and gateway as Kubernetes workloads from the same images.", tag: "Clusters" },
  { href: "#containers", icon: Layers, title: "Individual containers", body: "Run the API, console and gateway images yourself -- any orchestrator, your own or a managed PostgreSQL.", tag: "Production" },
  { href: "#host", icon: Server, title: "Linux host (systemd)", body: "Native install without Docker: apt, dnf or yum, managed by systemd behind nginx.", tag: "Bare metal / VM" },
  { href: "#agents", icon: Boxes, title: "Agents", body: "Connect Docker hosts, VMs (Docker or native) and Kubernetes clusters to your platform.", tag: "Monitored hosts" },
];

export default function InstallPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
      <VersionBadge />
      <h1 className="mt-4 text-4xl font-semibold tracking-tight">Install {PRODUCT_NAME}</h1>
      <p className="mt-4 max-w-3xl text-lg text-slate-500">
        Self-host v{PRODUCT_VERSION} in containers or directly on a Linux server, then connect the machines and clusters you want to monitor.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {METHODS.map((m) => (
          <a key={m.href} href={m.href} className="group rounded-2xl border border-slate-200 p-5 transition-colors hover:border-sky-400 dark:border-slate-800 dark:hover:border-sky-700">
            <div className="flex items-center justify-between">
              <m.icon className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800">{m.tag}</span>
            </div>
            <div className="mt-3 font-semibold group-hover:text-sky-700 dark:group-hover:text-sky-300">{m.title}</div>
            <p className="mt-1 text-sm text-slate-500">{m.body}</p>
          </a>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm dark:border-slate-800 dark:bg-slate-900/40">
        <div className="font-semibold">Requirements</div>
        <ul className="mt-2 grid gap-1 text-slate-600 sm:grid-cols-2 dark:text-slate-300">
          <li>• Platform server: 2 vCPU, 4 GB RAM, 20 GB disk (minimum)</li>
          <li>• 64-bit Linux (x86_64 or arm64)</li>
          <li>• Ports 80/443 inbound to the platform only</li>
          <li>• Monitored hosts: outbound access to the platform, no inbound ports</li>
        </ul>
        <p className="mt-3 text-xs text-slate-500">
          Replace <code className="font-mono">infrahub.example.com</code> with your domain. Source: github.com/infrahubcenter.
        </p>
      </div>

      <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-left dark:bg-slate-900">
            <tr>
              <th className="px-4 py-2 font-medium">Image (docker.io, tag {VERSION})</th>
              <th className="px-4 py-2 font-medium">Role</th>
            </tr>
          </thead>
          <tbody className="text-slate-600 dark:text-slate-300">
            {IMAGES.map((img) => (
              <tr key={img.name} className="border-t border-slate-200 dark:border-slate-800">
                <td className="px-4 py-2 font-mono text-xs">
                  <a href={`https://hub.docker.com/r/${img.name}`} target="_blank" rel="noreferrer" className="hover:text-sky-600">
                    {img.name}
                  </a>
                </td>
                <td className="px-4 py-2">{img.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="border-t border-slate-200 px-4 py-2 text-xs text-slate-500 dark:border-slate-800">Every image is multi-arch: linux/amd64 and linux/arm64.</p>
      </div>

      {/* ---------------- Docker ---------------- */}
      <section className="mt-16">
        <SectionTitle id="docker" icon={Container} title="Method 1 · Docker Compose" subtitle="Pulls the published images from Docker Hub -- nothing is built on your server." />
        <ol className="mt-8 space-y-10">
          <Step n={1} title="Install Docker Engine and the Compose plugin" body="Pick your distribution. Uses Docker's official repositories.">
            <div className="mt-4">
              <DistroTabs distros={DOCKER_ENGINE} />
            </div>
            <CodeBlock code={DOCKER_POSTINSTALL} title="all distros" />
          </Step>
          {COMPOSE_STEPS.map((s, i) => (
            <Step key={s.title} n={i + 2} title={s.title} body={s.body}>
              {s.db ? <DbTabs mode="compose" /> : <CodeBlock code={s.code} title={s.file ?? "shell"} />}
            </Step>
          ))}
        </ol>
        <p className="mt-8 text-sm text-slate-500">
          HTTPS: put Caddy, nginx or your load balancer in front of the gateway (port 80, pass WebSocket upgrade headers), then set PUBLIC_URL to
          https://... and COOKIE_SECURE=true in .env and run docker compose up -d again.
        </p>
      </section>

      {/* ---------------- Kubernetes ---------------- */}
      <section className="mt-20">
        <SectionTitle
          id="kubernetes"
          icon={Network}
          title="Method 2 · Kubernetes"
          subtitle="The same images as Kubernetes workloads. Tested on Kubernetes 1.35; works with any cluster that has a default StorageClass."
        />
        <ol className="mt-8 space-y-10">
          {K8S_STEPS.map((s, i) => (
            <Step key={s.title} n={i + 1} title={s.title} body={s.body}>
              {s.db ? <DbTabs mode="k8s" /> : <CodeBlock code={s.code} title={s.file ?? "shell"} />}
            </Step>
          ))}
        </ol>
      </section>

      {/* ---------------- Individual containers ---------------- */}
      <section className="mt-20">
        <SectionTitle
          id="containers"
          icon={Layers}
          title="Method 3 · Individual containers"
          subtitle="Each service is its own image -- deploy them on ECS, Nomad, Swarm or plain Docker, and point the API at the PostgreSQL you already run."
        />
        <div className="mt-8 space-y-8">
          {COMPONENTS.map((c) => (
            <div key={c.name} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                {c.name === "postgres" ? <Database className="h-5 w-5 text-sky-600 dark:text-sky-400" /> : <Container className="h-5 w-5 text-sky-600 dark:text-sky-400" />}
                <h3 className="font-semibold">{c.name}</h3>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500 dark:bg-slate-800">port {c.port}</span>
                {c.optional && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[11px] text-amber-800 dark:bg-amber-950 dark:text-amber-300">optional</span>}
              </div>
              <p className="mt-2 text-sm text-slate-500">{c.role}</p>
              <CodeBlock code={c.image} title="image" />
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="text-left text-xs text-slate-500">
                    <tr>
                      <th className="py-1 pr-4 font-medium">Variable</th>
                      <th className="py-1 pr-4 font-medium">Required</th>
                      <th className="py-1 font-medium">Description</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-600 dark:text-slate-300">
                    {c.env.map((e) => (
                      <tr key={e.key} className="border-t border-slate-100 dark:border-slate-800">
                        <td className="py-1.5 pr-4 font-mono text-xs">{e.key}</td>
                        <td className="py-1.5 pr-4 text-xs">{e.required ? "yes" : "no"}</td>
                        <td className="py-1.5 text-xs">{e.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <CodeBlock code={c.run} title="docker run" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-slate-500">
          Start order: database (if built-in) → infrahub-api → infrahub-ui → infrahub-gateway. Only the gateway needs a published port; keep the API,
          console and database on a private network.
        </p>
      </section>

      {/* ---------------- Host ---------------- */}
      <section className="mt-20">
        <SectionTitle
          id="host"
          icon={Server}
          title="Method 4 · Linux host (systemd)"
          subtitle="No Docker. PostgreSQL, the Go API and the Node.js console run as native services behind nginx."
        />
        <ol className="mt-8 space-y-10">
          <Step n={1} title="Install system packages" body="PostgreSQL 16, Node.js 22, nginx and build tools for your distribution.">
            <div className="mt-4">
              <DistroTabs distros={HOST_PREREQS} />
            </div>
          </Step>
          {HOST_COMMON.map((s, i) => (
            <Step key={s.title} n={i + 2} title={s.title} body={s.body}>
              <CodeBlock code={s.code} title={s.file ?? "shell · all distros"} />
            </Step>
          ))}
        </ol>
      </section>

      {/* ---------------- Agents ---------------- */}
      <section className="mt-20">
        <SectionTitle
          id="agents"
          icon={Boxes}
          title="Connect your infrastructure (agents)"
          subtitle="Each agent dials out to your platform over a WebSocket with a per-resource token. The console generates the exact command -- the ones below show its shape."
        />
        <div className="mt-8">
          <Tabs
            variant="underline"
            tabs={[
              {
                id: "docker-host",
                label: "Docker host",
                content: (
                  <>
                    <p className="text-sm text-slate-500">Any machine running Docker. Needs only the Docker socket -- no SSH.</p>
                    <CodeBlock code={AGENT_DOCKER_HOST} />
                  </>
                ),
              },
              {
                id: "vm-docker",
                label: "VM · Docker",
                content: (
                  <>
                    <p className="text-sm text-slate-500">Linux VM with Docker installed (see Method 1, step 1).</p>
                    <CodeBlock code={AGENT_VM_DOCKER} />
                  </>
                ),
              },
              {
                id: "vm-native",
                label: "VM · Native (apt / dnf / yum / zypper)",
                content: (
                  <>
                    <p className="text-sm text-slate-500">
                      No Docker required. On x86_64 the installer downloads the prebuilt agent (runs on CentOS 7 and every newer distro); on
                      arm64 it installs gcc, pkg-config and libsystemd headers and builds it. Either way it registers the{" "}
                      <code className="font-mono">infrahub-vm-agent</code> systemd service. Tested on Ubuntu 24.04, Rocky Linux 9, Amazon Linux 2 and
                      openSUSE Leap 15.6.
                    </p>
                    <CodeBlock code={AGENT_VM_NATIVE} />
                  </>
                ),
              },
              {
                id: "k8s",
                label: "Kubernetes",
                content: (
                  <>
                    <p className="text-sm text-slate-500">Runs in-cluster with read-only RBAC for pods, nodes and namespaces.</p>
                    <CodeBlock code={AGENT_K8S} />
                  </>
                ),
              },
            ]}
          />
        </div>
      </section>

      <div className="mt-20 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-sm dark:border-emerald-900 dark:bg-emerald-950/30">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div>
          <div className="font-semibold text-emerald-900 dark:text-emerald-200">Production checklist</div>
          <ul className="mt-2 space-y-1 text-emerald-900/80 dark:text-emerald-200/80">
            <li>• Keep .env, the Kubernetes secret and INFRAHUB_MASTER_KEY private -- never commit them or bake them into an image.</li>
            <li>• Serve over HTTPS (certbot --nginx, or your load balancer) so session cookies stay secure.</li>
            <li>• Back up the PostgreSQL database daily (pg_dump), and keep a copy of the master key with it.</li>
            <li>• Restrict port 5432 to localhost / the compose network.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
