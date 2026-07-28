import type { Metadata } from "next";
import EnquiryCart from "@/components/EnquiryCart";

export const metadata: Metadata = {
  title: "Enquiry Cart",
  description:
    "Review your product enquiries and submit a quote request to Bharat Machine Tools.",
};

export default function EnquiryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Enquiry Cart</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Review your selected products and submit a quote request.
          </p>
        </div>
      </section>
      <EnquiryCart />
    </div>
  );
}
