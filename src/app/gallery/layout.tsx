import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Precision Works & Machine Gallery | Bharat Machine Tools Bangalore",
  description:
    "Visual showcase of precision CNC spindles, heavy grinding machines, hydrostatic assemblies, defense actuators, and Bangalore plant craftsmanship.",
  keywords: [
    "Machine Tools Gallery",
    "BMT Machine Photos",
    "Spindle Assembly Photos Bangalore",
    "Heavy Grinding Gallery",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/gallery",
  },
  openGraph: {
    title: "Precision Works & Machine Gallery | Bharat Machine Tools",
    description:
      "Visual showcase of high-precision machining, assembly bays, and finished products at Bharat Machine Tools, Bangalore.",
    url: "https://bmtbharat.com/gallery",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT Gallery" }],
  },
}

export default function GalleryLayout({
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
        "name": "Machine Gallery & Works",
        "item": "https://bmtbharat.com/gallery"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {children}
    </>
  )
}
