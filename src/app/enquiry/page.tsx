import type { Metadata } from "next";
import EnquiryCart from "@/components/EnquiryCart";

export const metadata: Metadata = {
  title: "Cart & Enquiry",
  description:
    "Review your product cart, order online via Razorpay, or submit a quotation request to Bharat Machine Tools.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24">
      <section className="bg-white text-slate-900 py-16 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs uppercase tracking-wider mb-3 shadow-sm">
            Order Checkout
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Cart &amp; Order Summary</h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Review your selected machine tools, place your order online via Razorpay secure checkout, or request a custom price quotation.
          </p>
        </div>
      </section>
      <EnquiryCart />
    </div>
  );
}
