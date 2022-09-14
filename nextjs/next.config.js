/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  images: {
    domains: ['cdn.intra.42.fr', 'localhost'],
  },

};

module.exports = nextConfig;
