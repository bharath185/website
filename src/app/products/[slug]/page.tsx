import type { Metadata } from "next";
import { getProductBySlug } from "@/data/products";
import ProductDetailPageClient from "@/components/ProductDetailPageClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  return {
    title: `${product.name} | Bharat Machine Tools`,
    description: product.shortDescription || product.description,
    openGraph: {
      title: `${product.name} | Bharat Machine Tools`,
      description: product.shortDescription || product.description,
      url: `https://www.bmtbharat.com/products/${product.slug}`,
      images: [{ url: product.image, alt: product.name }],
    },
  };
}

export default async function ProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": product.image,
    "description": product.shortDescription || product.description,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": product.price,
      "availability": "https://schema.org/InStock",
      "url": `https://www.bmtbharat.com/products/${product.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailPageClient slug={resolvedParams.slug} initialProduct={product} />
    </>
  );
}
