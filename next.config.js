/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

}

module.exports = nextConfig;
