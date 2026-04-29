/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',  // CRITICAL for Cloud Run Docker build
  images: { remotePatterns: [{ protocol: 'https', hostname: '**' }] },
  experimental: { serverActions: { allowedOrigins: ['*'] } }
};
export default nextConfig;
