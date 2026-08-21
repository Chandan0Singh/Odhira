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
  Save,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import { useEffect } from "react";

const menuItems = [
  {
    title: "My Orders",
    icon: ShoppingBag,
    href: "/account/orders",
  },
  // {
  //   title: "Wishlist",
  //   icon: Heart,
  //   href: "/wishlist",
  // },
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
  const { user, token, login } = useAuth();
  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  const [showEditProfile, setShowEditProfile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? new Date(user.dob).toISOString().split("T")[0] : "",
        address: user.address || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (!user?._id && !user?.id) {
      setMessage("User ID not found");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(`${API_BASE}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user._id || user.id,
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      setMessage("Profile updated successfully");

      // Update AuthContext/localStorage
      login({
        user: data.user,
        token: token,
      });

      setTimeout(() => {
        setShowEditProfile(false);
        setMessage("");
      }, 1000);
    } catch (error) {
      console.error("UPDATE PROFILE ERROR:", error);
      setMessage(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
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
                  {user ? user.name : "Loading..."}
                </h2>

                <p className="text-[#777] mt-2">
                  {user ? user.email : "Loading..."}
                </p>
              </div>

              <button
                onClick={() => setShowEditProfile(true)}
                className="w-full mt-6 border border-[#5E6B58] text-[#5E6B58] py-3 uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
              >
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
                        <Icon size={20} className="text-[#5E6B58]" />

                        <span className="text-[#2D2D2D] font-medium">
                          {item.title}
                        </span>
                      </div>

                      <ChevronRight size={18} className="text-[#999]" />
                    </Link>
                  );
                })}

                {/* Logout */}
                <button className="w-full flex items-center justify-between p-5 hover:bg-red-50 transition">
                  <div className="flex items-center gap-4">
                    <LogOut size={20} className="text-red-500" />

                    <span className="text-red-500 font-medium">Logout</span>
                  </div>

                  <ChevronRight size={18} className="text-red-400" />
                </button>
              </div>

              {/* Stats */}
              <div className="grid sm:grid-cols-3 gap-4 mt-6">
                <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                  <h3 className="text-3xl font-bold text-[#5E6B58]">12</h3>
                  <p className="text-sm text-[#777] mt-1">Orders</p>
                </div>

                {/* <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                <h3 className="text-3xl font-bold text-[#5E6B58]">
                  8
                </h3>
                <p className="text-sm text-[#777] mt-1">
                  Wishlist
                </p>
              </div> */}

                <div className="bg-white border border-[#E4E0D8] p-6 text-center">
                  <h3 className="text-3xl font-bold text-[#5E6B58]">2</h3>
                  <p className="text-sm text-[#777] mt-1">Addresses</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditProfile && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-2xl bg-[#F8F5EE] max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#E4E0D8] bg-[#F8F5EE] px-6 py-5">
              <div>
                <p className="text-[10px] uppercase tracking-[3px] text-[#777]">
                  Account
                </p>

                <h2
                  className="mt-1 text-2xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  Edit Profile
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  setShowEditProfile(false);
                  setMessage("");
                }}
                className="flex h-9 w-9 items-center justify-center border border-[#E4E0D8] bg-white text-[#555] hover:bg-[#eee] transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleUpdateProfile} className="p-6">
              {/* Name */}
              <div className="grid gap-5 md:grid-cols-2">
                {/* First Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    First Name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                    placeholder="First name"
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    Last Name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                    placeholder="Last name"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                    placeholder="Email address"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                    placeholder="Phone number"
                  />
                </div>

                {/* DOB */}
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                  />
                </div>

                {/* Address */}
                {/* <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-[1.5px] text-[#555]">
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full border border-[#DCD8D0] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none focus:border-[#5E6B58]"
                    placeholder="Your address"
                  />
                </div> */}
              </div>

              {/* Message */}
              {message && (
                <div
                  className={`mt-5 border px-4 py-3 text-sm ${
                    message.toLowerCase().includes("success")
                      ? "border-green-200 bg-green-50 text-green-700"
                      : "border-red-200 bg-red-50 text-red-600"
                  }`}
                >
                  {message}
                </div>
              )}

              {/* Buttons */}
              <div className="mt-7 flex gap-3 border-t border-[#E4E0D8] pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditProfile(false);
                    setMessage("");
                  }}
                  className="flex-1 border border-[#DCD8D0] bg-white py-3 text-xs font-semibold uppercase tracking-[2px] text-[#555] transition hover:bg-[#eee]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 bg-[#5E6B58] py-3 text-xs font-semibold uppercase tracking-[2px] text-white transition hover:bg-[#4d5a48] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <Save size={15} />

                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
