import type { Metadata } from "next";
import { InstallWizard } from "@/components/install-wizard";
import { PRODUCT_NAME, PRODUCT_VERSION } from "@/lib/product";

export const metadata: Metadata = {
  title: "Installation",
  description: `Install ${PRODUCT_NAME} with Docker Compose, on Kubernetes, or directly on Ubuntu, Debian, RHEL, Rocky, AlmaLinux, Fedora, Amazon Linux or SUSE.`,
};

export default function InstallPage() {
  return (
    <div>
      <section className="hero-bg text-white">
        <div className="page-container py-14 sm:py-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-sky-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> v{PRODUCT_VERSION} · Stable
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Install <span className="text-gradient">{PRODUCT_NAME}</span>
          </h1>
          <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
            One command on any Linux server gets you running in about five minutes. Prefer full control? Follow Docker Compose,
            Kubernetes, individual containers or a native Linux install step by step, then connect the machines and clusters you want
            to monitor.
          </p>
        </div>
      </section>

      <div className="page-container py-12">
        <InstallWizard />
      </div>
    </div>
  );
}
