import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin',
          '/admin/',
          '/api/admin/',
          '/api/auth/',
          '/BMT_Ayudha_Puja_Invitation_Lite.html',
          '/invitation',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/admin/', '/BMT_Ayudha_Puja_Invitation_Lite.html', '/invitation'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/admin/', '/BMT_Ayudha_Puja_Invitation_Lite.html', '/invitation'],
      },
    ],
    sitemap: [
      'https://www.bmtbharat.com/sitemap.xml',
      'https://www.bmtbharat.com/sitemap-main.xml',
      'https://www.bmtbharat.com/sitemap_index.xml'
    ],
    host: 'https://www.bmtbharat.com',
  }
}
