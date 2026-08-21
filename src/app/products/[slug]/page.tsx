import type { Metadata } from "next"
import { getProductBySlug } from "@/data/products"
import ProductDetailClientV2 from "@/components/v2/ProductDetailClientV2"
import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { Product } from "@/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function fetchProduct(slug: string): Promise<Product | undefined> {
  try {
    const dbProduct = await db.product.findUnique({
      where: { slug }
    })
    if (dbProduct) {
      let parsedImages: string[] = []
      if (dbProduct.images) {
        try {
          parsedImages = typeof dbProduct.images === 'string' ? JSON.parse(dbProduct.images) : dbProduct.images
        } catch {
          parsedImages = []
        }
      }
      if (!Array.isArray(parsedImages) || parsedImages.length === 0) {
        parsedImages = dbProduct.image ? [dbProduct.image] : []
      }

      return {
        ...dbProduct,
        image: parsedImages[0] || dbProduct.image || '',
        images: parsedImages,
        specifications: typeof dbProduct.specifications === 'string' ? JSON.parse(dbProduct.specifications) : (dbProduct.specifications || []),
        features: typeof dbProduct.features === 'string' ? JSON.parse(dbProduct.features) : (dbProduct.features || [])
      }
    }
  } catch (err) {
    console.error("Database query failed for product slug:", err)
  }
  return getProductBySlug(slug)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)
  if (!product) {
    return {
      title: "Product Not Found",
    }
  }
  return {
    title: `${product.name} | Bharat Machine Tools`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | Bharat Machine Tools`,
      description: product.shortDescription || product.description,
      url: `https://www.bmtbharat.com/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)
  if (!product) {
    notFound()
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.shortDescription || product.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price || 0,
      "availability": "https://schema.org/InStock",
      "url": `https://www.bmtbharat.com/products/${product.slug}`
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailClientV2 product={product} />
    </>
  )
}
