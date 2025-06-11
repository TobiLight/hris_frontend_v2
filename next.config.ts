// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    API_BASE_URL: process.env.NODE_ENV === 'production' 
      ? 'http://127.0.0.1:8000'  // Internal communication
      : 'http://localhost:8000'
  },
  // Configure for production
  poweredByHeader: false,
  compress: true,
  // reactStrictMode: true,
}

export default nextConfig
