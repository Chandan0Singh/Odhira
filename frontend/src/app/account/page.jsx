"use client";

import Link from "next/link";
import {
  User,
  ShoppingBag,
  Heart,
  MapPin,
  CreditCard,
  LogOut,
  ChevronRight,
} from "lucide-react";

const menuItems = [
  {
    title: "My Orders",
    icon: ShoppingBag,
    href: "/account/orders",
  },
  {
    title: "Wishlist",
    icon: Heart,
    href: "/wishlist",
  },
  {
    title: "Addresses",
    icon: MapPin,
    href: "/account/addresses",
  },
  {
    title: "Payment Methods",
    icon: CreditCard,
    href: "/account/payments",
  },
];

export default function AccountPage() {
  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#5E6B58] text-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs mb-3 opacity-80">
            My Account
          </p>

          <h1
            className="text-4xl md:text-5xl"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Welcome Back
          </h1>

          <p className="mt-4 text-white/80">
            Manage your orders, wishlist and profile.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="bg-white border border-[#E4E0D8] p-8">
            <div className="w-20 h-20 rounded-full bg-[#5E6B58] flex items-center justify-center text-white mx-auto">
              <User size={36} />
            </div>

            <div className="text-center mt-5">
              <h2
                className="text-2xl text-[#2D2D2D]"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                Chandan Singh
              </h2>

              <p className="text-[#777] mt-2">
                chandan@example.com
              </p>
            </div>

            <button className="w-full mt-6 border border-[#5E6B58] text-[#5E6B58] py-3 uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition">
              Edit Profile
            </button>
          </div>

          {/* Menu */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-[#E4E0D8]">
              {menuItems.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center justify-between p-5 border-b border-[#E4E0D8] hover:bg-[#F8F5EE] transition"
                  >
                    <div className="flex items-center gap-4">
                      <Icon
                        size={20}
                        className="text-[#5E6B58]"
                      />

                      <span className="text-[#2D2D2D] font-medium">
                        {item.title}
                      </span>
                    </div>

                    <ChevronRight
                      size={18}
                      className="text-[#999]"
                    />
                  </Link>
                );
              })}

              {/* Logout */}
              <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition">
                <div className="flex items-center gap-4">
                  <LogOut
                    size={20}
                    className="text-red-500"
                  />

                  <span className="text-red-500 font-medium">
                    Logout
                  </span>
                </div>

                <ChevronRight
                  size={18}
                  className="text-red-400"
                />
              </button>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                <h3 className="text-3xl font-bold text-[#5E6B58]">
                  12
                </h3>
                <p className="text-sm text-[#777] mt-1">
                  Orders
                </p>
              </div>

              <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                <h3 className="text-3xl font-bold text-[#5E6B58]">
                  8
                </h3>
                <p className="text-sm text-[#777] mt-1">
                  Wishlist
                </p>
              </div>

              <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                <h3 className="text-3xl font-bold text-[#5E6B58]">
                  2
                </h3>
                <p className="text-sm text-[#777] mt-1">
                  Addresses
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}