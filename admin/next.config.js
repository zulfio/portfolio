/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sin1.contabostorage.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  /*
    fix file change detection issue in vagrant or windows:
    webpackDevMiddleware: (config) => {
      // Solve compiling problem via vagrant
      config.watchOptions = {
        poll: 1000,   // Check for changes every second
        aggregateTimeout: 300,   // delay before rebuilding
      };
      return config;
    }
  */
};

module.exports = nextConfig;
