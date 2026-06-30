"use client";

import { useState, useEffect } from "react";
import { User, Mail, Phone, Calendar, Loader2, Check } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // adjust path if your context lives elsewhere

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function ProfilePage() {
  const { user, token, login } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Populate the form once the logged-in user is available
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phone: user.phone || "",
        dob: user.dob ? user.dob.split("T")[0] : "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setSuccess("");
  };

  const handleCancel = () => {
    if (!user) return;
    setFormData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      dob: user.dob || "",
    });
    setError("");
    setSuccess("");
  };

  const handleSave = async () => {
    setError("");
    setSuccess("");

    if (!formData.firstName || formData.firstName.trim().length < 2) {
      setError("First name must be at least 2 characters long");
      return;
    }
    if (!formData.lastName || formData.lastName.trim().length < 2) {
      setError("Last name must be at least 2 characters long");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Enter a valid email address");
      return;
    }

    setSaving(true);

    try {
      const res = await fetch(`${API_BASE}/api/user/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: user.id || user._id,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          dob: formData.dob,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.message || "Could not update profile");
        setSaving(false);
        return;
      }

      login({
        user: { ...user, ...data.user },
        token,
      });

      setSuccess("Profile updated successfully");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="bg-[#F8F5EE] min-h-screen flex items-center justify-center">
        <p className="text-[#777]">Loading profile…</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F8F5EE] min-h-screen">
      {/* Hero */}
      <section className="bg-[#5E6B58] py-14 text-white">
        <div className="max-w-5xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            My Account
          </p>

          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Profile
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white border border-[#E4E0D8] overflow-hidden">
          {/* Top Profile */}
          <div className="bg-[#F5F2EC] p-8 border-b border-[#E4E0D8]">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-[#5E6B58] flex items-center justify-center text-white">
                <User size={42} />
              </div>

              <div>
                <h2
                  className="text-3xl text-[#2D2D2D]"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {formData.firstName} {formData.lastName}
                </h2>

                <p className="text-[#777] mt-2 capitalize">
                  {user.role || "Member"}
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-6 flex items-center gap-2 bg-[#EEF3EC] border border-[#5E6B58]/30 text-[#3F4A3A] text-sm px-4 py-3">
                <Check size={16} />
                {success}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {/* First Name */}
              <div>
                <label className="block text-sm text-[#666] mb-2">
                  First Name
                </label>

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border border-[#D8D2C8] px-4 py-3 outline-none focus:border-[#5E6B58]"
                />
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-sm text-[#666] mb-2">
                  Last Name
                </label>

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border border-[#D8D2C8] px-4 py-3 outline-none focus:border-[#5E6B58]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-[#666] mb-2">
                  Email
                </label>

                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-[#D8D2C8] pl-12 pr-4 py-3 outline-none focus:border-[#5E6B58]"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-[#666] mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                  />

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-[#D8D2C8] pl-12 pr-4 py-3 outline-none focus:border-[#5E6B58]"
                  />
                </div>
              </div>

              {/* DOB */}
              <div className="md:col-span-2">
                <label className="block text-sm text-[#666] mb-2">
                  Date of Birth
                </label>

                <div className="relative">
                  <Calendar
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#888]"
                  />

                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className="w-full border border-[#D8D2C8] pl-12 pr-4 py-3 outline-none focus:border-[#5E6B58]"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4c5848] transition disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>

              <button
                onClick={handleCancel}
                disabled={saving}
                className="px-8 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}