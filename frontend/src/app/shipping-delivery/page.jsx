"use client";

import Link from "next/link";
import {
  Truck,
  Package,
  MapPin,
  Clock,
  CheckCircle,
  HelpCircle,
} from "lucide-react";

export default function ShippingDeliveryPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2D2D2D]">
      {/* Hero */}
      <section className="relative bg-[#5E6B58] py-20 md:py-28 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[4px] text-xs md:text-sm text-white/70">
            Odhira
          </p>

          <h1
            className="mt-4 text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Shipping & Delivery
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-white/80 leading-relaxed">
            We carefully pack every order and deliver your Odhira pieces safely
            to your doorstep.
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <InfoCard
            icon={<Truck size={25} />}
            title="Free Shipping"
            text="Enjoy free shipping on eligible orders across India."
          />

          <InfoCard
            icon={<Clock size={25} />}
            title="Fast Delivery"
            text="Most orders are delivered within 3–7 business days."
          />

          <InfoCard
            icon={<Package size={25} />}
            title="Secure Packaging"
            text="Every product is carefully packed to reach you safely."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#E4E0D8] p-7 md:p-12">
          {/* Processing */}
          <InfoSection
            icon={<Package size={22} />}
            title="Order Processing"
          >
            <p>
              Once your order is successfully placed, our team begins
              processing it. Orders are generally processed within{" "}
              <strong>1–2 business days</strong>.
            </p>

            <p className="mt-4">
              Orders placed on weekends or public holidays will be processed
              on the next working day.
            </p>
          </InfoSection>

          <Divider />

          {/* Delivery Time */}
          <InfoSection
            icon={<Clock size={22} />}
            title="Estimated Delivery Time"
          >
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px] border-collapse">
                <thead>
                  <tr className="bg-[#F8F5EE]">
                    <th className="text-left p-4 font-semibold">
                      Delivery Type
                    </th>
                    <th className="text-left p-4 font-semibold">
                      Estimated Time
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr className="border-b border-[#E4E0D8]">
                    <td className="p-4">Standard Delivery</td>
                    <td className="p-4">3–7 Business Days</td>
                  </tr>

                  <tr className="border-b border-[#E4E0D8]">
                    <td className="p-4">Remote / Extended Areas</td>
                    <td className="p-4">5–10 Business Days</td>
                  </tr>

                  <tr>
                    <td className="p-4">Pre-order Products</td>
                    <td className="p-4">As mentioned on the product page</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="mt-5 text-sm text-[#777]">
              Delivery timelines are estimates and may vary depending on your
              location, courier availability, weather conditions, or other
              unforeseen circumstances.
            </p>
          </InfoSection>

          <Divider />

          {/* Shipping Charges */}
          <InfoSection
            icon={<Truck size={22} />}
            title="Shipping Charges"
          >
            <p>
              Shipping charges, if applicable, are calculated during checkout
              based on your order and delivery location.
            </p>

            <p className="mt-4">
              Any applicable shipping charges will be clearly displayed before
              you complete your purchase.
            </p>
          </InfoSection>

          <Divider />

          {/* Tracking */}
          <InfoSection
            icon={<MapPin size={22} />}
            title="Order Tracking"
          >
            <p>
              Once your order has been shipped, you will receive your tracking
              information through your registered email address or other
              available communication channels.
            </p>

            <p className="mt-4">
              You can also check your order status from your{" "}
              <Link
                href="/account/orders"
                className="text-[#5E6B58] font-semibold underline underline-offset-4"
              >
                My Orders
              </Link>{" "}
              section.
            </p>
          </InfoSection>

          <Divider />

          {/* Delivery */}
          <InfoSection
            icon={<CheckCircle size={22} />}
            title="Delivery Information"
          >
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-[#5E6B58]">•</span>
                <span>
                  Please ensure that your shipping address and phone number are
                  correct before placing your order.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-[#5E6B58]">•</span>
                <span>
                  Someone should be available at the delivery address to
                  receive the package.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-[#5E6B58]">•</span>
                <span>
                  Delivery may require a signature or confirmation from the
                  recipient.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-[#5E6B58]">•</span>
                <span>
                  If delivery is unsuccessful, the courier may attempt
                  redelivery according to their policy.
                </span>
              </li>
            </ul>
          </InfoSection>

          <Divider />

          {/* Delayed Order */}
          <InfoSection
            icon={<HelpCircle size={22} />}
            title="Delayed or Missing Orders"
          >
            <p>
              If your order has exceeded the estimated delivery window and you
              have not received it, please contact our support team with your
              order number.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-6 px-7 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4a5546] transition"
            >
              Contact Us
            </Link>
          </InfoSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFE8DE] py-20 text-center px-6">
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Need Help With Your Order?
        </h2>

        <p className="mt-4 text-[#666] max-w-xl mx-auto">
          Our team is here to help you with shipping, delivery and order
          related questions.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            href="/account/orders"
            className="px-8 py-4 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4a5546] transition"
          >
            Track My Order
          </Link>

          <Link
            href="/contact"
            className="px-8 py-4 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
}

/* -------------------------------------------------------
   Reusable Components
------------------------------------------------------- */

function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-white border border-[#E4E0D8] p-7 text-center">
      <div className="w-12 h-12 mx-auto flex items-center justify-center bg-[#EFE8DE] text-[#5E6B58] rounded-full">
        {icon}
      </div>

      <h3
        className="mt-5 text-2xl text-[#2D2D2D]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h3>

      <p className="mt-3 text-sm text-[#777] leading-relaxed">{text}</p>
    </div>
  );
}

function InfoSection({ icon, title, children }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-5">
        <div className="text-[#5E6B58]">{icon}</div>

        <h2
          className="text-2xl md:text-3xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {title}
        </h2>
      </div>

      <div className="text-[#666] text-[15px] leading-7">{children}</div>
    </div>
  );
}

function Divider() {
  return <div className="my-10 border-t border-[#E4E0D8]" />;
}