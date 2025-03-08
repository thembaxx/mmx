import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["ably"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.tapback.co",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
