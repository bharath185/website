"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useEnquiry } from "@/context/EnquiryContext";
import { CheckCircle, ArrowLeft, Plus, Check, CreditCard, RefreshCw, Info, Send } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CheckoutModal from "@/components/CheckoutModal";
import { Product } from "@/types";
import { products as fallbackProducts } from "@/data/products";

// Technical callouts for product photos
interface Hotspot {
  x: string // left %
  y: string // top %
  title: string
  description: string
}

const HOTSPOTS_DATA: Record<string, Hotspot[]> = {
  "spm-front.jpg": [
    { x: "66%", y: "46%", title: "Precision Spindle Chuck", description: "Hardened steel main chuck housing designed for extreme rotational accuracy and direct part swaging." },
    { x: "24%", y: "65%", title: "Cast V-Belt Pulley", description: "Brown multi-groove driving pulley designed for slippage-free mechanical torque transmission under peak loads." },
    { x: "50%", y: "82%", title: "Vibration-Dampened Base", description: "Solid structural cast-iron base plate with dedicated slots for heavy industrial anchor bolts." }
  ],
  "spm-front-face.jpg": [
    { x: "50%", y: "50%", title: "Hardened Gripper Jaws", description: "4-segment sliding steel clamp wedges with machined teeth to grip workpieces without slippage." },
    { x: "72%", y: "24%", title: "Rim Bolt Array", description: "16 high-tensile hex screws securing the outer lock collar to prevent axial movement under pressure." },
    { x: "50%", y: "25%", title: "Polished Spindle Hub", description: "Precision ground steel spindle faceplate with a concentricity tolerance under 0.005 mm." }
  ],
  "spm-top.jpg": [
    { x: "65%", y: "28%", title: "Coiled Teflon Tubing", description: "Flexible, high-pressure white coiled pneumatic hoses supplying constant pressure to the swaging cylinders." },
    { x: "80%", y: "38%", title: "Brass Fitting Manifold", description: "Threaded industrial brass connector fittings ensuring a leak-proof seal under hydraulic pressure." }
  ],
  "spm-side.jpg": [
    { x: "32%", y: "48%", title: "V-Belt Groove System", description: "Engineered grooves providing high frictional contact area to drive heavy belt linkages." },
    { x: "82%", y: "60%", title: "Spindle Coupler Joint", description: "Coupling flange at the rear linking the central drive spindle to the auxiliary actuator assembly." }
  ],
  "spm-rear.jpg": [
    { x: "50%", y: "50%", title: "Star Flow Union", description: "Central rotary manifold union delivering fluid pressure uniformly to the rotating elements." },
    { x: "72%", y: "62%", title: "Radial Steel Pipelines", description: "8 heavy-duty radial alloy pipes feeding high-pressure fluid directly to clamp cylinders." }
  ]
};

function getHotspotsForImage(imagePath: string): Hotspot[] {
  if (!imagePath) return [];
  const parts = imagePath.split("/");
  const filename = parts[parts.length - 1];
  return HOTSPOTS_DATA[filename] || [];
}

interface ProductDetailPageClientProps {
  slug: string
  initialProduct: Product
}

export default function ProductDetailPageClient({ slug, initialProduct }: ProductDetailPageClientProps) {
  const { addItem, items } = useEnquiry();
  const { user, openAuthModal } = useAuth();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [product, setProduct] = useState<Product | null>(initialProduct);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(initialProduct.image || "");
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);

  useEffect(() => {
    async function loadDetail() {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${slug}`);
        if (res.ok) {
          const data = await res.json();
          if (data.product) {
            setProduct(data.product);
            setActiveImage(data.product.image);
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
      <div className="min-h-screen bg-[#fdfdfd] pt-28 flex items-center justify-center text-blue-900">
        <RefreshCw className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#fdfdfd] pt-28 flex flex-col items-center justify-center text-slate-800">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <Link href="/products" className="mt-4 text-blue-900 font-bold uppercase text-xs">Back to Products</Link>
      </div>
    );
  }

  const inCart = items.some((i) => i.product.id === product.id);
  const itemPrice = product.price || 10000;
  
  const hotspots = getHotspotsForImage(activeImage);

  return (
    <div className="min-h-screen bg-[#fdfdfd] pt-20 lg:pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-900 text-xs font-bold uppercase tracking-wider transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
            <div className="lg:col-span-2 bg-white flex flex-col justify-between p-6 border-b lg:border-b-0 lg:border-r border-slate-200">
              <div className="w-full relative aspect-square max-w-[380px] mx-auto flex items-center justify-center bg-[#fdfdfd] rounded-2xl overflow-hidden border border-slate-100 shadow-inner select-none">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeImage || "/placeholder-product.jpg"}
                  alt={product.name}
                  className="w-full h-full object-contain rounded-2xl transition-all duration-300"
                />
                
                {/* Hotspot callouts */}
                {hotspots.map((spot, idx) => (
                  <button
                    key={idx}
                    style={{ left: spot.x, top: spot.y }}
                    onClick={() => setActiveHotspot(spot)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group z-30 cursor-pointer focus:outline-none"
                  >
                    <span className="absolute inline-flex h-6 w-6 rounded-full bg-blue-600/30 animate-ping opacity-75" />
                    <span className={`relative inline-flex rounded-full h-5 w-5 items-center justify-center text-[10px] font-bold shadow-md border border-white transition-all ${
                      activeHotspot?.title === spot.title
                        ? "bg-red-600 text-white scale-110"
                        : "bg-blue-900 text-white group-hover:bg-red-600"
                    }`}>
                      +
                    </span>
                  </button>
                ))}
              </div>
              
              {/* Product Gallery Thumbnails */}
              {product.images && product.images.length > 0 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setActiveImage(img);
                        setActiveHotspot(null);
                      }}
                      className={`aspect-square rounded-xl overflow-hidden border-2 bg-[#fdfdfd] p-1 transition-all cursor-pointer ${
                        activeImage === img
                          ? "border-blue-900 ring-2 ring-blue-100 shadow-sm"
                          : "border-slate-200 hover:border-slate-400"
                      }`}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img}
                        alt={`${product.name} Angle ${idx + 1}`}
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Hotspot Info Panel */}
              {activeHotspot && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-2xl flex gap-3 items-start shadow-sm animate-fade-in">
                  <Info className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-blue-900 uppercase tracking-wider">{activeHotspot.title}</h4>
                    <p className="text-slate-700 text-xs mt-1 leading-relaxed">{activeHotspot.description}</p>
                  </div>
                </div>
              )}

              {!activeHotspot && product.images && (
                <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex gap-3 items-center text-slate-500 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-blue-900 animate-pulse" />
                  <p className="text-xs font-medium">Click on the pulsing hotspots <strong className="text-blue-900 font-bold">+</strong> to inspect technical details</p>
                </div>
              )}
            </div>

            <div className="lg:col-span-3 p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span className="inline-block bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold px-3 py-1 rounded-md uppercase tracking-wider">
                    {product.category}
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
                    <><Plus size={16} /> Add to Enquiry Cart</>
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
                  <Send size={16} /> Request Quote Now
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
