/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['cdn.intra.42.fr', 'localhost'],
  },

};

module.exports = nextConfig;
