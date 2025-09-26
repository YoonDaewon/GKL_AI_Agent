/** @type {import('next').NextConfig} */
const dotenv = require("dotenv");
const path = require("path");

const envFile = ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

const nextConfig = {
  // reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
  output: "standalone",
  assetPrefix: process.env.NEXT_PUBLIC_CDN_URL,
};

module.exports = nextConfig;
