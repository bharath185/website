import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers & Engineering Vacancies | Bharat Machine Tools Bangalore",
  description:
    "Join our high-precision manufacturing engineering team in Bangalore. Openings for Spindle Designers, Metrology Engineers, CNC Programmers, and Machinists.",
  keywords: [
    "Machine Tool Jobs Bangalore",
    "Spindle Design Engineer Jobs",
    "CNC Programmer Vacancies Bangalore",
    "Mechanical Engineering Careers BMT",
    "Machinist Jobs Bangalore",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/careers",
  },
  openGraph: {
    title: "Careers & Engineering Vacancies | Bharat Machine Tools",
    description:
      "Explore engineering and craftsmanship career opportunities at Bharat Machine Tools, Bangalore.",
    url: "https://bmtbharat.com/careers",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT Careers" }],
  },
}

export default function CareersLayout({
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
        "name": "Careers & Vacancies",
        "item": "https://bmtbharat.com/careers"
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
