import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EnquiryProvider } from "@/context/EnquiryContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
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
    default: "Bharat Machine Tools | Precision Rollers, Bearings & Spindles Manufacturer",
    template: "%s | Bharat Machine Tools",
  },
  description:
    "Bharat Machine Tools — 28+ years of precision manufacturing in Peenya, Bengaluru. Specialists in rollers, bearings, spindles, machinery spares, and reconditioning services.",
  keywords: [
    "Bharat Machine Tools",
    "precision rollers",
    "bearings manufacturer",
    "spindles",
    "machinery spares",
    "industrial accessories",
    "roller reconditioning",
    "Peenya Bengaluru",
    "industrial machinery manufacturer",
  ],
  openGraph: {
    title: "Bharat Machine Tools",
    description:
      "Precision rollers, bearings, spindles & machinery spares manufacturer in Peenya, Bengaluru.",
    url: "https://bmtbharat.com",
    siteName: "Bharat Machine Tools",
    locale: "en_IN",
    type: "website",
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
        <link rel="canonical" href="https://bmtbharat.com" />
      </head>
      <body className="min-h-full flex flex-col">
        <EnquiryProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppButton />
        </EnquiryProvider>
      </body>
    </html>
  );
}
