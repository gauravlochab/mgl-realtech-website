import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages (no Node server).
  output: "export",
  // next/image's optimizer needs a server; export serves source files as-is.
  // Our images are already pre-optimized AVIF, so this is lossless.
  images: { unoptimized: true },
};

export default nextConfig;
