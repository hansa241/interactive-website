import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    STREETVIEW_API_KEY: process.env.STREETVIEW_API_KEY,
    STREETVIEW_USERNAME: process.env.STREETVIEW_USERNAME,
    STREETVIEW_PASSWORD: process.env.STREETVIEW_PASSWORD,
  },
};

export default nextConfig;
