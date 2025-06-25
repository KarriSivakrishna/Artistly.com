/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Image optimization configuration
  images: {
    domains: ['placeholder.svg', 'images.unsplash.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Compression and optimization
  compress: true,
  
  // PWA and performance optimizations
  poweredByHeader: false,
  
  // Redirects for SEO - Fixed routing
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
      {
        source: '/artist-listing',
        destination: '/artists',
        permanent: true,
      },
    ]
  },
  
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
