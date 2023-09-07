/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  
  async rewrites() {
    return [
      {
        source: '/register',
        destination: '/register/register',
      },
    ];
  },
}

module.exports = nextConfig;
