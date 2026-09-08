import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Precision Machine Spindles & CNC Tooling Catalogue | Bharat Machine Tools Bangalore",
  description:
    "Explore precision CNC machine spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, locknuts, mandrels, and machine tool spares manufactured in Bangalore, India.",
  keywords: [
    "Machine Spindles Bangalore",
    "Motorized Spindles India",
    "Hydrostatic Bearings",
    "Precision Ball Screws Bangalore",
    "Planetary Gearboxes",
    "Precision Locknuts",
    "Flow Forming Machine Mandrels",
    "CNC Accessories India",
    "Bharat Machine Tools Products",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/products",
  },
  openGraph: {
    title: "Precision Machine Spindles & CNC Tooling Catalogue | Bharat Machine Tools",
    description:
      "Explore precision CNC machine spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, locknuts, mandrels, and machine tool spares in Bangalore, India.",
    url: "https://bmtbharat.com/products",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT Products Catalogue" }],
  },
}

import productsLive from "@/data/products-live.json"

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
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
        "name": "Products Catalogue",
        "item": "https://bmtbharat.com/products"
      }
    ]
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Bharat Machine Tools Precision Catalog",
    "itemListElement": (productsLive || []).map((product, index) => {
      const prodUrl = `https://www.bmtbharat.com/products/${product.slug || product.id}`
      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.name,
          "url": prodUrl,
          "image": product.image,
          "description": product.shortDescription || product.description,
          "sku": product.id || `bmt-${index + 1}`,
          "mpn": product.id || `bmt-${index + 1}`,
          "brand": {
            "@type": "Brand",
            "name": "Bharat Machine Tools"
          },
          "offers": {
            "@type": "Offer",
            "url": prodUrl,
            "price": (product as any).price && (product as any).price > 0 ? (product as any).price : 10000,
            "priceCurrency": "INR",
            "itemCondition": "https://schema.org/NewCondition",
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": "Bharat Machine Tools"
            }
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "48",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      }
    })
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  )
}
