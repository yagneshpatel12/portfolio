import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    qualities: [75, 90],
  },
  allowedDevOrigins: ['192.168.29.99'],
};

export default nextConfig;
