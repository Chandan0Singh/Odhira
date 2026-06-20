"use client";

import { MapPin, Plus, Pencil, Trash2 } from "lucide-react";

const addresses = [
  {
    id: 1,
    type: "Home",
    name: "Chandan Singh",
    phone: "+91 9876543210",
    address:
      "House No. 123, Sector 15, Noida, Uttar Pradesh, 201301",
    default: true,
  },
  {
    id: 2,
    type: "Office",
    name: "Chandan Singh",
    phone: "+91 9876543210",
    address:
      "Tower A, Cyber City, Gurugram, Haryana, 122002",
    default: false,
  },
];

export default function AddressesPage() {
  return (
    <div className="min-h-screen bg-[#F8F5EE]">
      {/* Hero */}
      <section className="bg-[#5E6B58] py-14 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <p className="uppercase tracking-[4px] text-xs opacity-80">
            My Account
          </p>

          <h1
            className="text-4xl md:text-5xl mt-3"
            style={{
              fontFamily: "'Playfair Display', serif",
            }}
          >
            Saved Addresses
          </h1>

          <p className="mt-4 text-white/80">
            Manage your shipping and billing addresses.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Add Address Button */}
        <button
          className="flex items-center gap-2 px-6 py-3 bg-[#5E6B58]
                     text-white uppercase tracking-[2px] text-xs
                     font-semibold hover:bg-[#4d5849] transition"
        >
          <Plus size={16} />
          Add New Address
        </button>

        {/* Address Grid */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {addresses.map((address) => (
            <div
              key={address.id}
              className="bg-white border border-[#E4E0D8] p-6 relative"
            >
              {address.default && (
                <span
                  className="absolute top-4 right-4 bg-[#5E6B58]
                             text-white text-[10px] uppercase
                             tracking-[2px] px-3 py-1"
                >
                  Default
                </span>
              )}

              <div className="flex items-center gap-3 mb-5">
                <MapPin
                  size={20}
                  className="text-[#5E6B58]"
                />

                <h3 className="font-semibold text-[#2D2D2D]">
                  {address.type}
                </h3>
              </div>

              <p className="font-medium text-[#2D2D2D]">
                {address.name}
              </p>

              <p className="text-[#777] mt-2">
                {address.phone}
              </p>

              <p className="text-[#777] mt-4 leading-relaxed">
                {address.address}
              </p>

              {/* Actions */}
              <div className="flex gap-3 mt-6">
                <button
                  className="flex items-center gap-2 border border-[#5E6B58]
                             px-4 py-2 text-[#5E6B58] text-xs uppercase
                             tracking-[1.5px] font-semibold hover:bg-[#5E6B58]
                             hover:text-white transition"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  className="flex items-center gap-2 border border-red-500
                             px-4 py-2 text-red-500 text-xs uppercase
                             tracking-[1.5px] font-semibold hover:bg-red-500
                             hover:text-white transition"
                >
                  <Trash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Example */}
        {addresses.length === 0 && (
          <div className="bg-white border border-[#E4E0D8] p-16 text-center mt-8">
            <MapPin
              size={50}
              className="mx-auto text-[#5E6B58]"
            />

            <h2
              className="text-3xl mt-6 text-[#2D2D2D]"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              No Address Found
            </h2>

            <p className="text-[#777] mt-3">
              Add your first address to speed up checkout.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}