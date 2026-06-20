import {
  FaFacebookF,
  FaInstagram,
  FaPinterestP,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#4B5A43] text-[#F8F5EE]">

      <div className="max-w-7xl mx-auto px-8 py-14">

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* SHOP */}
          <div>
            <h4 className="uppercase text-xs tracking-[3px] mb-6">
              Shop
            </h4>

            <ul className="space-y-3 text-sm text-[#E5E0D8]">
              <li><a href="#">Women</a></li>
              <li><a href="#">Men</a></li>
              <li><a href="#">Accessories</a></li>
              <li><a href="#">New Arrivals</a></li>
              <li><a href="#">Sale</a></li>
            </ul>
          </div>

          {/* CUSTOMER CARE */}
          <div>
            <h4 className="uppercase text-xs tracking-[3px] mb-6">
              Customer Care
            </h4>

            <ul className="space-y-3 text-sm text-[#E5E0D8]">
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Shipping & Delivery</a></li>
              <li><a href="#">Returns & Exchanges</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Size Guide</a></li>
            </ul>
          </div>

          {/* BRAND */}
          <div className="text-center">

            <div className="mb-4">
              <span className="text-3xl">✦</span>
            </div>

            <h3 className="font-serif text-3xl tracking-wider">
              YOUR BRAND
            </h3>

            <div className="flex justify-center gap-4 mt-6">

              <a href="#">
                <FaFacebookF />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaPinterestP />
              </a>

              <a href="#">
                <FaWhatsapp />
              </a>

            </div>

            <p className="mt-6 text-xs text-[#D9D3C7]">
              © 2026 Your Brand. All Rights Reserved.
            </p>

          </div>

          {/* ABOUT + NEWSLETTER */}
          <div>

            <h4 className="uppercase text-xs tracking-[3px] mb-6">
              About
            </h4>

            <ul className="space-y-3 text-sm text-[#E5E0D8] mb-8">
              <li><a href="#">Our Story</a></li>
              <li><a href="#">Sustainability</a></li>
              <li><a href="#">Journal</a></li>
              <li><a href="#">Careers</a></li>
            </ul>

            <h4 className="uppercase text-xs tracking-[3px] mb-4">
              Newsletter
            </h4>

            <div className="flex">

              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 h-10 px-3 bg-[#F8F5EE] text-black text-sm outline-none"
              />

              <button className="w-10 h-10 bg-[#E5E0D8] text-[#4B5A43] font-bold">
                +
              </button>

            </div>

            <p className="text-xs text-[#D9D3C7] mt-4">
              Get updates on new arrivals and
              exclusive offers.
            </p>

          </div>

        </div>

      </div>

    </footer>
  );
}