/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static HTML export for GitHub Pages; the base path is set by the deploy workflow.
  output: "export",
  trailingSlash: true,
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

export default nextConfig;
