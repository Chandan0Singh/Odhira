"use client";

import { useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_URL;

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMailer = async (e) => {
    e.preventDefault();

    if (!email) return;

    try {
      setLoading(true);

      const res = await fetch(`${API_BASE}/api/newsletter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Subscribed successfully!");
        setEmail("");
      } else {
        alert(data.message || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleMailer} className="flex mt-8">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        className="flex-1 border border-gray-300 px-4 py-4"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-[#4B5A43] text-white px-8 disabled:opacity-50"
      >
        {loading ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}