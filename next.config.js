/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'photos.alisa.pics',
            port: '',
            pathname: '/b2api/v1/**',
          },
        ],
    },
}

module.exports = nextConfig
