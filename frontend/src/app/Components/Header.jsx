"use client";
import Link from "next/link";
import { useState } from "react";
import { Search, User, ShoppingBag, X, Menu } from "lucide-react";
import LoginModal from "./LoginModal";
import SignupModal from "./SignupModal";
import { useAuth } from "../../context/AuthContext";

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);

  console.log("User in Header:", user);

  const navLinks = [
    { label: "Shop", href: "/products" },

    {
      label: "Collections",
      href: "/collections",
      submenu: [
        { label: "Men", href: "/collections/men" },
        { label: "Women", href: "/collections/women" },
        { label: "Accessories", href: "/collections/accessories" },
        { label: "New Arrivals", href: "/collections/new-arrivals" },
        { label: "Sale", href: "/collections/sale" },
      ],
    },

    { label: "Lookbook", href: "/lookbook" },

    {
      label: "Account",
      href: "/account",
      submenu: [
        { label: "Profile", href: "/account/profile" },
        { label: "Orders", href: "/account/orders" },
        { label: "Addresses", href: "/account/addresses" },
        { label: "Wishlist", href: "/wishlist" },
      ],
    },

    { label: "About", href: "/about" },

    {
      label: "Journal",
      href: "/journal",
    },
  ];

  return (
    <>
      <header className="w-full font-sans sticky top-0 z-50">
        {/* ── Announcement Bar ───────────────────────────────── */}
        <div className="bg-[#5E6B58] text-[#F8F5EE] text-center text-[10px] tracking-[3px] py-2 uppercase font-medium">
          Free Shipping On All Orders &nbsp;·&nbsp; Easy 14-Day Returns
          &nbsp;·&nbsp; 100% Secure Payment
        </div>

        {/* ── Logo Row ──────────────────────────────────────── */}
        <div className="bg-[#F8F5EE] border-b border-[#E4E0D8] py-5">
          <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden text-[#202020] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            {/* Logo — always centered on desktop, left-offset on mobile */}
            <div className="absolute left-1/2 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-auto">
              <a href="/" className="block text-center">
                {/* Ornamental top line */}
                <span className="block w-16 h-px bg-[#A8B2A1] mx-auto mb-1" />
                <span
                  className="block font-serif text-[28px] leading-none tracking-[6px] text-[#5E6B58] uppercase"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Your Brand
                </span>
                <span className="block w-16 h-px bg-[#A8B2A1] mx-auto mt-1" />
              </a>
            </div>

            {/* Right icons */}
            <div className="flex items-center gap-5 text-[#202020]">
              {isAuthenticated ? (
                <>
                  <button
                    onClick={() => setSearchOpen(!searchOpen)}
                    aria-label="Search"
                    className="hover:text-[#5E6B58] transition-colors"
                  >
                    <Search size={18} strokeWidth={1.5} />
                  </button>

                  {/* <Link
                    href="/account"
                    aria-label="Account"
                    className="hover:text-[#5E6B58] transition-colors"
                  >
                    <User size={18} strokeWidth={1.5} />
                  </Link> */}

                  <div className="relative group">
                    <Link
                      href="/account"
                      aria-label="Account"
                      className="hover:text-[#5E6B58] transition-colors"
                    >
                      <User size={18} strokeWidth={1.5} />
                    </Link>

                    {/* Dropdown */}
                    <div
                      className="
      absolute right-[-593%] top-full mt-3
      w-52 bg-white border border-[#E4E0D8]
      shadow-xl rounded-lg
      opacity-0 invisible
      group-hover:opacity-100
      group-hover:visible
      transition-all duration-200
      z-50
    "
                    >
                      <div className="p-4 border-b border-[#E4E0D8]">
                        <p className="text-sm font-medium text-[#202020]">
                          Hi, {user?.firstName || user?.name}
                        </p>
                      </div>
                      
                      <Link
                        href="/admin"
                        className="block px-4 py-3 text-sm hover:bg-[#F8F5EE]"
                      >
                        Admin Dashboard
                      </Link>

                      <Link
                        href="/account"
                        className="block px-4 py-3 text-sm hover:bg-[#F8F5EE]"
                      >
                        My Account
                      </Link>

                      <Link
                        href="/account/orders"
                        className="block px-4 py-3 text-sm hover:bg-[#F8F5EE]"
                      >
                        Orders
                      </Link>

                      <Link
                        href="/wishlist"
                        className="block px-4 py-3 text-sm hover:bg-[#F8F5EE]"
                      >
                        Wishlist
                      </Link>

                      <button
                        onClick={logout}
                        className="
        w-full text-left px-4 py-3 text-sm
        text-red-500 hover:bg-[#F8F5EE]
      "
                      >
                        Logout
                      </button>
                    </div>
                  </div>

                  <Link
                    href="/cart"
                    aria-label="Cart"
                    className="relative hover:text-[#5E6B58] transition-colors"
                  >
                    <ShoppingBag size={18} strokeWidth={1.5} />
                    <span className="absolute -top-2 -right-2 bg-[#5E6B58] text-[#F8F5EE] text-[9px] w-[16px] h-[16px] rounded-full flex items-center justify-center font-semibold leading-none">
                      2
                    </span>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <button onClick={() => setLoginOpen(true)}>Login</button>

                  <button
                    onClick={() => setSignupOpen(true)}
                    className="bg-[#5E6B58] text-white px-4 py-2 rounded-md"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Navigation Row ────────────────────────────────── */}
        <nav className="hidden lg:block bg-[#F8F5EE] border-b border-[#E4E0D8]">
          <div className="max-w-7xl mx-auto px-8">
            <ul className="flex items-center justify-center gap-12 h-11">
              {navLinks.map((link) => (
                <li key={link.label} className="relative group">
                  <a
                    href={link.href}
                    className="text-[11px] uppercase tracking-[2.5px] text-[#202020]
                   font-medium hover:text-[#5E6B58] transition-colors"
                  >
                    {link.label}
                  </a>

                  {/* Dropdown */}
                  {link.submenu && (
                    <div
                      className="absolute left-1/2 top-full -translate-x-1/2
                     opacity-0 invisible group-hover:opacity-100
                     group-hover:visible transition-all duration-300
                     pt-4 z-50"
                    >
                      <div
                        className="bg-white border border-[#E4E0D8]
                       shadow-xl min-w-[220px] py-3"
                      >
                        {link.submenu.map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            className="block px-5 py-3 text-[12px]
                           uppercase tracking-[1.5px]
                           text-[#555]
                           hover:bg-[#F8F5EE]
                           hover:text-[#5E6B58]
                           transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* ── Search Bar (slide down) ────────────────────────── */}
        <div
          className={`bg-[#F8F5EE] border-b border-[#E4E0D8] overflow-hidden transition-all duration-300 ease-out ${
            searchOpen ? "max-h-16 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="max-w-2xl mx-auto px-8 py-3 flex items-center gap-3">
            <Search
              size={16}
              className="text-[#A8B2A1] shrink-0"
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="Search for products, collections…"
              autoFocus={searchOpen}
              className="flex-1 bg-transparent text-sm text-[#202020] placeholder-[#A8B2A1]
                       outline-none tracking-wide"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="text-[#A8B2A1] hover:text-[#5E6B58] transition-colors"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ─────────────────────────────────── */}
        <div
          className={`lg:hidden bg-[#F8F5EE] border-b border-[#E4E0D8] overflow-hidden
                    transition-all duration-300 ease-out ${
                      mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
        >
          <ul className="flex flex-col px-8 py-4 gap-5">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm uppercase tracking-[2px] text-[#202020] font-medium
                           hover:text-[#5E6B58] transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <LoginModal
        isOpen={loginOpen}
        onClose={() => setLoginOpen(false)}
        openSignup={() => {
          setLoginOpen(false);
          setSignupOpen(true);
        }}
      />

      <SignupModal
        isOpen={signupOpen}
        onClose={() => setSignupOpen(false)}
        openLogin={() => {
          setSignupOpen(false);
          setLoginOpen(true);
        }}
      />
    </>
  );
}
