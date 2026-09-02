import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | Bharat Machine Tools Bangalore",
  description:
    "Common questions about machine tool manufacturing, custom SPM design, spindle repair timelines, thermal coatings, logistics, and warranty at Bharat Machine Tools.",
  keywords: [
    "Bharat Machine Tools FAQ",
    "Spindle repair timeline Bangalore",
    "Custom SPM manufacturing FAQ",
    "Thermal coating queries BMT",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/faq",
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | Bharat Machine Tools",
    description:
      "Answers to common engineering, quotation, and manufacturing questions at Bharat Machine Tools.",
    url: "https://bmtbharat.com/faq",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT FAQ" }],
  },
}

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
