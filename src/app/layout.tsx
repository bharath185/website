import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EnquiryProvider } from "@/context/EnquiryContext";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIAssistantBot from "@/components/AIAssistantBot";
import AuthModal from "@/components/AuthModal";
import MobileBottomNav from "@/components/MobileBottomNav";
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
      { url: "https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg", type: "image/jpeg" },
      { url: "https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg", sizes: "32x32", type: "image/jpeg" },
      { url: "https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg", sizes: "16x16", type: "image/jpeg" },
    ],
    shortcut: "https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg",
    apple: "https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg",
  },
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
        url: "https://fplogoimages.withfloats.com/actual/687f42983064204ed5f1a18b.jpg",
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
        <link rel="icon" href="https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg" type="image/jpeg" />
        <link rel="shortcut icon" href="https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg" type="image/jpeg" />
        <link rel="apple-touch-icon" href="https://fplogoimages.withfloats.com/tile/687f42983064204ed5f1a18b.jpg" />
        <link rel="canonical" href="https://www.bmtbharat.com" />
      </head>
      <body className="min-h-full flex flex-col bg-[#f8fafc] text-slate-900">
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
        <AuthProvider>
          <EnquiryProvider>
            <Header />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <AIAssistantBot />
            <AuthModal />
            <MobileBottomNav />
          </EnquiryProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
