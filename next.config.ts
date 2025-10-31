import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/en',
        permanent: true,
      },
    ];
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
};

export default nextConfig;
