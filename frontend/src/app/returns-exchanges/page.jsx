"use client";

import Link from "next/link";
import {
  RefreshCcw,
  PackageCheck,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  HelpCircle,
} from "lucide-react";

export default function ReturnsExchangesPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE] text-[#2D2D2D]">

      {/* Hero */}
      <section className="bg-[#5E6B58] py-20 md:py-28 text-white">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="uppercase tracking-[4px] text-xs md:text-sm text-white/70">
            Odhira
          </p>

          <h1
            className="mt-4 text-5xl md:text-7xl"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Returns & Exchanges
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-white/80 leading-relaxed">
            We want you to love every piece you receive. If something isn't
            right, here's everything you need to know about returns and
            exchanges.
          </p>
        </div>
      </section>

      {/* Quick Info */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <InfoCard
            icon={<Clock size={25} />}
            title="Easy Returns"
            text="Request an eligible return within the specified return period."
          />

          <InfoCard
            icon={<RefreshCcw size={25} />}
            title="Easy Exchanges"
            text="Exchange eligible products for another available size or option."
          />

          <InfoCard
            icon={<PackageCheck size={25} />}
            title="Original Condition"
            text="Products must be unused, unworn and returned with original packaging."
          />
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="bg-white border border-[#E4E0D8] p-7 md:p-12">

          {/* Return Window */}
          <InfoSection
            icon={<Clock size={22} />}
            title="Return & Exchange Window"
          >
            <p>
              You may request a return or exchange within{" "}
              <strong>7 days of receiving your order</strong>, subject to the
              product being eligible under our return policy.
            </p>

            <p className="mt-4">
              Items received after the return window may not be eligible for
              return or exchange.
            </p>
          </InfoSection>

          <Divider />

          {/* Eligibility */}
          <InfoSection
            icon={<CheckCircle size={22} />}
            title="Eligible Products"
          >
            <p className="mb-4">
              To be eligible for a return or exchange, the product should:
            </p>

            <ul className="space-y-3">
              <PolicyItem>
                Be unused, unworn and in its original condition.
              </PolicyItem>

              <PolicyItem>
                Have all original tags and labels attached.
              </PolicyItem>

              <PolicyItem>
                Be returned with the original packaging.
              </PolicyItem>

              <PolicyItem>
                Not have any stains, damage, perfume smell or signs of use.
              </PolicyItem>

              <PolicyItem>
                Include all accessories or items originally supplied with the
                product.
              </PolicyItem>
            </ul>
          </InfoSection>

          <Divider />

          {/* Non Returnable */}
          <InfoSection
            icon={<XCircle size={22} />}
            title="Non-Returnable Products"
          >
            <p className="mb-4">
              Certain products may not be eligible for return or exchange,
              including:
            </p>

            <ul className="space-y-3">
              <PolicyItem negative>
                Products marked as final sale or non-returnable.
              </PolicyItem>

              <PolicyItem negative>
                Products that have been used, washed, altered or damaged.
              </PolicyItem>

              <PolicyItem negative>
                Products without original tags or packaging.
              </PolicyItem>

              <PolicyItem negative>
                Customized or personalized products, unless received damaged
                or defective.
              </PolicyItem>

              <PolicyItem negative>
                Items returned after the applicable return period.
              </PolicyItem>
            </ul>
          </InfoSection>

          <Divider />

          {/* How to Request */}
          <InfoSection
            icon={<RefreshCcw size={22} />}
            title="How to Request a Return or Exchange"
          >
            <div className="space-y-5">

              <Step
                number="01"
                title="Contact Us"
                text="Contact our support team with your order number and the reason for your return or exchange."
              />

              <Step
                number="02"
                title="Share Product Details"
                text="You may be asked to provide photographs or additional information to help us process your request."
              />

              <Step
                number="03"
                title="Approval"
                text="Our team will review your request and confirm whether the product is eligible."
              />

              <Step
                number="04"
                title="Ship the Product"
                text="Once approved, follow the return instructions provided by our team."
              />

              <Step
                number="05"
                title="Inspection & Resolution"
                text="After receiving and inspecting the product, we will process your eligible return, exchange or refund."
              />

            </div>

            <Link
              href="/contact"
              className="inline-block mt-7 px-7 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4a5546] transition"
            >
              Request a Return
            </Link>
          </InfoSection>

          <Divider />

          {/* Damaged Product */}
          <InfoSection
            icon={<AlertCircle size={22} />}
            title="Damaged or Incorrect Product"
          >
            <p>
              If you receive a damaged, defective or incorrect product, please
              contact us as soon as possible after delivery.
            </p>

            <p className="mt-4">
              Please keep the product, packaging and shipping materials until
              our support team has reviewed your request.
            </p>

            <div className="mt-5 bg-[#F8F5EE] border border-[#E4E0D8] p-5">
              <p className="text-sm text-[#666] leading-6">
                <strong className="text-[#2D2D2D]">Tip:</strong> Take clear
                photographs of the product and packaging before contacting us.
                This can help us resolve the issue faster.
              </p>
            </div>
          </InfoSection>

          <Divider />

          {/* Refund */}
          <InfoSection
            icon={<PackageCheck size={22} />}
            title="Refunds"
          >
            <p>
              Once your returned product has been received and successfully
              inspected, an eligible refund will be initiated according to the
              applicable payment method and refund policy.
            </p>

            <p className="mt-4">
              The time required for the refund to appear in your account may
              vary depending on your bank or payment provider.
            </p>
          </InfoSection>

          <Divider />

          {/* Exchange */}
          <InfoSection
            icon={<RefreshCcw size={22} />}
            title="Exchange Policy"
          >
            <p>
              Exchanges are subject to product availability. If the requested
              size, color or product is unavailable, we may offer an alternative
              resolution where applicable.
            </p>

            <p className="mt-4">
              Exchange requests must meet the same condition and eligibility
              requirements as returns.
            </p>
          </InfoSection>

          <Divider />

          {/* Important */}
          <InfoSection
            icon={<HelpCircle size={22} />}
            title="Important Information"
          >
            <ul className="space-y-3">
              <PolicyItem>
                Please inspect your order immediately after delivery.
              </PolicyItem>

              <PolicyItem>
                Keep your order number available when contacting support.
              </PolicyItem>

              <PolicyItem>
                Do not send a product back without receiving return
                instructions from our team.
              </PolicyItem>

              <PolicyItem>
                Return and exchange requests are subject to product inspection
                and approval.
              </PolicyItem>
            </ul>
          </InfoSection>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#EFE8DE] py-20 text-center px-6">
        <h2
          className="text-4xl md:text-5xl text-[#2D2D2D]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Need Help With a Return?
        </h2>

        <p className="mt-4 text-[#666] max-w-xl mx-auto">
          Our support team is here to help you with returns, exchanges and
          product related concerns.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            href="/account/orders"
            className="px-8 py-4 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4a5546] transition"
          >
            My Orders
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
   Components
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

      <p className="mt-3 text-sm text-[#777] leading-relaxed">
        {text}
      </p>
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

      <div className="text-[#666] text-[15px] leading-7">
        {children}
      </div>
    </div>
  );
}

function PolicyItem({ children, negative = false }) {
  return (
    <li className="flex gap-3">
      <span className={negative ? "text-[#C0392B]" : "text-[#5E6B58]"}>
        {negative ? "×" : "•"}
      </span>

      <span>{children}</span>
    </li>
  );
}

function Step({ number, title, text }) {
  return (
    <div className="flex gap-5">
      <div className="w-10 h-10 shrink-0 bg-[#5E6B58] text-white flex items-center justify-center text-xs font-semibold tracking-wider">
        {number}
      </div>

      <div>
        <h3 className="font-semibold text-[#2D2D2D]">
          {title}
        </h3>

        <p className="mt-1 text-[#777]">
          {text}
        </p>
      </div>
    </div>
  );
}

function Divider() {
  return <div className="my-10 border-t border-[#E4E0D8]" />;
}