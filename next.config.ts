import type { NextConfig } from "next";

const isGitHubPagesBuild = process.env.PAGES_BUILD === "true";
const repositoryName =
  process.env.GITHUB_REPOSITORY?.split("/").at(-1) ?? "zjsu-sg";

const nextConfig: NextConfig = isGitHubPagesBuild
  ? {
      output: "export",
      trailingSlash: true,
      basePath: `/${repositoryName}`,
      images: {
        unoptimized: true,
      },
      typescript: {
        tsconfigPath: "tsconfig.pages.json",
      },
    }
  : {};

export default nextConfig;
