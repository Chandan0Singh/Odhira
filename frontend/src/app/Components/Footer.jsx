import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#5E6B58] text-[#F8F5EE]" style={{ fontFamily: "'Montserrat', sans-serif" }}>

      {/* ── Main Grid ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1.4fr_1fr_1fr] gap-10 items-start">

          {/* SHOP */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[3px] font-semibold text-[#F8F5EE] mb-5">
              Shop
            </h4>
            <ul className="space-y-3">
              {["Women", "Men", "Accessories", "New Arrivals", "Sale"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[#c8cfc5] hover:text-[#F8F5EE] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[3px] font-semibold text-[#F8F5EE] mb-5">
              Customer Care
            </h4>
            <ul className="space-y-3">
              {["Contact Us", "Shipping & Delivery", "Returns & Exchanges", "FAQ", "Size Guide"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[#c8cfc5] hover:text-[#F8F5EE] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CENTER — Brand */}
          <div className="flex flex-col items-center text-center">
            {/* Ornament */}
            <div className="flex items-center gap-3 mb-5 w-full">
              <span className="flex-1 h-px bg-[#A8B2A1]/40" />
              <span className="text-[#A8B2A1] text-lg">✦</span>
              <span className="flex-1 h-px bg-[#A8B2A1]/40" />
            </div>

            {/* Logo */}
            <h3
              className="text-2xl tracking-[5px] uppercase text-[#F8F5EE] mb-1"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 500 }}
            >
              Your Brand
            </h3>
            <p className="text-[10px] tracking-[2.5px] uppercase text-[#A8B2A1] mb-6">
              Timeless Elegance
            </p>

            {/* Social icons */}
            <div className="flex gap-4 mb-6">
              {[
                { icon: <FaFacebookF size={13} />, label: "Facebook" },
                { icon: <FaInstagram size={13} />, label: "Instagram" },
                { icon: <FaPinterestP size={13} />, label: "Pinterest" },
                { icon: <FaWhatsapp size={13} />, label: "WhatsApp" },
              ].map(({ icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-8 h-8 rounded-full border border-[#A8B2A1]/50
                             flex items-center justify-center text-[#c8cfc5]
                             hover:border-[#F8F5EE] hover:text-[#F8F5EE]
                             transition-all duration-200"
                >
                  {icon}
                </a>
              ))}
            </div>

            {/* Bottom ornament */}
            <div className="flex items-center gap-3 w-full">
              <span className="flex-1 h-px bg-[#A8B2A1]/40" />
              <span className="text-[#A8B2A1] text-lg">✦</span>
              <span className="flex-1 h-px bg-[#A8B2A1]/40" />
            </div>
          </div>

          {/* ABOUT */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[3px] font-semibold text-[#F8F5EE] mb-5">
              About
            </h4>
            <ul className="space-y-3">
              {["Our Story", "Sustainability", "Journal", "Careers"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-[13px] text-[#c8cfc5] hover:text-[#F8F5EE] transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-[10px] uppercase tracking-[3px] font-semibold text-[#F8F5EE] mb-5">
              Newsletter
            </h4>
            <p className="text-[12px] text-[#c8cfc5] leading-relaxed mb-4">
              Get updates on new arrivals and exclusive offers.
            </p>

            {/* Input row */}
            <div className="flex border border-[#A8B2A1]/50 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 px-3 bg-transparent text-[#F8F5EE] text-xs
                           placeholder-[#A8B2A1] outline-none"
              />
              <button
                className="px-4 h-10 bg-[#A8B2A1] text-[#5E6B58] text-xs font-bold
                           uppercase tracking-widest hover:bg-[#F8F5EE] transition-colors duration-200"
              >
                →
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 space-y-2">
              {[
                "✓  Free shipping on all orders",
                "✓  14-day easy returns",
                "✓  100% secure checkout",
              ].map((line) => (
                <p key={line} className="text-[11px] text-[#A8B2A1]">{line}</p>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom Bar ────────────────────────────────────── */}
      <div className="border-t border-[#A8B2A1]/25">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#A8B2A1]">
            © 2026 Your Brand. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use", "Sitemap"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[11px] text-[#A8B2A1] hover:text-[#F8F5EE] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
}