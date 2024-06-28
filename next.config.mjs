/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["5z7s3l5v-3000.inc1.devtunnels.ms", "localhost:3000"]
    }
  }
};

export default nextConfig;
