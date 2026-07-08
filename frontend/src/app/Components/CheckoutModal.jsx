"use client";

import { X } from "lucide-react";
import { useState, useEffect } from "react";

export default function CheckoutModal({ open, onClose, addresses, phone, onPlaceOrder }) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Lock body scroll while modal is open, and allow Esc to close
  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const selectedAddress = addresses?.[selectedIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Checkout</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-100"
            aria-label="Close checkout"
          >
            <X size={20} />
          </button>
        </div>

        {/* Address list */}
        <div className="space-y-3">
          {addresses?.map((item, index) => (
            <label
              key={index}
              className={`flex cursor-pointer gap-4 rounded-xl border p-4 transition ${
                selectedIndex === index ? "border-black" : "hover:border-black"
              }`}
            >
              <input
                type="radio"
                name="shippingAddress"
                value={index}
                checked={selectedIndex === index}
                onChange={() => setSelectedIndex(index)}
                className="mt-1"
              />

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{item.type}</h4>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>

                <p className="mt-2 font-medium">{item.fullName}</p>
                <p className="text-sm text-gray-600">{item.phone || phone}</p>
                <p className="mt-1 text-sm text-gray-600">
                  {item.address}, {item.city}, {item.state}
                </p>
                <p className="text-sm text-gray-600">
                  {item.country} - {item.zipCode}
                </p>
              </div>
            </label>
          ))}

          <button
            type="button"
            className="w-full rounded-lg border border-dashed py-3 hover:bg-gray-50"
          >
            + Add New Address
          </button>
        </div>

        {/* Footer actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border py-3 font-medium hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onPlaceOrder?.(selectedAddress)}
            disabled={!selectedAddress}
            className="flex-1 rounded-lg bg-black py-3 font-medium text-white hover:bg-gray-800 disabled:opacity-40"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}