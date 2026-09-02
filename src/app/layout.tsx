import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { AuthProvider } from "@/context/AuthContext";
import ClientLayoutShell from "@/components/v2/ClientLayoutShell";
import AIAssistantBot from "@/components/AIAssistantBot";
import AuthModal from "@/components/AuthModal";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bmtbharat.com"),
  title: {
    default: "Bharat Machine Tools | Precision Machine Spindles & CNC Tooling Bangalore",
    template: "%s | Bharat Machine Tools Bangalore",
  },
  description:
    "Leading manufacturer and reconditioner of high-frequency motorized spindles, hydrostatic bearings, precision ball screws, planetary gearboxes, mandrels, defense actuators, and thermal coatings in Bangalore, India.",
  keywords: [
    "Bharat Machine Tools",
    "BMT Bangalore",
    "Machine Spindles Bangalore",
    "Motorized Spindles India",
    "Hydrostatic Bearings",
    "Precision Ball Screws India",
    "Planetary Gearboxes",
    "Precision Locknuts",
    "Flow Forming Machine Mandrels",
    "CNC Machine Reconditioning Bangalore",
    "Thermal Spray Coatings HYOF PTA",
    "Heavy Cylindrical Grinding 5m Bed",
    "Special Purpose Machine SPM Design",
    "Defense Leveling Actuators",
    "Turcite Scraping Bangalore",
    "Machine Tool Spares Karnataka",
    "High Precision Machine Tool Accessories",
  ],
  authors: [{ name: "Bharat Machine Tools", url: "https://bmtbharat.com" }],
  creator: "Bharat Machine Tools",
  publisher: "Bharat Machine Tools",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "https://bmtbharat.com",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon/favicon.ico",
    apple: "/favicon/apple-touch-icon.png",
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "Bharat Machine Tools | Precision Machine Spindles & CNC Tooling Bangalore",
    description:
      "Premier manufacturer of motorized spindles, hydrostatic bearings, precision ball screws, defense actuators, and complete CNC reconditioning in Bangalore, India.",
    url: "https://bmtbharat.com",
    siteName: "Bharat Machine Tools",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://bmtbharat.com/logo.png",
        width: 1200,
        height: 630,
        alt: "Bharat Machine Tools Bangalore",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bharat Machine Tools | Precision Machine Spindles & CNC Tooling",
    description:
      "Premier manufacturer of motorized spindles, hydrostatic bearings, precision ball screws, defense actuators, and turnkey machine tool retrofits in Bangalore, India.",
    images: ["https://bmtbharat.com/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="canonical" href="https://bmtbharat.com" />
        
        {/* Comprehensive Multi-Schema Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": ["LocalBusiness", "Organization"],
                  "@id": "https://bmtbharat.com/#organization",
                  "name": "Bharat Machine Tools",
                  "alternateName": "BMT Bangalore",
                  "url": "https://bmtbharat.com",
                  "logo": "https://bmtbharat.com/logo.png",
                  "image": "https://bmtbharat.com/logo.png",
                  "description": "High-precision machine tool manufacturing, motorized spindles, hydrostatic bearings, ball screws, defense actuators, and turnkey CNC reconditioning in Bangalore, India.",
                  "telephone": "+919880464557",
                  "email": "bmt.sangeeta@gmail.com",
                  "vatID": "29AAUFB7927K1ZK",
                  "taxID": "29AAUFB7927K1ZK",
                  "priceRange": "₹₹₹₹",
                  "founder": {
                    "@type": "Person",
                    "name": "Abbas Khan"
                  },
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "155/59, Lakshmipura Main Road, 2nd Cross, Abbigere Industrial Area, Chikkabanavara Post",
                    "addressLocality": "Bengaluru",
                    "addressRegion": "Karnataka",
                    "postalCode": "560090",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "13.0789",
                    "longitude": "77.5213"
                  },
                  "openingHoursSpecification": [
                    {
                      "@type": "OpeningHoursSpecification",
                      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                      "opens": "09:00",
                      "closes": "18:30"
                    }
                  ],
                  "sameAs": [
                    "https://www.facebook.com/bharatmachinetools",
                    "https://www.linkedin.com/company/bharat-machine-tools",
                    "https://twitter.com/bmtbharat"
                  ]
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bmtbharat.com/#website",
                  "url": "https://bmtbharat.com",
                  "name": "Bharat Machine Tools",
                  "description": "Precision Industrial Machinery, Spindles, and CNC Accessories in Bangalore",
                  "publisher": {
                    "@id": "https://bmtbharat.com/#organization"
                  },
                  "potentialAction": {
                    "@type": "SearchAction",
                    "target": "https://bmtbharat.com/products?search={search_term_string}",
                    "query-input": "required name=search_term_string"
                  }
                }
              ]
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <AuthProvider>
          <EnquiryProvider>
            <ClientLayoutShell>
              {children}
            </ClientLayoutShell>
            <AIAssistantBot />
            <AuthModal />
          </EnquiryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
