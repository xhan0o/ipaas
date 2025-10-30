/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output reduces deployment size and improves build times
  output: 'standalone',
  // Optimize images if using next/image
  // Note: SWC minification is enabled by default in Next.js 15
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  // Experimental features for better performance
  experimental: {
    // Enable optimized package imports
    optimizePackageImports: ['lucide-react', '@nivo/core', '@nivo/line'],
  },
}

module.exports = nextConfig
