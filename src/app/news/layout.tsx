import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Technical Journal & Industry Updates | Bharat Machine Tools Bangalore",
  description:
    "Engineering insights, machine maintenance guides, spindle technology articles, and precision bearing selection whitepapers by Bharat Machine Tools.",
  keywords: [
    "Machine Tool Technical Journal",
    "Spindle Maintenance Articles",
    "Precision Bearings Engineering Guide",
    "BMT Bangalore News",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/news",
  },
  openGraph: {
    title: "Technical Journal & Industry Updates | Bharat Machine Tools",
    description:
      "Engineering insights, spindle maintenance whitepapers, and manufacturing updates from Bharat Machine Tools Bangalore.",
    url: "https://bmtbharat.com/news",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT Technical Journal" }],
  },
}

export default function NewsLayout({
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
        "name": "Technical Journal & News",
        "item": "https://bmtbharat.com/news"
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
