import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  metadataBase: new URL('https://json-html.com'),
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
