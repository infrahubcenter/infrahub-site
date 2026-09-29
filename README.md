# infrahub-site

Public marketing site for Infra Hub Center: product overview, monitoring +
logging story, feature docs, competitor comparison, pricing and release
notes. Fully static (Next.js `output: "export"`), separate from the
`infrahub-ui` console.

```bash
cd infrahub-site
npm install
npm run dev        # http://localhost:3002
npm run build      # static files in out/ -- deploy to any static host
```

Pages: `/` (overview, compare, pricing, FAQ), `/install` (Docker Compose,
native Linux per distro, agents), `/docs`, `/contact` (sales form).

`NEXT_PUBLIC_APP_URL` (see `.env.example`) sets where "Sign in" links go --
defaults to the local dev-proxy at http://localhost:4000.

All copy lives in `src/lib/product.ts`; install commands in
`src/lib/install.ts` (keep them in step with the Dockerfiles, compose file
and `infrahub-agents/infrahub-vm-agent/install.sh`). Replace `REPO_URL`
there with your real repository URL, and `SALES_EMAIL` in product.ts. The version (`PRODUCT_VERSION`) and
plans (`PLANS`) mirror `infrahub-ui/src/lib/branding.ts` and
`infrahub-ui/src/lib/plans.ts` -- update both on each release or price change.
