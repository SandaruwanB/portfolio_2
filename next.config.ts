import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  // Only enforce static export during production build, 
  // allowing new dynamic Firestore products/blogs to be viewed in dev mode
  ...(isProd ? { output: "export" } : {}),
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
