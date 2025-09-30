/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove static export for development
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
