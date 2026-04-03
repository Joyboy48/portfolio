/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        // ...other experimental options
    },
    serverExternalPackages: [
        '@react-email/render',
    ],
    outputFileTracingRoot: './.next',
}

module.exports = nextConfig
