import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { AuthProvider } from "@/context/AuthContext";
import V2Header from "@/components/v2/V2Header";
import V2Footer from "@/components/v2/V2Footer";
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
  title: {
    default: "Bharat Machine Tools in Bangalore",
    template: "%s | Bharat Machine Tools",
  },
  description:
    "Discover wide range of Machinery, Bearings, SPINDLES, accessories, Ball Screws, Drive Ring, Flow Forming Machine Mandrels, GearBox, LOCKNUTS and more Products in Bangalore. Browse Bharat Machine Tools for more Products. Order Online!",
  keywords: [
    "Bharat Machine Tools",
    "Machinery",
    "Bearings",
    "SPINDLES",
    "accessories",
    "Ball Screws",
    "Drive Ring",
    "Flow Forming Machine Mandrels",
    "GearBox",
    "LOCKNUTS",
    "Bangalore",
  ],
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
    title: "Bharat Machine Tools in Bangalore",
    description:
      "Discover wide range of Machinery, Bearings, SPINDLES, accessories, Ball Screws, Drive Ring, Flow Forming Machine Mandrels, GearBox, LOCKNUTS and more Products in Bangalore.",
    url: "https://www.bmtbharat.com",
    siteName: "Bharat Machine Tools",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://www.bmtbharat.com/images/logo.jpg",
        alt: "Bharat Machine Tools",
      },
    ],
  },
  robots: { index: true, follow: true },
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
        <link rel="canonical" href="https://www.bmtbharat.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Bharat Machine Tools",
              "image": "https://www.bmtbharat.com/images/logo.jpg",
              "telephone": "+919530208882",
              "email": "contact@bmtbharat.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Peenya Industrial Area",
                "addressLocality": "Bangalore",
                "addressRegion": "Karnataka",
                "addressCountry": "IN",
                "postalCode": "560058"
              },
              "url": "https://www.bmtbharat.com"
            })
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <AuthProvider>
          <EnquiryProvider>
            <V2Header />
            <main className="flex-1 relative z-10 w-full">{children}</main>
            <V2Footer />
            <AIAssistantBot />
            <AuthModal />
          </EnquiryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
