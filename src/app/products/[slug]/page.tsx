import type { Metadata } from "next"
import { getProductByIdOrSlug } from "@/lib/products-store"
import ProductDetailClientV2 from "@/components/v2/ProductDetailClientV2"
import { Product } from "@/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

async function fetchProduct(slug: string): Promise<Product | undefined> {
  const prod = await getProductByIdOrSlug(slug)
  return prod || undefined
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)
  if (!product) {
    return {
      title: "Product Details",
    }
  }
  return {
    title: product.name,
    description: product.shortDescription || product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription || product.description,
      url: `https://www.bmtbharat.com/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)

  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: "Bharat Machine Tools",
    },
    offers: {
      "@type": "Offer",
      price: product.price || 0,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
  } : null

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <ProductDetailClientV2 product={product} slug={resolvedParams.slug} />
    </>
  )
}
