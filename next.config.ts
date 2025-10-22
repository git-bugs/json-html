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
};

export default nextConfig;
