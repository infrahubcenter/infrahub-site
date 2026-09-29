import Link from "next/link";
import { APP_URL, PRODUCT_NAME, PRODUCT_VERSION, RELEASE_CHANNEL, RELEASE_DATE } from "@/lib/product";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element -- static SVG mark */}
            <img src="/logo-icon.svg" alt="" className="h-7 w-7" />
            <span className="font-semibold">{PRODUCT_NAME}</span>
          </div>
          <p className="mt-3 text-sm text-slate-500">Monitoring, logging and operations for DevOps teams -- in one self-hosted console.</p>
        </div>
        <FooterCol
          title="Product"
          links={[
            ["/#features", "Features"],
            ["/#compare", "Compare"],
            ["/#pricing", "Pricing"],
            ["/#releases", "Release notes"],
          ]}
        />
        <FooterCol
          title="Documentation"
          links={[
            ["/install", "Installation"],
            ["/install#host", "Linux host install"],
            ["/install#agents", "Agents"],
            ["/docs#architecture", "Architecture"],
            ["/docs#security", "Security"],
          ]}
        />
        <FooterCol
          title="Company"
          links={[
            ["/contact", "Contact sales"],
            [`${APP_URL}/login`, "Console sign in"],
            ["/#faq", "FAQ"],
          ]}
        />
      </div>
      <div className="border-t border-slate-200 dark:border-slate-800">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-4 text-xs text-slate-400 sm:px-6 dark:text-slate-600">
          <span>© 2026 Infra Hub Center. All rights reserved.</span>
          <span>
            v{PRODUCT_VERSION} · {RELEASE_CHANNEL} · {RELEASE_DATE}
          </span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <div className="text-sm font-semibold">{title}</div>
      <ul className="mt-3 space-y-2 text-sm text-slate-500">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link href={href} className="hover:text-slate-900 dark:hover:text-white">
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
