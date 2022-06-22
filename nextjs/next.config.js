/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    outputStandalone: true
  },
  images: {
    domains: ['cdn.intra.42.fr']
  }

};

module.exports = nextConfig;
