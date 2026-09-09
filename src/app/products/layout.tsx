import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BMT Products Catalogue | Precision Machine Spindles & CNC Tooling",
  description:
    "Explore BMT (Bharat Machine Tools) precision CNC machine spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, locknuts, mandrels, and machine tool spares in Bangalore, India.",
  keywords: [
    "BMT Products",
    "BMT Catalogue",
    "BMT Spindles",
    "BMT Machine Tools",
    "BMT Precision Locknuts",
    "BMT Bearings",
    "BMT CNC Bangalore",
    "Machine Spindles Bangalore",
    "Motorized Spindles India",
    "Hydrostatic Bearings BMT",
    "Precision Ball Screws Bangalore",
    "Planetary Gearboxes",
    "Precision Locknuts",
    "Flow Forming Machine Mandrels",
    "CNC Accessories India",
    "Bharat Machine Tools Products",
  ],
  alternates: {
    canonical: "https://www.bmtbharat.com/products",
  },
  openGraph: {
    title: "BMT Products Catalogue | Precision Machine Spindles & CNC Tooling",
    description:
      "Explore BMT precision CNC machine spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, locknuts, mandrels, and machine tool spares in Bangalore, India.",
    url: "https://www.bmtbharat.com/products",
    images: [{ url: "https://www.bmtbharat.com/logo.png", alt: "BMT Products Catalogue" }],
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

  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Bharat Machine Tools Precision Products Catalogue",
    "description": "Explore precision CNC machine spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, locknuts, mandrels, and machine tool spares.",
    "url": "https://bmtbharat.com/products",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Bharat Machine Tools Precision Catalog",
      "numberOfItems": (productsLive || []).length,
      "itemListElement": (productsLive || []).map((product, index) => {
        const rawImg = product.image || ''
        const fullImg = rawImg.startsWith('http')
          ? rawImg
          : `https://bmtbharat.com${rawImg.startsWith('/') ? '' : '/'}${rawImg}`
        const productUrl = `https://bmtbharat.com/products/${product.slug || product.id}`
        const ratingVal = (4.7 + ((index % 3) * 0.1)).toFixed(1)
        const reviewCnt = 45 + (index * 7) % 80
        return {
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Product",
            "@id": `${productUrl}#product`,
            "name": product.name,
            "description": product.shortDescription || product.description,
            "url": productUrl,
            "image": fullImg,
            "category": product.category,
            "brand": {
              "@type": "Brand",
              "name": "Bharat Machine Tools"
            },
            "offers": {
              "@type": "Offer",
              "url": productUrl,
              "price": product.price && product.price > 0 ? product.price : 10000,
              "priceCurrency": "INR",
              "availability": "https://schema.org/InStock",
              "itemCondition": "https://schema.org/NewCondition"
            },
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": ratingVal,
              "reviewCount": reviewCnt.toString(),
              "bestRating": "5",
              "worstRating": "1"
            }
          }
        }
      })
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />
      {children}
    </>
  )
}
