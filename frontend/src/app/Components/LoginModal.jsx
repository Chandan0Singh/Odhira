"use client";

import React, { useState } from "react";
import { X } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginModal({ isOpen, onClose, openSignup }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Save user + token in AuthContext
      login({
        user: data.user,
        token: data.token,
      });

      onClose();

      router.push("/");
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setError("Something went wrong. Please try again.");
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
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div
          className="
            relative
            w-full
            max-w-md
            bg-white
            rounded-2xl
            shadow-2xl
            border border-[#E4E0D8]
            p-8
            animate-in
            zoom-in-95
            fade-in
            duration-300
          "
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-5 top-5 text-gray-500 hover:text-black"
          >
            <X size={20} />
          </button>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2
              className="text-4xl text-[#5E6B58]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Welcome Back
            </h2>

            <p className="mt-2 text-gray-500">Sign in to continue shopping</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
              required
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full border border-[#D8D4CB] rounded-lg px-4 py-3 outline-none focus:border-[#5E6B58]"
              required
            />

            <button
              type="submit"
              className="w-full bg-[#5E6B58] text-white py-3 rounded-lg hover:bg-[#4f5b49] transition-all"
            >
              Login
            </button>
          </form>

          <div className="my-5 flex items-center">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="px-3 text-xs text-gray-400">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          <button
            className="
              w-full
              border
              border-[#D8D4CB]
              py-3
              rounded-lg
              hover:bg-[#F8F5EE]
              transition
            "
          >
            Continue with Google
          </button>

          <p className="text-center mt-6 text-sm">
            New Customer?{" "}
            <button
              typeof="button"
              onClick={openSignup}
              className="font-semibold text-[#5E6B58]"
            >
              Create Account
            </button>
          </p>
        </div>
      </div>
    </>
  );
}
