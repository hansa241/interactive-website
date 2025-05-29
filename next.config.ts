import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STREETVIEW_API_KEY: process.env.STREETVIEW_API_KEY,
  },
};

export default nextConfig;
