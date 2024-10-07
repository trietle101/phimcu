/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        port: "",
        pathname: "/t/p/**"
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/(.*)", // Apply to all pages
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' https://vidsrc.to;` // Replace with your external iframe source
          },
          {
            key: "X-Frame-Options",
            value: "ALLOW-FROM https://vidsrc.to" // Allow the same source for iframe
          }
        ]
      }
    ];
  }
};

export default nextConfig;
