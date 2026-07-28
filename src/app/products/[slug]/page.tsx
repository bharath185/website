"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { products, getProductBySlug } from "@/data/products";
import { useEnquiry } from "@/context/EnquiryContext";
import { CheckCircle, ArrowLeft, Package } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const { addItem, items } = useEnquiry();

  if (!product) {
    notFound();
  }

  const inEnquiry = items.some((i) => i.product.id === product.id);

  const related = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back to Products
        </Link>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 bg-gray-100 p-12 flex items-center justify-center">
              <div className="w-48 h-48 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                <Package size={80} className="text-primary/40" />
              </div>
            </div>

            <div className="lg:col-span-3 p-8 lg:p-10">
              <span className="inline-block bg-accent/10 text-accent text-xs font-semibold px-3 py-1 rounded-full capitalize mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {product.description}
              </p>

              {product.features && product.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">Features & Specifications</h3>
                  <ul className="space-y-2">
                    {product.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle size={18} className="text-green-500 mt-0.5 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <button
                onClick={() => addItem(product)}
                className={`px-8 py-3 rounded-lg font-semibold text-base transition-all ${
                  inEnquiry
                    ? "bg-green-100 text-green-700 cursor-default"
                    : "bg-accent text-white hover:bg-accent-hover active:scale-[0.98]"
                }`}
              >
                {inEnquiry ? "Added to Enquiry" : "Add to Enquiry"}
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              More in {product.category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Package size={24} className="text-primary" />
                  </div>
                  <span className="text-xs font-semibold text-accent capitalize">
                    {rp.category}
                  </span>
                  <h3 className="font-semibold text-gray-900 mt-1">{rp.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{rp.shortDescription}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
