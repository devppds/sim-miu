/** @type {import('next').NextConfig} */
const nextConfig = {
  // Memberitahu Next.js untuk tidak membuat folder cache yang besar
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.cache = false;
    }
    return config;
  },
};

export default nextConfig;
