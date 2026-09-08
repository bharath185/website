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
        return {
          "@type": "ListItem",
          "position": index + 1,
          "name": product.name,
          "url": `https://bmtbharat.com/products/${product.slug || product.id}`,
          "image": fullImg
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
