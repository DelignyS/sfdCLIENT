/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "http://localhost:3333",
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  output: 'export',
};



export default nextConfig;
