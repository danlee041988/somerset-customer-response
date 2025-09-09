/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ensure proper serverless function configuration
  experimental: {
    serverComponentsExternalPackages: ['@anthropic-ai/sdk']
  },
  
  // Optimize for serverless deployment
  outputFileTracing: true,
  
  // Ensure proper runtime configuration
  eslint: {
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig