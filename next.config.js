/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['live.staticflickr.com', 'farm1.staticflickr.com', 'farm2.staticflickr.com', 'farm3.staticflickr.com', 'farm4.staticflickr.com', 'farm5.staticflickr.com', 'farm6.staticflickr.com', 'farm7.staticflickr.com', 'farm8.staticflickr.com', 'farm9.staticflickr.com'],
  },
  async rewrites() {
    return [
      {
        source: '/api/favorites/:username',
        destination: '/api/favorites?username=:username',
      },
    ]
  },
}

module.exports = nextConfig
