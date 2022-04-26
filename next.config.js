/** @type {import('next').NextConfig} */
const nextTranslate = require("next-translate");
const path = require("path");

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["d1052pu3rm1xk9.cloudfront.net"],
  },
  env: {
    API_BASE_URL: "https://www.spotahome.com/api/public/listings/search/",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "."), path.join(__dirname, "styles")],
  },
  async rewrites() {
    return [
      { source: "/:city*", destination: "/:city*" },
      { source: "/", destination: "/madrid" },
    ];
  },
  ...nextTranslate(),
};

module.exports = nextConfig;
