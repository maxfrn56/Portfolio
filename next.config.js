/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/avif', 'image/webp'],
  },
  // Optimisations de performance
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig

