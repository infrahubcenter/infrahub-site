import path from "node:path";
import type { NextConfig } from "next";

// Fully static marketing site -- `next build` emits plain HTML/CSS/JS into
// out/, deployable to any static host (S3, Nginx, Netlify, GitHub Pages).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  // This folder has its own lockfile next to the repo root's one.
  turbopack: { root: path.resolve(__dirname) },
};

export default nextConfig;
