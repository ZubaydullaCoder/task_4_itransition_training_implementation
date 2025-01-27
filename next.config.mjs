/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
      };
    }

    // Add rule to ignore .html files
    config.module.rules.push({
      test: /\.html$/,
      loader: "ignore-loader",
    });

    return config;
  },
  images: {
    domains: ["localhost", "ibb.co", "media-hosting.imagekit.io"],
  },
};

export default nextConfig;
