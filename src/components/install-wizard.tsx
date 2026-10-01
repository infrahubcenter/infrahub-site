"use client";

// Guided installation: pick a method, then walk through it one step at a
// time (Back / Next) instead of scrolling past every method's commands.
// The selected method and step live in the URL hash (#docker, #docker-3),
// so links like /install#host or /install#agents open that method directly.

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Boxes,
  Check,
  ChevronDown,
  Container,
  Layers,
  Network,
  PartyPopper,
  RotateCcw,
  Server,
  ShieldCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import { Tabs } from "@/components/tabs";
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
  QUICK_INSTALL,
  QUICK_INSTALL_AFTER,
  QUICK_INSTALL_OPTIONS,
  QUICK_INSTALL_UNATTENDED,
  VERSION,
  type Distro,
} from "@/lib/install";

type WizardStep = { title: string; body?: string; content: ReactNode };

type Method = {
  id: string;
  icon: LucideIcon;
  title: string;
  tag: string;
  summary: string;
  time: string;
  steps: WizardStep[];
  done: ReactNode;
};

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
  );
}

function EnvTable({ env }: { env: { key: string; required: boolean; desc: string }[] }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800">
      <table className="w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs text-slate-500 dark:bg-slate-900">
          <tr>
            <th className="px-3 py-2 font-medium">Variable</th>
            <th className="px-3 py-2 font-medium">Required</th>
            <th className="px-3 py-2 font-medium">Description</th>
          </tr>
        </thead>
        <tbody className="text-slate-600 dark:text-slate-300">
          {env.map((e) => (
            <tr key={e.key} className="border-t border-slate-100 dark:border-slate-800">
              <td className="px-3 py-1.5 font-mono text-xs">{e.key}</td>
              <td className="px-3 py-1.5 text-xs">{e.required ? "yes" : "no"}</td>
              <td className="px-3 py-1.5 text-xs">{e.desc}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Done({ children }: { children: ReactNode }) {
  return <ul className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">{children}</ul>;
}

function DoneItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex gap-2">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
      <span>{children}</span>
    </li>
  );
}

const HTTPS_NOTE =
  "HTTPS: put Caddy, nginx or your load balancer in front of the gateway (port 80, pass WebSocket upgrade headers), then set PUBLIC_URL to https://... and COOKIE_SECURE=true.";

const METHODS: Method[] = [
  {
    id: "quick",
    icon: Zap,
    title: "Quick install",
    tag: "Recommended",
    summary: "One command on any Linux server. It installs Docker if needed, sets everything up and starts it.",
    time: "~5 min",
    steps: [
      {
        title: "Run one command on your server",
        body: "Log in to your Linux server (Ubuntu, Debian, RHEL, Rocky, AlmaLinux, Fedora, Amazon Linux or SUSE) and paste this:",
        content: (
          <>
            <CodeBlock code={QUICK_INSTALL} title="any Linux server" />
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
                <div className="font-semibold">It asks you only:</div>
                <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>1. The address people will open (your domain or the server&apos;s IP)</li>
                  <li>2. The admin email</li>
                  <li>3. The admin password (press Enter and it makes a strong one)</li>
                </ul>
              </div>
              <div className="rounded-xl border border-slate-200 p-4 text-sm dark:border-slate-800">
                <div className="font-semibold">It does the rest:</div>
                <ul className="mt-2 space-y-1.5 text-slate-600 dark:text-slate-300">
                  <li>✓ Installs Docker if it&apos;s missing</li>
                  <li>✓ Generates every secret, kept private on the server</li>
                  <li>✓ Sets up the database and starts Infra Hub Center</li>
                  <li>✓ Prints the address and your sign-in details</li>
                </ul>
              </div>
            </div>
            <p className="mt-4 text-xs text-slate-500">
              Needs a 64-bit Linux server with 4 GB RAM and internet access. On Windows or macOS, install Docker Desktop and use the Docker
              Compose method instead.
            </p>
          </>
        ),
      },
      {
        title: "Open it and sign in",
        body: "When it finishes, the installer prints something like this. Open the address in your browser and sign in.",
        content: (
          <>
            <CodeBlock
              title="installer output"
              code={`Infra Hub Center is ready

    Open:      http://203.0.113.10
    Sign in:   admin@example.com
    Password:  (the one you chose, or the generated one shown here)`}
            />
            <CodeBlock code={QUICK_INSTALL_AFTER} title="useful later" />
            <details className="group mt-5 rounded-xl border border-slate-200 dark:border-slate-800">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-sm font-semibold">
                No questions: options for scripts and cloud-init
                <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-slate-200 px-4 pb-4 dark:border-slate-800">
                <CodeBlock code={QUICK_INSTALL_UNATTENDED} title="unattended" />
                <table className="mt-4 w-full text-sm">
                  <tbody className="text-slate-600 dark:text-slate-300">
                    {QUICK_INSTALL_OPTIONS.map((o) => (
                      <tr key={o.flag} className="border-t border-slate-100 first:border-t-0 dark:border-slate-800">
                        <td className="whitespace-nowrap py-1.5 pr-4 font-mono text-xs">{o.flag}</td>
                        <td className="py-1.5 text-xs">{o.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </details>
          </>
        ),
      },
    ],
    done: (
      <Done>
        <DoneItem>Next, connect what you want to monitor: Docker hosts, VMs and Kubernetes clusters.</DoneItem>
        <DoneItem>{HTTPS_NOTE}</DoneItem>
        <DoneItem>Your settings live in /opt/infrahub/.env. To upgrade, run the same command again; your data is kept.</DoneItem>
      </Done>
    ),
  },
  {
    id: "docker",
    icon: Container,
    title: "Docker Compose",
    tag: "Step by step",
    summary: "The same setup as Quick install, done by hand, so you see and control every setting.",
    time: "~10 min",
    steps: [
      {
        title: "Install Docker Engine and the Compose plugin",
        body: "Pick your Linux distribution and run its commands. Skip this step if Docker is already installed.",
        content: (
          <>
            <DistroTabs distros={DOCKER_ENGINE} />
            <CodeBlock code={DOCKER_POSTINSTALL} title="all distros" />
          </>
        ),
      },
      ...COMPOSE_STEPS.map((s) => ({
        title: s.title,
        body: s.body,
        content: s.db ? <DbTabs mode="compose" /> : <CodeBlock code={s.code} title={s.file ?? "shell"} />,
      })),
    ],
    done: (
      <Done>
        <DoneItem>Open your PUBLIC_URL in a browser and sign in with the admin email and password from .env.</DoneItem>
        <DoneItem>{HTTPS_NOTE}</DoneItem>
      </Done>
    ),
  },
  {
    id: "kubernetes",
    icon: Network,
    title: "Kubernetes",
    tag: "Clusters",
    summary: "The same images as Kubernetes workloads. Works on any cluster with a default StorageClass.",
    time: "~15 min",
    steps: K8S_STEPS.map((s) => ({
      title: s.title,
      body: s.body,
      content: s.db ? <DbTabs mode="k8s" /> : <CodeBlock code={s.code} title={s.file ?? "shell"} />,
    })),
    done: (
      <Done>
        <DoneItem>Open the gateway&apos;s EXTERNAL-IP (or your Ingress domain) and sign in with the first admin account.</DoneItem>
        <DoneItem>For a paid plan, add your license key to the secret: --from-literal=license-key=IHC1...</DoneItem>
      </Done>
    ),
  },
  {
    id: "containers",
    icon: Layers,
    title: "Individual containers",
    tag: "Production",
    summary: "Run each image yourself on ECS, Nomad, Swarm or plain Docker, with your own PostgreSQL.",
    time: "~15 min",
    steps: [
      ...[...COMPONENTS].sort((a, b) => Number(Boolean(b.optional)) - Number(Boolean(a.optional))).map((c) => ({
        title: c.optional ? `${c.name} (optional, skip if you use a managed database)` : `Run ${c.name}`,
        body: `${c.role} Port ${c.port}.`,
        content: (
          <>
            <CodeBlock code={c.image} title="image" />
            <EnvTable env={c.env} />
            <CodeBlock code={c.run} title="docker run" />
          </>
        ),
      })),
    ],
    done: (
      <Done>
        <DoneItem>Start order: database (if built-in), then infrahub-api, infrahub-ui and infrahub-gateway.</DoneItem>
        <DoneItem>Only the gateway needs a published port. Keep the API, console and database on a private network.</DoneItem>
        <DoneItem>{HTTPS_NOTE}</DoneItem>
      </Done>
    ),
  },
  {
    id: "host",
    icon: Server,
    title: "Linux host (systemd)",
    tag: "Bare metal / VM",
    summary: "No Docker: PostgreSQL, the API and the console run as native services behind nginx.",
    time: "~30 min",
    steps: [
      {
        title: "Install system packages",
        body: "PostgreSQL 16, Node.js 22, nginx and build tools. Pick your distribution.",
        content: <DistroTabs distros={HOST_PREREQS} />,
      },
      ...HOST_COMMON.map((s) => ({
        title: s.title,
        body: s.body,
        content: <CodeBlock code={s.code} title={s.file ?? "shell · all distros"} />,
      })),
    ],
    done: (
      <Done>
        <DoneItem>Open your server&apos;s address and sign in with the first admin account.</DoneItem>
        <DoneItem>Enable HTTPS with certbot --nginx so session cookies stay secure.</DoneItem>
      </Done>
    ),
  },
  {
    id: "agents",
    icon: Boxes,
    title: "Connect agents",
    tag: "After install",
    summary: "Connect Docker hosts, VMs and Kubernetes clusters to a running platform.",
    time: "~2 min each",
    steps: [
      {
        title: "Add the resource in your console",
        body: "Each agent dials out to your platform over a WebSocket with its own token, so monitored machines need no inbound ports. In the console, open the matching page below and click Connect or Install Agent. It shows the exact command with your token filled in.",
        content: (
          <ul className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2 dark:text-slate-300">
            <li className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><b>Docker host:</b> Agents &amp; Integrations → Docker Host Onboarding</li>
            <li className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><b>VM metrics &amp; logs:</b> Compute → Host Metrics &amp; Logs → Configure</li>
            <li className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><b>Kubernetes:</b> Agents &amp; Integrations → Kubernetes Cluster Onboarding</li>
            <li className="rounded-lg border border-slate-200 p-3 dark:border-slate-800"><b>SSH-managed VM:</b> Compute → Compute Inventory → Add VM (no agent needed)</li>
          </ul>
        ),
      },
      {
        title: "Run the agent command",
        body: "Pick what you're connecting. The console's own command is the one to run; these show its shape.",
        content: (
          <Tabs
            tabs={[
              { id: "docker-host", label: "Docker host", hint: "needs only the Docker socket", content: <CodeBlock code={AGENT_DOCKER_HOST} /> },
              { id: "vm-docker", label: "VM · Docker", hint: "Linux VM with Docker", content: <CodeBlock code={AGENT_VM_DOCKER} /> },
              {
                id: "vm-native",
                label: "VM · Native",
                hint: "apt / dnf / yum / zypper",
                content: (
                  <>
                    <p className="text-sm leading-6 text-slate-500">
                      No Docker needed. On x86_64 the installer downloads the prebuilt agent; on arm64 it builds it. Either way it registers the{" "}
                      <code className="font-mono">infrahub-vm-agent</code> systemd service.
                    </p>
                    <CodeBlock code={AGENT_VM_NATIVE} />
                  </>
                ),
              },
              { id: "k8s", label: "Kubernetes", hint: "read-only RBAC", content: <CodeBlock code={AGENT_K8S} /> },
            ]}
          />
        ),
      },
    ],
    done: (
      <Done>
        <DoneItem>The agent shows as Connected in the console within a few seconds, and metrics and logs start flowing.</DoneItem>
        <DoneItem>Nothing showing? Check that the machine can reach your PUBLIC_URL, and re-copy the command (each token works once).</DoneItem>
      </Done>
    ),
  },
];

function parseHash(): { method?: string; step: number } {
  if (typeof window === "undefined") return { step: 0 };
  const m = window.location.hash.slice(1).match(/^([a-z]+)(?:-(\d+))?$/);
  if (!m || !METHODS.some((x) => x.id === m[1])) return { step: 0 };
  return { method: m[1], step: m[2] ? Math.max(0, Number(m[2]) - 1) : 0 };
}

export function InstallWizard() {
  const [methodId, setMethodId] = useState<string | undefined>(undefined);
  const [step, setStep] = useState(0); // steps.length = the finish screen
  const topRef = useRef<HTMLDivElement>(null);

  // Open whatever method/step the URL names (#host, #docker-3).
  useEffect(() => {
    const apply = () => {
      const h = parseHash();
      setMethodId(h.method);
      setStep(h.step);
    };
    apply();
    window.addEventListener("hashchange", apply);
    return () => window.removeEventListener("hashchange", apply);
  }, []);

  const method = METHODS.find((m) => m.id === methodId);

  const go = useCallback((id: string | undefined, n: number) => {
    setMethodId(id);
    setStep(n);
    const hash = id ? `#${id}${n > 0 ? `-${n + 1}` : ""}` : " ";
    window.history.replaceState(null, "", hash === " " ? window.location.pathname : hash);
    requestAnimationFrame(() => {
      const top = topRef.current;
      if (top && top.getBoundingClientRect().top < 0) top.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return (
    <div ref={topRef} className="scroll-mt-24">
      {!method ? <MethodPicker onPick={(id) => go(id, 0)} /> : <MethodRunner method={method} step={step} go={go} />}
    </div>
  );
}

function MethodPicker({ onPick }: { onPick: (id: string) => void }) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight">How do you want to install?</h2>
      <p className="mt-1 text-slate-500">Pick one. You&apos;ll then go through it step by step.</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {METHODS.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => onPick(m.id)}
            className="card-lift group flex flex-col rounded-2xl border border-slate-200 bg-white p-5 text-left transition-colors hover:border-sky-400 dark:border-slate-800 dark:bg-slate-900/40"
          >
            <div className="flex items-center justify-between">
              <m.icon className="h-7 w-7 text-sky-600 dark:text-sky-400" />
              <span
                className={`rounded-full px-2 py-0.5 text-[11px] ${
                  m.tag === "Recommended" ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"
                }`}
              >
                {m.tag}
              </span>
            </div>
            <div className="mt-3 text-lg font-semibold group-hover:text-sky-700 dark:group-hover:text-sky-300">{m.title}</div>
            <p className="mt-1 flex-1 text-sm text-slate-500">{m.summary}</p>
            <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
              <span>
                {m.steps.length} steps · {m.time}
              </span>
              <span className="inline-flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400">
                Start <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </button>
        ))}
      </div>
      <Requirements />
    </div>
  );
}

function Requirements() {
  return (
    <details className="group mt-8 rounded-xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/40">
      <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 text-sm font-semibold">
        Requirements &amp; images
        <ChevronDown className="h-4 w-4 text-slate-400 transition-transform group-open:rotate-180" />
      </summary>
      <div className="border-t border-slate-200 px-5 py-4 text-sm dark:border-slate-800">
        <ul className="grid gap-1 text-slate-600 sm:grid-cols-2 dark:text-slate-300">
          <li>• Platform server: 2 vCPU, 4 GB RAM, 20 GB disk (minimum)</li>
          <li>• 64-bit Linux (x86_64 or arm64)</li>
          <li>• Ports 80/443 inbound to the platform only</li>
          <li>• Monitored hosts: outbound access to the platform, no inbound ports</li>
        </ul>
        <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
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
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Every image is multi-arch (linux/amd64 and linux/arm64). Replace <code className="font-mono">infrahub.example.com</code> with your domain.
        </p>
      </div>
    </details>
  );
}

function MethodRunner({ method, step, go }: { method: Method; step: number; go: (id: string | undefined, n: number) => void }) {
  const total = method.steps.length;
  const finished = step >= total;
  const current = method.steps[Math.min(step, total - 1)];
  const progress = finished ? 100 : Math.round((step / total) * 100);

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 dark:bg-sky-950/60">
            <method.icon className="h-5 w-5 text-sky-600 dark:text-sky-400" />
          </span>
          <div>
            <div className="text-xs font-medium uppercase tracking-wide text-slate-500">Installing with</div>
            <h2 className="text-xl font-semibold tracking-tight">{method.title}</h2>
          </div>
        </div>
        <button
          type="button"
          onClick={() => go(undefined, 0)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-900"
        >
          <RotateCcw className="h-3.5 w-3.5" /> Change method
        </button>
      </div>

      {/* Progress: a bar plus clickable step numbers. */}
      <div className="mt-6">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>{finished ? "All steps done" : `Step ${step + 1} of ${total}`}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 flex flex-wrap gap-2">
          {method.steps.map((s, i) => {
            const state = finished || i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.title}>
                <button
                  type="button"
                  onClick={() => go(method.id, i)}
                  title={s.title}
                  aria-current={state === "current" ? "step" : undefined}
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition-colors ${
                    state === "current"
                      ? "bg-sky-600 text-white ring-4 ring-sky-100 dark:ring-sky-950"
                      : state === "done"
                        ? "bg-emerald-500 text-white hover:bg-emerald-600"
                        : "bg-slate-100 text-slate-500 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
                  }`}
                >
                  {state === "done" ? <Check className="h-4 w-4" /> : i + 1}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7 dark:border-slate-800 dark:bg-slate-900/40">
        {finished ? (
          <div>
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
              <PartyPopper className="h-6 w-6" />
              <h3 className="text-xl font-semibold">You&apos;re done!</h3>
            </div>
            <p className="mt-2 text-slate-500">Infra Hub Center is installed. Next:</p>
            {method.done}
            <div className="mt-6 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900 dark:bg-emerald-950/30">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <div>
                <div className="font-semibold text-emerald-900 dark:text-emerald-200">Production checklist</div>
                <ul className="mt-1 space-y-1 text-emerald-900/80 dark:text-emerald-200/80">
                  <li>• Keep .env, the Kubernetes secret and INFRAHUB_MASTER_KEY private. Never commit them or bake them into an image.</li>
                  <li>• Serve over HTTPS so session cookies stay secure.</li>
                  <li>• Back up the PostgreSQL database daily (pg_dump), together with the master key.</li>
                  <li>• Restrict port 5432 to localhost or the private network.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div key={`${method.id}-${step}`}>
            <div className="text-xs font-semibold uppercase tracking-wide text-sky-600 dark:text-sky-400">Step {step + 1}</div>
            <h3 className="mt-1 text-xl font-semibold tracking-tight">{current.title}</h3>
            {current.body && <p className="mt-2 text-sm leading-6 text-slate-500">{current.body}</p>}
            <div className="mt-2">{current.content}</div>
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-2 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
          <button
            type="button"
            onClick={() => (step === 0 ? go(undefined, 0) : go(method.id, step - 1))}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" /> {step === 0 ? "All methods" : "Back"}
          </button>
          {finished ? (
            <div className="flex flex-col gap-2 sm:flex-row">
              {method.id !== "agents" && (
                <button
                  type="button"
                  onClick={() => go("agents", 0)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
                >
                  Connect agents <ArrowRight className="h-4 w-4" />
                </button>
              )}
              <button
                type="button"
                onClick={() => go(undefined, 0)}
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                All methods
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => go(method.id, step + 1)}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
            >
              {step === total - 1 ? "Finish" : `Next: ${method.steps[step + 1].title.replace(/ \(.*\)$/, "")}`}
              {step === total - 1 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

