/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dailymed.nlm.nih.gov",
      },
    ],
  },
};

export default nextConfig;
