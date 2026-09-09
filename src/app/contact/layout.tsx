import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact BMT Engineering Desk | Bharat Machine Tools Bangalore",
  description:
    "Get in touch with BMT (Bharat Machine Tools) for custom machine spindle design, technical RFQs, and machine reconditioning inquiries. Works at Abbigere Industrial Area, Bengaluru.",
  keywords: [
    "Contact BMT",
    "BMT Bangalore phone number",
    "BMT Machine Tools contact",
    "Contact Bharat Machine Tools",
    "Abbas Khan Machine Tools",
    "Abbigere Industrial Area Machine Tools",
    "Machine Tool RFQ Bangalore",
  ],
  alternates: {
    canonical: "https://www.bmtbharat.com/contact",
  },
  openGraph: {
    title: "Contact BMT Engineering Desk | Bharat Machine Tools",
    description:
      "Connect with BMT senior engineering specialists in Bangalore for rapid technical quotations and site consultation.",
    url: "https://www.bmtbharat.com/contact",
    images: [{ url: "https://www.bmtbharat.com/logo.png", alt: "Contact BMT" }],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const contactSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ContactPage",
        "@id": "https://bmtbharat.com/contact/#contact",
        "name": "Contact Bharat Machine Tools",
        "description": "Contact our engineering and sales specialists in Bangalore for rapid technical quotations and factory visits.",
        "url": "https://bmtbharat.com/contact",
        "mainEntity": {
          "@type": "Organization",
          "name": "Bharat Machine Tools",
          "telephone": "+919880464557",
          "email": "bmt.sangeeta@gmail.com",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "155/59, Lakshmipura Main Road, 2nd Cross, Abbigere Industrial Area, Chikkabanavara Post",
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "postalCode": "560090",
            "addressCountry": "IN"
          }
        }
      },
      {
        "@type": "BreadcrumbList",
        "@id": "https://bmtbharat.com/contact/#breadcrumb",
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
            "name": "Contact Us",
            "item": "https://bmtbharat.com/contact"
          }
        ]
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      {children}
    </>
  )
}
