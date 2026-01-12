import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static exports for better SEO and performance
  output: 'export',
  trailingSlash: true,
  
  // Image optimization
  images: {
    unoptimized: true, // Required when using output: 'export'
  },
  
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;
