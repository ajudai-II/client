/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.olx.com.br',
        port: '',
        pathname: '/images/**',
      },
    ],
  },

}

module.exports = nextConfig;
