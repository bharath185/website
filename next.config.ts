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
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
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
      // 1. Legacy Product Search & Catalog paths -> /products
      {
        source: '/search/:term*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/search',
        destination: '/products',
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
        source: '/catalog/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/catalog',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/catalogue/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/catalogue',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/category',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/categories/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/categories',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/all-categories/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/all-categories',
        destination: '/products',
        permanent: true,
      },

      // 2. Legacy Tag Pages & Tagged Items (NowFloats / Old Platform) -> /products
      {
        source: '/tag/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tag',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tags/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tags',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tagged/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tagged',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/items-tagged-with/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/items-tagged-with-:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/item-tagged-with/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/items-tagged/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/item-tagged/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/tag-products/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-tag/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/product-tags/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/products/tag/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/all-tags/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/all-tags',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/keywords/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/keyword/:path*',
        destination: '/products',
        permanent: true,
      },

      // 3. Specific Google-Indexed Tag/Page Slugs -> /products
      {
        source: '/available/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/available',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/high-efficiency/:path*',
        destination: '/products',
        permanent: true,
      },
      {
        source: '/high-efficiency',
        destination: '/products',
        permanent: true,
      },

      // 4. Legacy Updates / News / Journal paths -> /news
      {
        source: '/latest-updates/:path*',
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
        source: '/latest-news/:path*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/latest-news',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/updates/:path*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/updates',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/updates/tag/:path*',
        destination: '/news',
        permanent: true,
      },
      {
        source: '/news/tag/:path*',
        destination: '/news',
        permanent: true,
      },

      // 5. Legacy Galleries & Media paths -> /gallery
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
        source: '/photos/:path*',
        destination: '/gallery',
        permanent: true,
      },
      {
        source: '/photos',
        destination: '/gallery',
        permanent: true,
      },

      // 6. Legacy Contact & Mapview paths -> /contact
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
      {
        source: '/feedback/:path*',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/feedback',
        destination: '/contact',
        permanent: true,
      },

      // 7. Legacy About & Custom pages -> /company-profile
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
        source: '/custom-pages/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custom-pages',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custom-page/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custom-page',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custompages/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custompages',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custompage/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/custompage',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/pages/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/pages',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/page/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/page',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/testimonials/:path*',
        destination: '/company-profile',
        permanent: true,
      },
      {
        source: '/testimonials',
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
