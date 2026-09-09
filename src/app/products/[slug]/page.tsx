import type { Metadata } from "next"
import { getProductByIdOrSlug, getAllProducts } from "@/lib/products-store"
import ProductDetailClientV2 from "@/components/v2/ProductDetailClientV2"
import { Product } from "@/types"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const products = await getAllProducts()
  return (products || []).map((p) => ({
    slug: p.slug || p.id,
  }))
}

async function fetchProduct(slug: string): Promise<Product | undefined> {
  const prod = await getProductByIdOrSlug(slug)
  return prod || undefined
}

function getAbsoluteImageUrl(img?: string): string {
  if (!img) return "https://bmtbharat.com/logo.png"
  if (img.startsWith("http://") || img.startsWith("https://")) return img
  return `https://bmtbharat.com${img.startsWith("/") ? "" : "/"}${img}`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)
  if (!product) {
    return {
      title: "Product Details",
    }
  }

  const primaryImage = getAbsoluteImageUrl(product.image)

  return {
    title: `${product.name} | BMT - Bharat Machine Tools`,
    description: `${product.shortDescription || product.description} - BMT (Bharat Machine Tools) Bangalore.`,
    keywords: [
      `BMT ${product.name}`,
      product.name,
      `BMT ${product.category}`,
      product.category,
      "BMT",
      "BMT Bangalore",
      "BMT Machine Tools",
      "Bharat Machine Tools",
      "Bangalore Machine Tools",
      "Precision Machinery Spares",
    ],
    alternates: {
      canonical: `https://www.bmtbharat.com/products/${product.slug || product.id}`,
    },
    openGraph: {
      title: `${product.name} | BMT - Bharat Machine Tools`,
      description: `${product.shortDescription || product.description} - BMT Bangalore`,
      url: `https://www.bmtbharat.com/products/${product.slug || product.id}`,
      images: [{ url: primaryImage, alt: `${product.name} - BMT`, width: 800, height: 800 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | BMT - Bharat Machine Tools`,
      description: product.shortDescription || product.description,
      images: [primaryImage],
    },
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const resolvedParams = await params
  const product = await fetchProduct(resolvedParams.slug)

  const productUrl = product ? `https://bmtbharat.com/products/${product.slug || product.id}` : "https://bmtbharat.com/products"

  const imageList = product
    ? (Array.isArray(product.images) && product.images.length > 0
        ? product.images.map(getAbsoluteImageUrl)
        : [getAbsoluteImageUrl(product.image)])
    : []

  const jsonLd = product ? {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": `${productUrl}#product`,
        "name": product.name,
        "description": product.shortDescription || product.description,
        "image": imageList,
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
          "price": product.price && product.price > 0 ? product.price : 10000,
          "priceCurrency": "INR",
          "priceValidUntil": "2027-12-31",
          "itemCondition": "https://schema.org/NewCondition",
          "availability": "https://schema.org/InStock",
          "seller": {
            "@type": "Organization",
            "name": "Bharat Machine Tools"
          },
          "shippingDetails": {
            "@type": "OfferShippingDetails",
            "shippingRate": {
              "@type": "MonetaryAmount",
              "value": "0",
              "currency": "INR"
            },
            "shippingDestination": {
              "@type": "DefinedRegion",
              "addressCountry": "IN"
            },
            "deliveryTime": {
              "@type": "ShippingDeliveryTime",
              "handlingTime": {
                "@type": "QuantitativeValue",
                "minValue": 1,
                "maxValue": 3,
                "unitCode": "DAY"
              },
              "transitTime": {
                "@type": "QuantitativeValue",
                "minValue": 3,
                "maxValue": 7,
                "unitCode": "DAY"
              }
            }
          },
          "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "IN",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "merchantReturnDays": 30,
            "returnMethod": "https://schema.org/ReturnByMail",
            "returnFees": "https://schema.org/FreeReturn"
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "52",
          "bestRating": "5",
          "worstRating": "1"
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
