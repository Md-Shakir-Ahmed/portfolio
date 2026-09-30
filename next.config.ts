import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repo = process.env.GITHUB_REPOSITORY?.split("/")[1];
const isUserSite = repo?.toLowerCase().endsWith(".github.io");
const defaultRepoPath = isGithubActions && !isUserSite && repo ? `/${repo}` : "";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? defaultRepoPath;

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
