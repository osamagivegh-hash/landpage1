/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'landpage1-production.up.railway.app'],
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL || 'https://landpage1-production.up.railway.app/api',
  },
}

module.exports = nextConfig


