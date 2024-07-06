/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "awsrcjb40a898fb35e44c6856bf06c6a6aa4ef142116-dev.s3.amazonaws.com",
    ],
  },
};

module.exports = nextConfig;
