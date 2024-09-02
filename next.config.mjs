/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.habbo.es',
        pathname: '/habbo-imaging/**',
      },
    ],
  },
};

export default nextConfig;
