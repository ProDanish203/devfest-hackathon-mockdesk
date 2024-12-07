const path = require("path");
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    RAPID_API_KEY: process.env.RAPID_API_KEY,
    RAPID_API_HOST: process.env.RAPID_API_HOST,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias["yjs"] = path.resolve(__dirname, "node_modules/yjs");
    }
    return config;
  },
};

export default nextConfig;
