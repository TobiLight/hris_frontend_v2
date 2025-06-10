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
      ? 'http://51.38.75.84/api' 
      : 'http://localhost:8000/api/'
  }
  // reactStrictMode: true,
}

export default nextConfig
