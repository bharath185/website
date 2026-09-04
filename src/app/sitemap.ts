import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products-store'
import { newsData } from '@/data/news'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bmtbharat.com'
  const currentDate = new Date()

  // 1. Core Static Authority Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/servicing-and-reconditioning`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/services/thermal-process-and-coatings`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/company-profile`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/news`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/enquiry`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // 2. Dynamic Product Pages from Database
  let productRoutes: MetadataRoute.Sitemap = []
  try {
    const products = await getAllProducts()
    productRoutes = products.map((product) => ({
      url: `${baseUrl}/products/${product.slug || product.id}`,
      lastModified: (product as any).updatedAt ? new Date((product as any).updatedAt) : currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))
  } catch (err) {
    console.error('Error generating product sitemap entries:', err)
  }

  // 3. Technical Articles & News Journal Pages
  const newsMap = new Map<string, MetadataRoute.Sitemap[number]>()

  // Add static news data
  for (const article of newsData || []) {
    const slug = article.slug || article.id
    newsMap.set(slug, {
      url: `${baseUrl}/news/${slug}`,
      lastModified: article.date ? new Date(article.date) : currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })
  }

  // Add dynamic DB update posts
  try {
    const { db } = await import('@/lib/db')
    const dbPosts = await db.updatePost.findMany({
      select: { slug: true, updatedAt: true, createdAt: true },
    })
    for (const post of dbPosts) {
      newsMap.set(post.slug, {
        url: `${baseUrl}/news/${post.slug}`,
        lastModified: post.updatedAt || post.createdAt || currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })
    }
  } catch (err) {
    // Graceful fallback if database is not reachable at build/sitemap time
  }

  const newsRoutes: MetadataRoute.Sitemap = Array.from(newsMap.values())

  return [...staticRoutes, ...productRoutes, ...newsRoutes]
}
