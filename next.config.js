/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  webpack: function (config, options) {
    config.externals.push({
      playwright: "playwright-core",
    });
    return config;
  },
};

module.exports = nextConfig;
