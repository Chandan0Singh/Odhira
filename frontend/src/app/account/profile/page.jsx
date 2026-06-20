"use client";

import { useState } from "react";
import { User, Mail, Phone, Calendar } from "lucide-react";

export default function ProfilePage() {
  const [formData, setFormData] = useState({
    firstName: "Chandan",
    lastName: "Singh",
    email: "chandan@example.com",
    phone: "+91 9876543210",
    dob: "2003-09-13",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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

                <p className="text-[#777] mt-2">
                  Premium Member
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
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
              <button className="px-8 py-3 bg-[#5E6B58] text-white uppercase tracking-[2px] text-xs font-semibold hover:bg-[#4c5848] transition">
                Save Changes
              </button>

              <button className="px-8 py-3 border border-[#5E6B58] text-[#5E6B58] uppercase tracking-[2px] text-xs font-semibold hover:bg-[#5E6B58] hover:text-white transition">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}