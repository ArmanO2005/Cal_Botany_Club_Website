import type { NextConfig } from "next";

// const isProd = process.env.NODE_ENV === "production";
// const base = isProd ? "/~armano" : "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
//   basePath: base,
//   assetPrefix: base,
  eslint: { ignoreDuringBuilds: true }, // optional
};

export default nextConfig;

