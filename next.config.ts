import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vercel.sh",
      },
      {
        protocol: "https",
        hostname: "floorplans.t3.storage.dev",
      },
    ],
  },
};

export default nextConfig;
