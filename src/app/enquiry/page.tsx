import type { Metadata } from "next";
import EnquiryCart from "@/components/EnquiryCart";

export const metadata: Metadata = {
  title: "Cart & Enquiry | Bharat Machine Tools",
  description:
    "Review your product cart, manage engineering component quantities, and submit your quote request directly to our Bangalore desk.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] text-slate-900 pt-24 sm:pt-28 pb-16 font-sans relative overflow-hidden">
      
      {/* Background Subtle Tooling Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
      
      {/* Dynamic Background Accents */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 mb-8 sm:mb-10 space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-50 border border-blue-200/80 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-[#122f87] uppercase tracking-widest">
            QUOTATION DESK &bull; RFQ DISPATCH
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 uppercase tracking-tight font-display leading-[1.15]">
          Technical <span className="text-[#122f87]">Enquiry Cart</span>
        </h1>

        <div className="flex items-center justify-center gap-1.5 pt-0.5 pb-0.5">
          <span className="w-12 h-1 bg-[#122f87] rounded-full" />
          <span className="w-8 h-1 bg-blue-500 rounded-full" />
        </div>

        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light max-w-xl mx-auto">
          Review your selected high-precision spindle systems, rotary tables, or axial-radial bearings, customize quantities, and submit your RFQ directly.
        </p>
      </div>

      {/* Main cart table and submit */}
      <EnquiryCart />
    </div>
  );
}
