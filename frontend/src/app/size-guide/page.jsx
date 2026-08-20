"use client";

import Link from "next/link";
import {
  Ruler,
  Shirt,
  Info,
  HelpCircle,
} from "lucide-react";

export default function SizeGuidePage() {
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
            Size Guide
          </h1>

          <p className="mt-5 max-w-2xl mx-auto text-white/80 leading-relaxed">
            Find your perfect fit with our easy-to-follow size guide.
          </p>
        </div>
      </section>

      {/* Quick Cards */}
      <section className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid md:grid-cols-3 gap-5">
          <InfoCard
            icon={<Ruler size={25} />}
            title="Measure Yourself"
            text="Use a measuring tape and keep it comfortable, not too tight."
          />

          <InfoCard
            icon={<Shirt size={25} />}
            title="Check the Fit"
            text="Compare your measurements with the size chart before ordering."
          />

          <InfoCard
            icon={<Info size={25} />}
            title="Between Sizes?"
            text="If your measurements fall between two sizes, consider the larger size."
          />
        </div>
      </section>

      {/* Main */}
      <section className="max-w-6xl mx-auto px-6 pb-20">

        {/* How to Measure */}
        <div className="bg-white border border-[#E4E0D8] p-7 md:p-12">

          <SectionTitle
            icon={<Ruler size={22} />}
            title="How to Measure"
          />

          <div className="grid md:grid-cols-2 gap-6">

            <MeasurementCard
              number="01"
              title="Bust / Chest"
              text="Measure around the fullest part of your chest or bust. Keep the measuring tape parallel to the floor."
            />

            <MeasurementCard
              number="02"
              title="Waist"
              text="Measure around the narrowest part of your natural waist without pulling the tape too tightly."
            />

            <MeasurementCard
              number="03"
              title="Hip"
              text="Measure around the fullest part of your hips while keeping your feet together."
            />

            <MeasurementCard
              number="04"
              title="Shoulder"
              text="Measure from one shoulder point to the other across the back."
            />

          </div>

          <Divider />

          {/* Women's Clothing */}
          <SectionTitle
            icon={<Shirt size={22} />}
            title="Women's Clothing"
          />

          <SizeTable
            headers={[
              "Size",
              "Bust (in)",
              "Waist (in)",
              "Hip (in)",
            ]}
            rows={[
              ["XS", "32–33", "25–26", "34–35"],
              ["S", "34–35", "27–28", "36–37"],
              ["M", "36–37", "29–30", "38–39"],
              ["L", "38–40", "31–33", "40–42"],
              ["XL", "41–43", "34–36", "43–45"],
              ["XXL", "44–46", "37–39", "46–48"],
            ]}
          />

          <p className="mt-5 text-sm text-[#777]">
            Measurements are provided as a general guide. Actual fit may vary
            depending on the design, fabric and silhouette of the product.
          </p>

          <Divider />

          {/* Men's Clothing */}
          <SectionTitle
            icon={<Shirt size={22} />}
            title="Men's Clothing"
          />

          <SizeTable
            headers={[
              "Size",
              "Chest (in)",
              "Waist (in)",
              "Hip (in)",
            ]}
            rows={[
              ["S", "36–38", "30–32", "36–38"],
              ["M", "39–41", "33–35", "39–41"],
              ["L", "42–44", "36–38", "42–44"],
              ["XL", "45–47", "39–41", "45–47"],
              ["XXL", "48–50", "42–44", "48–50"],
            ]}
          />

          <Divider />

          {/* Indian / General Size */}
          <SectionTitle
            icon={<Info size={22} />}
            title="General Size Conversion"
          />

          <SizeTable
            headers={[
              "Odhira Size",
              "India",
              "International",
            ]}
            rows={[
              ["XS", "34", "XS"],
              ["S", "36", "S"],
              ["M", "38", "M"],
              ["L", "40", "L"],
              ["XL", "42", "XL"],
              ["XXL", "44", "XXL"],
            ]}
          />

          <p className="mt-5 text-sm text-[#777]">
            This conversion is for general reference only. Please always
            prioritize the measurements mentioned on the individual product
            page.
          </p>

          <Divider />

          {/* Important */}
          <SectionTitle
            icon={<Info size={22} />}
            title="Important Information"
          />

          <ul className="space-y-3 text-[#666] text-[15px] leading-7">
            <PolicyItem>
              Always check the size chart on the individual product page before
              placing your order.
            </PolicyItem>

            <PolicyItem>
              Measurements can vary slightly depending on the fabric and
              construction of the garment.
            </PolicyItem>

            <PolicyItem>
              If you are between two sizes, we generally recommend choosing
              the larger size for a more comfortable fit.
            </PolicyItem>

            <PolicyItem>
              For fitted styles, consider your bust/chest and waist
              measurements carefully.
            </PolicyItem>
          </ul>

          <Divider />

          {/* Need Help */}
          <div className="bg-[#EFE8DE] p-7 md:p-9 text-center">
            <div className="w-12 h-12 mx-auto flex items-center justify-center rounded-full bg-white text-[#5E6B58]">
              <HelpCircle size={25} />
            </div>

            <h2
              className="mt-5 text-3xl text-[#2D2D2D]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Still Not Sure About Your Size?
            </h2>

            <p className="mt-3 max-w-xl mx-auto text-[#666] leading-relaxed">
              Our team will be happy to help you choose the right size.
              Contact us with your measurements and the product you're
              interested in.
            </p>

            <Link
              href="/contact"
              className="inline-block mt-6 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4a5546] transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* =========================================================
   Components
========================================================= */

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

function SectionTitle({ icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-7">
      <div className="text-[#5E6B58]">{icon}</div>

      <h2
        className="text-2xl md:text-3xl text-[#2D2D2D]"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        {title}
      </h2>
    </div>
  );
}

function MeasurementCard({ number, title, text }) {
  return (
    <div className="border border-[#E4E0D8] p-6">
      <div className="flex gap-4">
        <div className="w-10 h-10 shrink-0 bg-[#5E6B58] text-white flex items-center justify-center text-xs font-semibold tracking-wider">
          {number}
        </div>

        <div>
          <h3 className="font-semibold text-[#2D2D2D]">
            {title}
          </h3>

          <p className="mt-2 text-sm text-[#777] leading-6">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

function SizeTable({ headers, rows }) {
  return (
    <div className="overflow-x-auto border border-[#E4E0D8]">
      <table className="w-full min-w-[500px] border-collapse">
        <thead>
          <tr className="bg-[#5E6B58] text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="text-left p-4 text-sm font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-b border-[#E4E0D8] last:border-b-0"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`p-4 text-sm ${
                    cellIndex === 0
                      ? "font-semibold text-[#2D2D2D]"
                      : "text-[#666]"
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PolicyItem({ children }) {
  return (
    <li className="flex gap-3">
      <span className="text-[#5E6B58]">•</span>
      <span>{children}</span>
    </li>
  );
}

function Divider() {
  return <div className="my-10 border-t border-[#E4E0D8]" />;
}