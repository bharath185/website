import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fplogoimages.withfloats.com" },
      { protocol: "https", hostname: "fpimages.withfloats.com" },
      { protocol: "https", hostname: "productimages.withfloats.com" },
      { protocol: "https", hostname: "bizimages.withfloats.com" },
      { protocol: "https", hostname: "fpfaviconimages.withfloats.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-DNS-Prefetch-Control", value: "on" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "origin-when-cross-origin" },
        ],
      },
    ];
  },
};

export default nextConfig;
