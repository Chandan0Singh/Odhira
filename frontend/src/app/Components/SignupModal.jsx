"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function SignupModal({ isOpen, onClose, openLogin }) {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ User Registered Successfully!");
        login(data);

        setTimeout(() => {
           onClose();
          router.push("/");
        }, 1500);
      } else {
        setMessage(`❌ Error: ${data.message || "Registration failed"}`);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("❌ Server error");
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
        <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E4E0D8] p-8 animate-[fadeIn_.3s_ease]">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          {message && (
  <p className="text-center text-sm font-medium">
    {message}
  </p>
)}

          {/* Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-4xl text-[#5E6B58]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Create Account
            </h2>

            <p className="mt-2 text-gray-500">Join our fashion community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
              />

              <input
                type="text"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
              />
            </div>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
            />

            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
            />

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
            />

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
            />

            <div className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1 accent-[#5E6B58]" />
              <span className="text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-[#5E6B58] font-medium">
                  Terms & Conditions
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-[#5E6B58] text-white py-3 rounded-lg hover:bg-[#4F5B49] transition"
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div className="my-5 flex items-center">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google */}
          <button className="w-full border border-[#D8D4CB] py-3 rounded-lg hover:bg-[#F8F5EE] transition">
            Continue with Google
          </button>

          {/* Login Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              onClick={openLogin}
              className="font-semibold text-[#5E6B58]"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </>
  );
}