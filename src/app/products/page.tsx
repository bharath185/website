import type { Metadata } from "next";
import ProductsPageClient from "@/components/ProductsPageClient";

export const metadata: Metadata = {
  title: "Industrial Machine Tools & Accessories | Bharat Machine Tools",
  description: "Browse our premium range of precision machine tools manufactured in Bangalore. Including hydrostatic spindles, cross roller bearings, ball screws, reeling rollers, and custom SPM machinery.",
  openGraph: {
    title: "Industrial Machine Tools & Accessories | Bharat Machine Tools",
    description: "Browse our premium range of precision machine tools manufactured in Bangalore. Including hydrostatic spindles, cross roller bearings, ball screws, reeling rollers, and custom SPM machinery.",
    url: "https://www.bmtbharat.com/products",
  }
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
