import { Search, User, ShoppingBag } from "lucide-react";

export default function Header() {
  return (
    <header className="w-full">

      {/* Announcement Bar */}
      <div className="bg-[#4B5A43] text-white text-center text-xs tracking-[2px] py-2 uppercase">
        Free Shipping Over ₹4999
      </div>

      {/* Main Header */}
      <div className="bg-[#F8F5EE] border-b border-[#E5E0D8]">
        <div className="max-w-7xl mx-auto px-8">

          <div className="h-24 flex items-center justify-between">

            {/* Left Menu */}
            <nav className="hidden lg:flex items-center gap-10">
              <a
                href="#"
                className="text-sm uppercase tracking-wider hover:text-[#4B5A43]"
              >
                Shop
              </a>

              <a
                href="#"
                className="text-sm uppercase tracking-wider hover:text-[#4B5A43]"
              >
                Collections
              </a>

              <a
                href="#"
                className="text-sm uppercase tracking-wider hover:text-[#4B5A43]"
              >
                Lookbook
              </a>
            </nav>

            {/* Logo */}
            <div>
              <h1 className="font-serif text-4xl tracking-wide text-[#2D2D2D]">
                YOUR BRAND
              </h1>
            </div>

            {/* Right Menu */}
            <div className="flex items-center gap-8">

              <a
                href="#"
                className="hidden lg:block text-sm uppercase tracking-wider hover:text-[#4B5A43]"
              >
                About
              </a>

              <a
                href="#"
                className="hidden lg:block text-sm uppercase tracking-wider hover:text-[#4B5A43]"
              >
                Journal
              </a>

              <button>
                <Search size={20} />
              </button>

              <button>
                <User size={20} />
              </button>

              <button className="relative">
                <ShoppingBag size={20} />

                <span className="absolute -top-2 -right-2 bg-[#4B5A43] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  0
                </span>
              </button>

            </div>

          </div>
        </div>
      </div>
    </header>
  );
}