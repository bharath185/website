import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  devIndicators: false,
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "fplogoimages.withfloats.com" },
      { protocol: "https", hostname: "fpimages.withfloats.com" },
      { protocol: "https", hostname: "productimages.withfloats.com" },
      { protocol: "https", hostname: "bizimages.withfloats.com" },
      { protocol: "https", hostname: "fpfaviconimages.withfloats.com" },
    ],
  },
  async redirects() {
    return [
      // 1. Legacy Product & Search paths
      {
        source: '/Products/search/:term*/:page*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/products/search/:term*/:page*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/Products/search/:term*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/products/search/:term*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/search/:term*/:page*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/search/:term*',
        destination: '/products?search=:term*',
        permanent: true,
      },
      {
        source: '/all-products/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/all-products',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/featured-products/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/featured-products',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/Products',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/Products/:path*',
        destination: '/products/:path*',
        permanent: true,
      },

      // 2. Legacy Updates / News / Journal paths
      {
        source: '/latest-updates/:page*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/latest-updates',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/latest-update/:slug/:id',
        destination: '/news/:slug',
        permanent: true,
      },
      {
        source: '/latest-update/:slug',
        destination: '/news/:slug',
        permanent: true,
      },
      {
        source: '/Latest-news/:path*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/latest-news/:path*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/updates/:path*',
        destination: '/news',
        permanent: true,
      },

      // 3. Legacy Galleries & Media paths
      {
        source: '/videos/:path*',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/videos',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/image-gallery/:path*',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/image-gallery',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/gallery/:path*',
        destination: '/gallery',
        permanent: true,
      },

      // 4. Legacy Contact & Mapview paths
      {
        source: '/mapview/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/mapview',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contact-us',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/contactus',
        destination: '/contact',
        permanent: true,
      },

      // 5. Legacy About & Custom pages
      {
        source: '/about-us',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/aboutus',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/about',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custom-pages/:path*',
        destination: '/company-profile',
        permanent: true,
      },
    ];
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
