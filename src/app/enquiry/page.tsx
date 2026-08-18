import type { Metadata } from "next";
import EnquiryCart from "@/components/EnquiryCart";

export const metadata: Metadata = {
  title: "Cart & Enquiry | Bharat Machine Tools",
  description:
    "Review your product cart, manage engineering component quantities, and submit your quote request directly to our Bangalore desk.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pt-20 lg:pt-24">
      
      {/* Premium Industrial Section Header */}
      <section className="bg-slate-100/60 text-slate-900 py-16 border-b border-slate-200/60 relative overflow-hidden">
        {/* Background radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-[#122f87] font-mono font-bold text-[10px] uppercase tracking-widest mb-3.5 shadow-inner">
            Quotation Desk
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 uppercase mb-4 tracking-tight font-display">
            Enquiry Cart
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mx-auto font-light leading-relaxed">
            Review your selected high-precision spindle systems, axial-radial bearings, or linear guides, adjust quantities, and request a custom engineered quotation.
          </p>
        </div>
      </section>

      {/* Main cart table and submit */}
      <EnquiryCart />
    </div>
  );
}
