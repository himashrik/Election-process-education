import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  allowedDevOrigins: ['192.168.56.1'],
};

export default nextConfig;
