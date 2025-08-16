import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['placehold.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.sellerpintar.com',
        port: '',
        pathname: '/**', // allow all image paths
      },
      {
        protocol: 'https',
        hostname: 'www.irvinetechcorp.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
