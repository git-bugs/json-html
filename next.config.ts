import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  htmlLimitedBots: /.*/,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/ru',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
