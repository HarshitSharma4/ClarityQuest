/// <reference types="node" />
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          process.env.BACKEND_URL
            ? `${process.env.BACKEND_URL}/api/:path*`
            : "http://cq-backend:8000/api/:path*",
      },
    ];
  },
};

export default nextConfig;
