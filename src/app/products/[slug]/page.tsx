"use client";

import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { CheckCircle, ArrowLeft, Plus, Check, CreditCard, RefreshCw } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types";
import { getProductBySlug, products as fallbackProducts } from "@/data/products";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { addItem, items } = useEnquiry();
  const { user, openAuthModal } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(getProductBySlug(slug) || null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDetail() {
      try {
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.product) {
            setProduct(data.product);
          }
        }
      } catch (err) {
        console.error('Error loading product details:', err);
      } finally {
        setLoading(false);
      }
    }

    async function loadRelated() {
      try {
        const res = await fetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.products) {
            const rel = data.products.filter((p: Product) => p.slug !== slug);
            setRelated(rel.slice(0, 3));
          }
        }
      } catch {
        setRelated(fallbackProducts.filter(p => p.slug !== slug).slice(0, 3));
      }
    }

    loadDetail();
    loadRelated();
  }, [slug]);

  if (loading && !product) {
    return (
      <div className="min-h-screen bg-[#f8fafc] pt-28 flex items-center justify-center text-blue-900">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const inCart = items.some((i) => i.product.id === product.id);
  const itemPrice = product.price || 10000;

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-900 text-xs font-bold uppercase tracking-wider transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Products Catalog
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 bg-slate-50 p-8 flex items-center justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="w-full aspect-square max-w-sm rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-block bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
                  </span>
                  <span className="text-xl font-mono font-bold text-blue-900">
                    ₹{itemPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 mb-4">{product.name}</h1>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {product.description}
                </p>

                {product.features && product.features.length > 0 && (
                  <div className="mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Key Features &amp; Specifications</h3>
                    <ul className="space-y-2">
                      {product.features.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle size={16} className="text-emerald-600 mt-0.5 shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-slate-200">
                <button
                  onClick={() => addItem(product!)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    inCart
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-blue-900 hover:bg-blue-800 text-white shadow-md shadow-blue-900/20"
                  }`}
                >
                  {inCart ? (
                    <><Check size={16} /> Added to Cart</>
                  ) : (
                    <><Plus size={16} /> Add to Cart &amp; Order</>
                  )}
                </button>

                <button
                  onClick={() => {
                    addItem(product!)
                    if (!user) {
                      openAuthModal("login")
                    } else {
                      setCheckoutOpen(true)
                    }
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-red-600/20"
                >
                  <CreditCard size={16} /> Order Now via Razorpay
                </button>
              </div>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              More Machine Tools in Catalog
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((rp) => (
                <Link
                  key={rp.id}
                  href={`/products/${rp.slug}`}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-400 transition-all group shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="aspect-[16/9] overflow-hidden bg-slate-50 border-b border-slate-100">
                      <img
                        src={rp.image}
                        alt={rp.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider">
                        {rp.category}
                      </span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1 group-hover:text-blue-900 transition-colors">
                        {rp.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {rp.shortDescription}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>

      <CheckoutModal isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </div>
  );
}
