import type { NextConfig } from "next";

const isProjectPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  basePath: isProjectPages && repoName ? `/${repoName}` : '',
  assetPrefix: isProjectPages && repoName ? `/${repoName}/` : undefined,
};

export default nextConfig;
