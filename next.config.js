/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Standalone output for flexible deployment
  output: "standalone",
  experimental: {
    // Ensure app/ directory routing
    turbo: {},
  },
};

module.exports = nextConfig;
