import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BMT Specialized Services & Machine Reconditioning | Bharat Machine Tools",
  description:
    "BMT (Bharat Machine Tools) comprehensive machine tool rebuilding, slideway grinding up to 5 meters, Turcite scraping, laser interferometry alignment, and thermal spray coatings in Bangalore, India.",
  keywords: [
    "BMT Services",
    "BMT Reconditioning",
    "BMT Machine Tools",
    "BMT Bangalore",
    "Machine Reconditioning Bangalore",
    "CNC Machine Overhaul India",
    "Thermal Spray Coatings HYOF PTA",
    "Slideway Grinding 5m Bed",
    "Turcite Scraping Bangalore",
    "Laser Interferometry Calibration",
    "Machine Tool Retrofit Bangalore",
  ],
  alternates: {
    canonical: "https://www.bmtbharat.com/services",
  },
  openGraph: {
    title: "BMT Services & Machine Reconditioning | Bharat Machine Tools",
    description:
      "Expert machine reconditioning, guideway grinding, Turcite scraping, laser calibration, and protective thermal coatings by BMT in Bangalore, India.",
    url: "https://www.bmtbharat.com/services",
    images: [{ url: "https://www.bmtbharat.com/logo.png", alt: "BMT Specialized Services" }],
  },
}

export default function ServicesLayout({
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
        "item": "https://www.bmtbharat.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services & Capabilities",
        "item": "https://www.bmtbharat.com/services"
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
