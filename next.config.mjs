/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: '',
        pathname: "/u/**"
      }
    ]
  },
  experimental: {
    serverActions: {
      allowedOrigins: ["5z7s3l5v-3000.inc1.devtunnels.ms", "localhost:3000"]
    }
  }
};

export default nextConfig;
