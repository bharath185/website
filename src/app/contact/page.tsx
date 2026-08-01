import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Bharat Machine Tools. Visit our facility in Bengaluru or send us a message for enquiries, quotes, and service requests.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] pt-20 lg:pt-24">
      <section className="bg-white text-slate-900 py-16 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 font-bold text-xs uppercase tracking-wider mb-3 shadow-sm">
            Contact Engineering Team
          </span>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Contact Us</h1>
          <p className="text-base text-slate-600 max-w-2xl mx-auto">
            Have a question or need a quote? We are here to help. Reach out to our engineering team in Bangalore.
          </p>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
