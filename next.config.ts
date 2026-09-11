import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  env: {
    // Day index of the build; lets date-derived labels hydrate exactly as prerendered
    NEXT_PUBLIC_BUILD_DAY: String(Math.floor(Date.now() / 86_400_000)),
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
