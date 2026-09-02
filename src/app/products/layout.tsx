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

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
