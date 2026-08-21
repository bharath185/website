import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products-store'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.bmtbharat.com'

  // Base routes
  const routes = [
    '',
    '/products',
    '/contact',
    '/enquiry',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Product routes from live DB
  const products = await getAllProducts()
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  return [...routes, ...productRoutes]
}
