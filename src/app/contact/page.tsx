import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Bharat Machine Tools. Visit our facility in Peenya, Bengaluru or send us a message for enquiries, quotes, and service requests.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-r from-primary-dark to-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Have a question or need a quote? We are here to help.
          </p>
        </div>
      </section>
      <ContactForm />
    </div>
  );
}
