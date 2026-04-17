import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  reactStrictMode: false,
  env: {
    ABLY_API_KEY: process.env.ABLY_API_KEY,
  },
}

module.exports = nextConfig
