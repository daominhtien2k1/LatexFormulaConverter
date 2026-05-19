import type { NextConfig } from "next";

// Set NEXT_PUBLIC_BASE_PATH only when deploying to a sub-path host
// (e.g. GitHub Pages: "/LatexFormulaConverter"). Leave empty for Vercel /
// custom-domain root deploys.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",          // Static HTML/CSS/JS — deploy anywhere
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,       // Required for static export
  },
  trailingSlash: true,
};

export default nextConfig;
