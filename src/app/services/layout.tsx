import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Machine Tool Services & Reconditioning | Bharat Machine Tools Bangalore",
  description:
    "Comprehensive machine tool rebuilding, slideway grinding up to 5 meters, Turcite scraping, laser interferometry alignment, and thermal spray coatings in Bangalore, India.",
  keywords: [
    "Machine Reconditioning Bangalore",
    "CNC Machine Overhaul India",
    "Thermal Spray Coatings HYOF PTA",
    "Slideway Grinding 5m Bed",
    "Turcite Scraping Bangalore",
    "Laser Interferometry Calibration",
    "Machine Tool Retrofit Bangalore",
  ],
  alternates: {
    canonical: "https://bmtbharat.com/services",
  },
  openGraph: {
    title: "Machine Tool Services & Reconditioning | Bharat Machine Tools",
    description:
      "Expert machine reconditioning, guideway grinding, Turcite scraping, laser calibration, and protective thermal coatings in Bangalore, India.",
    url: "https://bmtbharat.com/services",
    images: [{ url: "https://bmtbharat.com/logo.png", alt: "BMT Specialized Services" }],
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
