const path = require("path");
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    RAPID_API_KEY1: process.env.RAPID_API_KEY1,
    RAPID_API_KEY2: process.env.RAPID_API_KEY2,
    RAPID_API_KEY3: process.env.RAPID_API_KEY3,
    RAPID_API_KEY4: process.env.RAPID_API_KEY4,
    RAPID_API_KEY5: process.env.RAPID_API_KEY5,
    RAPID_API_KEY6: process.env.RAPID_API_KEY6,
    RAPID_API_KEY7: process.env.RAPID_API_KEY7,
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
