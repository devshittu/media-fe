/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyimage.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'xsgames.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'kitwind.io',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
