/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['d1052pu3rm1xk9.cloudfront.net'],
  },
  env: {
    API_BASE_URL: 'https://www.spotahome.com/api/public/listings/search/'
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

module.exports = nextConfig
