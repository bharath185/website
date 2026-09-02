import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Engineering Desk | Bharat Machine Tools Bangalore",
  description:
    "Get in touch with Bharat Machine Tools for custom machine spindle design, technical RFQs, and machine reconditioning inquiries. Works at Abbigere Industrial Area, Bengaluru.",
  keywords: [
    "Contact Bharat Machine Tools",
    "BMT Bangalore phone number",
    "Abbas Khan Machine Tools",
    "Abbigere Industrial Area Machine Tools",
    "Machine Tool RFQ Bangalore",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/contact",
  },
  openGraph: {
    title: "Contact Engineering Desk | Bharat Machine Tools",
    description:
      "Connect with our senior engineering specialists in Bangalore for rapid technical quotations and site consultation.",
    url: "https://bmtbharat.com/contact",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "Contact BMT" }],
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
