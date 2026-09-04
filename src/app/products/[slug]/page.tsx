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
    title: `${product.name} | Bharat Machine Tools Bangalore`,
    description: product.shortDescription || product.description,
    keywords: [
      product.name,
      product.category,
      "Bharat Machine Tools",
      "Bangalore Machine Tools",
      "Precision Machinery Spares",
    ],
    alternates: {
      canonical: `https://bmtbharat.com/products/${product.slug || product.id}`,
    },
    openGraph: {
      title: `${product.name} | Bharat Machine Tools`,
      description: product.shortDescription || product.description,
      url: `https://bmtbharat.com/products/${product.slug || product.id}`,
      images: [{ url: product.image, alt: product.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | Bharat Machine Tools`,
      description: product.shortDescription || product.description,
      images: [product.image],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)

  const productUrl = product ? `https://bmtbharat.com/products/${product.slug || product.id}` : "https://bmtbharat.com/products"

  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        "name": product.name,
        "description": product.shortDescription || product.description,
        "image": product.image.startsWith("http") ? product.image : `https://bmtbharat.com${product.image.startsWith("/") ? "" : "/"}${product.image}`,
        "category": product.category,
        "sku": product.id,
        "mpn": product.id,
        "brand": {
          "@type": "Brand",
          "name": "Bharat Machine Tools"
        },
        "manufacturer": {
          "@type": "Organization",
          "name": "Bharat Machine Tools",
          "url": "https://bmtbharat.com"
        },
        "offers": {
          "@type": "Offer",
          "url": productUrl,
          "price": product.price || 0,
          "priceCurrency": "INR",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Bharat Machine Tools"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${productUrl}#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://bmtbharat.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Products",
            "item": "https://bmtbharat.com/products"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": product.name,
            "item": productUrl
          }
        ]
      }
    ]
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
