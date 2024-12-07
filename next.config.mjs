/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback.fs = false; // Evitar problemas com pacotes que dependem de 'fs'
    }
    return config;
  },
};

export default nextConfig;
