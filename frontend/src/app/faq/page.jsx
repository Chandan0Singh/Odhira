"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "How long does shipping take?",
    answer:
      "Orders are typically processed within 1-2 business days and delivered within 5-7 business days across India.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship worldwide. Shipping charges and delivery times vary based on destination.",
  },
  {
    question: "Can I return or exchange a product?",
    answer:
      "Yes, products can be returned or exchanged within 14 days of delivery, provided they are unused and in original condition.",
  },
  {
    question: "How do I find my size?",
    answer:
      "Each product page includes a detailed size guide to help you choose the perfect fit.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept UPI, Debit/Credit Cards, Net Banking, Wallets, and Razorpay-supported payment methods.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is shipped, you will receive a tracking link via email and SMS.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState(null);

  return (
    <main className="bg-[#F8F5EE] min-h-screen">

      {/* Hero */}
      <section className="py-24 border-b border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-6 text-center">

          <p className="uppercase tracking-[4px] text-[#C5A46D] mb-4">
            Customer Support
          </p>

          <h1 className="text-5xl md:text-6xl font-serif text-[#4B5A43]">
            Frequently Asked Questions
          </h1>

          <p className="mt-6 text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about orders,
            shipping, returns, sizing, and more.
          </p>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">

          <div className="space-y-5">

            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-[#E5E0D8] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() =>
                    setOpen(open === index ? null : index)
                  }
                  className="w-full px-6 py-5 flex justify-between items-center text-left"
                >
                  <h3 className="text-lg font-medium text-[#2D2D2D]">
                    {faq.question}
                  </h3>

                  {open === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>

                {open === index && (
                  <div className="px-6 pb-6 text-gray-600 leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}

          </div>

        </div>
      </section>

      {/* Contact Support */}
      <section className="pb-24">
        <div className="max-w-4xl mx-auto px-6">

          <div className="bg-[#4B5A43] text-white rounded-2xl p-10 text-center">

            <h2 className="text-3xl font-serif mb-4">
              Still Have Questions?
            </h2>

            <p className="text-gray-200 mb-8">
              Our customer support team is here to help.
            </p>

            <a
              href="/contact"
              className="inline-block bg-white text-[#4B5A43] px-8 py-3 rounded-md font-medium hover:opacity-90 transition"
            >
              Contact Us
            </a>

          </div>

        </div>
      </section>

    </main>
  );
}