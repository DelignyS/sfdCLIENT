/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_URL: "https://apiforspotfordev.onrender.com",
  },
  images: {
    domains: ['localhost'],
    unoptimized: true,
  },
  output: 'export',
};



export default nextConfig;
